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
// @Summary Get users
// @Description Get users based on query parameters
// @Tags User
// @Accept json
// @Produce json
// @Param Addiction_Type query string false "Addiction Type"
// @Param Nasha_Mukti_Centre_Code query string false "Nasha Mukti Centre Code"
// @Param Employment_Status query int false "Employment Status"
// @Param Is_Treatment_Completed query bool false "Is Treatment Completed"
// @Success 200 {object} models.User
// @Router /users [get]
func GetUsers(userRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []models.User

		// Get all query parameters
		queryParams := c.Request.URL.Query()

		// Create a filter based on query parameters
		filter := bson.M{}

		// Handle specific query parameters
		if addictionType := queryParams.Get("Addiction_Type"); addictionType != "" {
			filter["Addiction_Type"] = addictionType
		}
		if nashaMuktiCentreCode := queryParams.Get("Nasha_Mukti_Centre_Code"); nashaMuktiCentreCode != "" {
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

		for cursor.Next(c.Request.Context()) {
			var user models.User
			if err := cursor.Decode(&user); err != nil {
				resp := responses.ApplicationResponse{
					Status:  http.StatusInternalServerError,
					Message: "Error decoding user",
				}
				c.JSON(http.StatusInternalServerError, resp)
				return
			}
			users = append(users, user)
		}

		resp := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "Users retrieved successfully",
			Data:    users,
		}
		c.JSON(http.StatusOK, resp)
	}
}
