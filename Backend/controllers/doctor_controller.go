package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GetNMKCodes is a handler to get all NMK codes.
// It fetches all NMK codes from the repository and returns them as a response.
// @Summary Get all NMK codes
// @Description Get all NMK codes
// @Tags NMK
// @Accept json
// @Produce json
// @Success 200 {object} models.NMK
// @Router /NMK [get]
func GetDoctor(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var doctorlist []models.DoctorData
		queryParams := c.Request.URL.Query()
		filter := bson.M{}
		if Docker_Code := queryParams.Get("Docter_Code"); Docker_Code != "" {
			filter["Docter_Code"] = Docker_Code
		} else {
			filter = nil
		}

		// Fetch all NMK codes from the repository
		cursor, err := nmkRepo.Find(filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to fetch NMK codes",
				"data":    nil,
			})
			return
		}
		defer cursor.Close(c.Request.Context())

		// Decode each document and append to the NMK list
		for cursor.Next(c.Request.Context()) {
			var doctor  models.DoctorData
			if err := cursor.Decode(&doctor); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  http.StatusInternalServerError,
					"message": "Failed to decode NMK document",
					"data":    nil,
				})
				return
			}
			doctorlist = append(doctorlist, doctor)
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "NMK codes fetched successfully",
			"data":    doctorlist,
		})
	}
}
