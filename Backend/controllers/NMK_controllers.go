package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetNMK is a handler to retrieve all NMK codes.
// It fetches all NMK codes from the repository and returns them as a response.
// @Summary Retrieve all NMK codes
// @Description Fetch all NMK codes, with optional filtering based on query parameters such as email, role, and NMK code.
// @Tags NMK
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer token"
// @Param email query string false "Filter by user email"
// @Param role query string false "Filter by role; requires superadmin privileges to access unverified NMK codes"
// @Param NMK_Code query string false "Filter by NMK Code"
// @Success 200 {array} models.NMK "Successfully retrieved NMK codes"
// @Failure 400 {object} map[string]interface{} "Invalid NMK code"
// @Failure 401 {object} map[string]interface{} "Unauthorized access"
// @Failure 500 {object} map[string]interface{} "Failed to fetch NMK codes"
// @Router /NMK [get]
func GetNMK(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract the role from the context
		role, _ := c.Get("role")
		if  (role != "superadmin" && role != "admin" && role != "user") {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Unauthorized: You do not have permission to access this resource.",
				"data":    nil,
			})
			return
		}

		var nmkList []models.NMK
		queryParams := c.Request.URL.Query()
		filter := bson.M{}
		filter["IsVerified"] = true

		// Set filter based on user role

		if Email := queryParams.Get("email"); Email != "" {
			filter["Email"] = Email
		}
		if Role := queryParams.Get("role"); Role != ""  && role == "superadmin" {
			filter["IsVerified"] = false
		}
		if NMK_Code := queryParams.Get("NMK_Code"); NMK_Code != "" {
			id, err := primitive.ObjectIDFromHex(NMK_Code)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"status":  http.StatusBadRequest,
					"message": "Invalid NMK code",
					"data":    nil,
				})
				return
			}
			filter["_id"] = id
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

// AddNMK adds a new NMK code to the repository.
// @Summary Add a new NMK code
// @Description Creates a new NMK code in the repository. The new NMK code is initially marked as unverified.
// @Tags NMK
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer token"
// @Param nmk body models.NMK true "New NMK Code details"
// @Success 201 {object} models.NMK "Successfully added NMK code"
// @Failure 400 {object} map[string]interface{} "Failed to bind NMK data"
// @Failure 500 {object} map[string]interface{} "Failed to insert NMK data"
// @Router /addNMK [post]
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

// ApproveNMK approves an existing NMK code by its ID.
// @Summary Approve an existing NMK code by ID
// @Description Approves an NMK code, setting its IsVerified status to true.
// @Tags NMK
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer token"
// @Param id path string true "ID of the NMK code to approve"
// @Success 200 {object} map[string]interface{} "Successfully approved NMK code"
// @Failure 400 {object} map[string]interface{} "Invalid NMK code ID"
// @Failure 500 {object} map[string]interface{} "Failed to approve NMK code"
// @Router /NMK/approve [post]
func ApproveNMK(nmkRepo repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
        queryParams := c.Request.URL.Query()
        id := queryParams.Get("id")
        ObjectID, err := primitive.ObjectIDFromHex(id)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "status":  http.StatusBadRequest,
                "message": "Invalid NMK code",
                "data":    nil,
            })
            return
        }

        // Update the NMK code in the repository
        filter := bson.M{"_id": ObjectID}
        update := bson.M{"$set": bson.M{"IsVerified": true}}
        if err := nmkRepo.UpdateOne(filter, update,nil); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "status":  http.StatusInternalServerError,
                "message": "Failed to approve NMK code",
                "data":    nil,
            })
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "status":  http.StatusOK,
            "message": "NMK code approved successfully",
            "data":    nil,
        })
    }
}
