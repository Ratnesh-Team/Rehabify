package controllers

import (
	"net/http"
	"strconv"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/Ratnesh-Team/Rehabify/responses"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GetUsers retrieves users based on query parameters.
// It fetches users from the repository based on the query parameters and returns them as a response.
// @Summary Retrieve users based on filters
// @Description Fetch users by passing optional query parameters to filter results
// @Tags User
// @Accept json
// @Produce json
// @Param Addiction_Type query string false "Filter by Addiction Type"
// @Param Nasha_Mukti_Centre_Code query string false "Filter by Nasha Mukti Centre Code"
// @Param Employment_Status query int false "Filter by Employment Status (integer)"
// @Param Is_Treatment_Completed query bool false "Filter by Treatment Completion status (boolean)"
// @Success 200 {array} models.User "List of users"
// @Failure 400 {object} responses.ApplicationResponse "Bad request, invalid query parameters"
// @Failure 401 {object} responses.ApplicationResponse "Unauthorized access"
// @Failure 500 {object} responses.ApplicationResponse "Internal server error"
// @Router /users [get]
func GetUsers(userRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []models.User

		role, _ := c.Get("role")
		// here role is interface and store as key value pair get role now 

		if  role != "superadmin" && role != "admin" && role != "user" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Unauthorized Acting  Smart 😒",
				"data":    nil,
			})
			return
		}

		// Get all query parameters
		queryParams := c.Request.URL.Query()

		// Create a filter based on query parameters
		filter := bson.M{}

		// Handle specific query parameters
		if addictionType := queryParams.Get("Addiction_Type"); addictionType != "" {
			filter["Addiction_Type"] = addictionType
		}
		if nashaMuktiCentreCode := queryParams.Get("NMK_Code"); nashaMuktiCentreCode != "" {
			filter["Nasha_Mukti_Centre_Code"] = nashaMuktiCentreCode
		}
		if employmentStatusStr := queryParams.Get("Employment_Status"); employmentStatusStr != "" {
			employmentStatus, err := strconv.Atoi(employmentStatusStr)
			if err != nil {
				resp := responses.ApplicationResponse{
					Status:  http.StatusBadRequest,
					Message: "Invalid Employment_Status value",
				}
				c.JSON(http.StatusBadRequest, resp)
				return
			}
			filter["Employment_Status"] = employmentStatus
		}
		if isTreatmentCompletedStr := queryParams.Get("Is_Treatment_Completed"); isTreatmentCompletedStr != "" {
			isTreatmentCompleted, err := strconv.ParseBool(isTreatmentCompletedStr)
			if err != nil {
				resp := responses.ApplicationResponse{
					Status:  http.StatusBadRequest,
					Message: "Invalid Is_Treatment_Completed value",
				}
				c.JSON(http.StatusBadRequest, resp)
				return
			}
			filter["Is_Treatment-Completed"] = isTreatmentCompleted
		}

		// Fetch users based on the filter
		cursor, err := userRepo.Find(filter)
		if err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error finding users",
			}
			c.JSON(http.StatusInternalServerError, resp)
			return
		}
		defer cursor.Close(c.Request.Context())
		err = cursor.All(c.Request.Context(), &users)
		if err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error decoding user",
			}
			c.JSON(http.StatusInternalServerError, resp)
			return

		}

		// for cursor.Next(c.Request.Context()) {
		// 	var user models.User
		// 	if err := cursor.Decode(&user); err != nil {
		// 		resp := responses.ApplicationResponse{
		// 			Status:  http.StatusInternalServerError,
		// 			Message: "Error decoding user",
		// 		}
		// 		c.JSON(http.StatusInternalServerError, resp)
		// 		return
		// 	}
		// 	users = append(users, user)
		// }

		resp := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "Users retrieved successfully",
			Data:    users,
		}
		c.JSON(http.StatusOK, resp)
	}
}

// AddPatient is a handler to add a new patient.
// It binds the request body to the user model and inserts it into the repository.
// @Summary Add a new patient
// @Description Add a new patient by binding the request data and inserting into the repository
// @Tags User
// @Accept json
// @Produce json
// @Param user body models.User true "User data"
// @Success 200 {object} responses.ApplicationResponse
// @Failure 400 {object} responses.ApplicationResponse "Failed to bind user data"
// @Failure 500 {object} responses.ApplicationResponse "Error inserting user"
// @Router /addPatient [post]
func AddPatient(userRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		if err := c.BindJSON(&user); err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusBadRequest,
				Message: "Failed to bind user data",
			}
			c.JSON(http.StatusBadRequest, resp)
			return
		}

		// Insert the user into the repository
		id, err := userRepo.InsertOne(user)
		if err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error inserting user",
			}
			c.JSON(http.StatusInternalServerError, resp)
			return
		}

		resp := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "User inserted successfully",
			Data:    id,
		}
		c.JSON(http.StatusOK, resp)
	}
}
