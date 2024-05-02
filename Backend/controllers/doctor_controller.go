package controllers

import (
	"fmt"
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
func GetDoctor(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var doctorlist []models.DoctorData
		queryParams := c.Request.URL.Query()
		filter := bson.M{}
		if Doctor_Code := queryParams.Get("Doctor_Code"); Doctor_Code != "" {
			filter["Docter_Code"] = Doctor_Code
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
			var doctor models.DoctorData
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

// this is schema
func AddDoctor(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var doctor models.DoctorData
		if err := c.BindJSON(&doctor); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  http.StatusBadRequest,
				"message": "Failed to parse request body",
				"data":    nil,
			})
			return
		}

		// Insert the NMK code into the repository
		id, err := nmkRepo.InsertOne(doctor)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to insert Doctor",
				"data":    nil,
			})
			return
		}

		fmt.Println("Doctor", id)
		// Assign the ID to the doctor struct
		doctor.ID = id.(primitive.ObjectID).Hex()
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusCreated,
			"message": "NMK code inserted successfully",
			"data":    doctor,
		})
	}
}
