package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
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
func GetNMK(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var nmkList []models.NMK

		// Fetch all NMK codes from the repository
		cursor, err := nmkRepo.Find(nil)
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
			var nmk models.NMK
			if err := cursor.Decode(&nmk); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  http.StatusInternalServerError,
					"message": "Failed to decode NMK document",
					"data":    nil,
				})
				return
			}
			nmkList = append(nmkList, nmk)
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "NMK codes fetched successfully",
			"data":    nmkList,
		})
	}
}
