package controllers

import (
	"net/http"
	"strconv"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GetHomeremediesDetails is a handler to retrieve all Homeremedies details.
// It fetches all Homeremedies details from the repository and returns them as a response.
// @Summary Retrieve all Homeremedies details
// @Description Fetch all Homeremedies details, with optional filtering based on query parameters.
// @Tags Homeremedies
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer token"
// @Param id query int false "Homeremedies ID" 
// @Success 200 {array} models.Homeremedies "Successfully retrieved Homeremedies details"
// @Failure 400 {object} responses.ApplicationResponse "Invalid value for 'id'"
// @Failure 401 {object} responses.ApplicationResponse "Unauthorized access"
// @Failure 500 {object} responses.ApplicationResponse "Failed to fetch Homeremedies details"
// @Router /home-remedies [get]
func GetHomeremediesDetails(HomeremediesRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var HomeremediesList []models.Homeremedies

		role, _ := c.Get("role")
		if role != "superadmin" && role != "admin" && role != "user" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Unauthorized Acting  Smart 😒  ",
				"data":    nil,
			})
			return
		}

		queryParams := c.Request.URL.Query()
		filter := bson.M{}
		if id := queryParams.Get("id"); id != "" {
			idInt, err := strconv.Atoi(id)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"status":  http.StatusBadRequest,
					"message": "Invalid value for 'id'",
					"data":    nil,
				})
				return
			}
			filter["id"] = idInt
		} else {
			filter = nil
		}
		// Fetch all Homeremedies details from the repository
		cursor, err := HomeremediesRepo.Find(filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to fetch Homeremedies details",
				"data":    nil,
			})
			return
		}
		defer cursor.Close(c.Request.Context())

		// Decode each document and append to the Homeremedies list
		for cursor.Next(c.Request.Context()) {
			var Homeremedies models.Homeremedies
			if err := cursor.Decode(&Homeremedies); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  http.StatusInternalServerError,
					"message": "Failed to decode Homeremedies document",
					"data":    nil,
				})
				return
			}
			HomeremediesList = append(HomeremediesList, Homeremedies)
		}
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "Homeremedies details fetched successfully",
			"data":    HomeremediesList,
		})
	}
}
