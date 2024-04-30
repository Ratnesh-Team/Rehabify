package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		queryParams := c.Request.URL.Query()
		filter := bson.M{}

		if NMK_Code := queryParams.Get("NMK_Code"); NMK_Code != "" {
			id := queryParams.Get("NMK_Code")
			ObjectID, err := primitive.ObjectIDFromHex(id)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"status":  http.StatusBadRequest,
					"message": "Invalid NMK code",
					"data":    nil,
				})
				return
			}
			filter["_id"] = ObjectID
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
func AddNMK(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var nmk models.NMK
		if err := c.BindJSON(&nmk); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  http.StatusBadRequest,
				"message": "Failed to bind NMK data",
				"data":    nil,
			})
			return
		}
		nmk.IsVerified = false

		// Insert NMK data into the repository
		if _, err := nmkRepo.InsertOne(nmk); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to insert NMK data",
				"data":    nil,
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "NMK data inserted successfully",
			"data":    nmk,
		})
	}
}
