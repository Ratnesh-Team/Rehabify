package controllers

import (
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetNMK is a handler to get all NMK codes.
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

// AddNMK adds a new NMK code.
// @Summary Add a new NMK code
// @Description Add a new NMK code to the repository
// @Tags NMK
// @Accept json
// @Produce json
// @Param nmk body models.NMK true "New NMK Code"
// @Success 200 {object} models.NMK
// @Router /NMK [post]
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

// ApproveNMK approves an existing NMK code.
// @Summary Approve an existing NMK code by ID.
// @Description Approves an existing NMK code and sets IsVerified to true.
// @Tags NMK
// @Accept json
// @Produce json
// @Param id path string true "NMK ID"
// @Success 200 {object} models.NMKApprovalResponse
// @Router /NMK/{id}/approve [post]
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
