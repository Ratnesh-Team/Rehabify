package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetDoctor is a handler to get all doctors.
// It fetches all doctors from the repository and returns them as a response.
// @Summary Get all doctors
// @Description Get all doctors
// @Tags Doctors
// @Accept json
// @Produce json
// @Success 200 {object} models.DoctorData
// @Router /doctors [get]
func GetDoctor(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var doctorlist []models.DoctorData
		queryParams := c.Request.URL.Query()
		filter := bson.M{}

		// Check if role is "superadmin", if so, set IsVerified to false
		if role := queryParams.Get("role"); role == "superadmin" {
			filter["IsVerified"] = false
		} else {
			filter["IsVerified"] = true
		}

		if Doctor_Code := queryParams.Get("Doctor_Code"); Doctor_Code != "" {
			filter["Docter_Code"] = Doctor_Code
		}

		// Fetch all doctors from the repository
		cursor, err := nmkRepo.Find(filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to fetch doctors",
				"data":    nil,
			})
			return
		}
		defer cursor.Close(c.Request.Context())

		// Decode each document and append to the doctor list
		for cursor.Next(c.Request.Context()) {
			var doctor models.DoctorData
			if err := cursor.Decode(&doctor); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  http.StatusInternalServerError,
					"message": "Failed to decode doctor document",
					"data":    nil,
				})
				return
			}
			doctorlist = append(doctorlist, doctor)
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "Doctors fetched successfully",
			"data":    doctorlist,
		})
	}
}

// this is schema
func AddDoctor(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	// fmt.Println("123")
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
		doctor.IsVerified = false
		id, err := nmkRepo.InsertOne(doctor)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  http.StatusInternalServerError,
				"message": "Failed to insert Doctor",
				"data":    nil,
			})
			return
		}

		// fmt.Println("Doctor", id)
		// Assign the ID to the doctor struct
		doctor.ID = id.(primitive.ObjectID).Hex()
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusCreated,
			"message": "NMK code inserted successfully",
			"data":    doctor,
		})
	}
}
