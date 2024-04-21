package controllers

import (
	"log"
	"net/http"

	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/Ratnesh-Team/Rehabify/repository"
	"github.com/Ratnesh-Team/Rehabify/responses"
	"github.com/gin-gonic/gin"
)

// AuthController is a controller for authentication

func AddUser(authdb repository.MongoRepository) gin.HandlerFunc {
	return func(c *gin.Context){
		var user models.Users
		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if _, err = authdb.InsertOne(user); err != nil {
			log.Println("Failed to save secret: ", err.Error())
			c.JSON(http.StatusInternalServerError, responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Failed to save secret: " + err.Error(),
			})
			return
		}
		responses := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "User added successfully",
		}
		c.JSON(http.StatusOK, responses)
	}
}
