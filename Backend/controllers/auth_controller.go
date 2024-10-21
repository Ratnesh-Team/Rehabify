package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/Ratnesh-Team/Rehabify/responses"
	"github.com/Ratnesh-Team/Rehabify/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// AuthController is a controller for authentication
// AddUser registers a new user.
// It checks if the email already exists in the database and if not, hashes the password and stores the user details.
// @Summary Register a new user
// @Description Register a new user by providing email, password, and other required fields. It checks if the email already exists before adding the user.
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.SignUp true "User signup details"
// @Success 200 {object} responses.ApplicationResponse "User registered successfully"
// @Failure 400 {object} responses.ApplicationResponse "Bad request, invalid input data"
// @Failure 409 {object} responses.ApplicationResponse "Conflict, email already exists"
// @Failure 500 {object} responses.ApplicationResponse "Internal server error"
// @Router /signUp [post]
func AddUser(authdb repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.SignUp
		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// Check if email already exists
		filter := bson.M{"Email": user.Email}
		cursor, err := authdb.Find(filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error querying email: " + err.Error(),
			})
			return
		}
		defer cursor.Close(c.Request.Context())

		var existingUser []models.SignUp
		err = cursor.All(c.Request.Context(), &existingUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error decoding  email: " + err.Error(),
			})
			return
		}
		if len(existingUser) > 0 {

			c.JSON(http.StatusConflict, responses.ApplicationResponse{
				Status:  http.StatusConflict,
				Message: "Email already exists",
			})
			return
		}
		// Continue with user registration
		data := user.Password
		salt := os.Getenv("SALT")
		user.Password = utils.Hash(data, salt)
		user.UnencryptedPassword = data

		if _, err = authdb.InsertOne(user); err != nil {
			log.Println("Failed to save secret: ", err.Error())
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Failed to save secret: " + err.Error(),
			})
			return
		}
		responses := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "User added successfully",
		}
		c.JSON(http.StatusOK, responses)
	}
}

// VerifyUser verifies a user's credentials.
// It checks if the provided email and password match an existing user and returns a JWT token upon successful verification.
// @Summary Verify user credentials
// @Description Verify a user's email and password. If verified, a JWT token is generated and returned.
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.SignIn true "User sign-in details"
// @Success 200 {object} responses.ApplicationResponse "User verified successfully, token returned"
// @Failure 400 {object} responses.ApplicationResponse "Bad request, invalid input data"
// @Failure 401 {object} responses.ApplicationResponse "Unauthorized, invalid email or password"
// @Failure 500 {object} responses.ApplicationResponse "Internal server error"
// @Router /signIn [post]
func VerifyUser(authdb repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.SignIn
		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		salt := os.Getenv("SALT")
		data := user.Password
		password := utils.Hash(data, salt)
		filter := bson.M{}
		filter["Email"] = user.Email
		filter["Password"] = password
		cursor, err := authdb.Find(filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: err.Error(),
			})
			return
		}
		defer cursor.Close(c.Request.Context())

		var existingUser []models.SignUp
		err = cursor.All(c.Request.Context(), &existingUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: err.Error(),
			})
			return
		}
		if len(existingUser) == 0 {
			c.JSON(http.StatusUnauthorized, responses.ApplicationResponse{
				Status:  http.StatusUnauthorized,
				Message: "Invalid email or password",
			})
			return
		}

		var userResponse models.SignInResponse
		userResponse.Token, err = utils.GenerateJWTToken(&existingUser[0])
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error generating token: " + err.Error(),
			})
			return
		}
		userResponse.User.Email = existingUser[0].Email
		userResponse.User.UserName = existingUser[0].Username
		userResponse.User.Avatar = "https://avatar.iran.liara.run/public"
		if existingUser[0].Role == "superadmin" {
			userResponse.User.Authority = []string{"SUPERADMIN", "USER"}
		}
		if existingUser[0].Role == "admin" {
			userResponse.User.Authority = []string{"ADMIN", "USER"}
		} 
		if existingUser[0].Role == "user" {
			userResponse.User.Authority = []string{"USER"}
		}

		response := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "User verified successfully",
			Data:    userResponse,
		}
		c.JSON(http.StatusOK, response)
	}
}
