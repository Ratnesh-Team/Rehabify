package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GetHomeremediesDetails is a handler to get all Homeremedies details.
// It fetches all Homeremedies details from the repository and returns them as a response.
// @Summary Get all Homeremedies details
// @Description Get all Homeremedies details
// @Tags Homeremedies
// @Accept json
// @Produce json
// @Success 200 {object} models.Homeremedies
// @Router /Homeremedies [get]
func GetHomeremediesDetails(HomeremediesRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var HomeremediesList []models.Homeremedies

		role, _ := c.Get("role")
		// here role is interface and store as key value pair get role now
		fmt.Println(role)

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
