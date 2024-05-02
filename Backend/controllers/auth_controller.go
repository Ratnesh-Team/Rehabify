package controllers

import (
	"log"
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/Ratnesh-Team/Rehabify/responses"
	"github.com/Ratnesh-Team/Rehabify/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// AuthController is a controller for authentication

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
		salt := "E_SALA_CUP_NAMDE"
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

func VerifyUser(authdb repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.SignIn
		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		salt := "E_SALA_CUP_NAMDE"
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
		userResponse.User.Avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
		if existingUser[0].Role == "admin" {
			userResponse.User.Authority = []string{"ADMIN", "USER"}
		} else {
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
