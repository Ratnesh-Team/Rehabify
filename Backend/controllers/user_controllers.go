package controllers

import (
	"context"
	"net/http"

	project "github.com/Ratnesh-Team/Rehabify/projects" // Import the SQLC-generated package

	"github.com/Ratnesh-Team/Rehabify/responses"
	"github.com/gin-gonic/gin"
)

// GetUsers retrieves users based on query parameters.
// It fetches users from the repository based on the query parameters and returns them as a response.
// @Summary Get users
// @Description Get users based on query parameters
// @Tags User
// @Accept json
// @Produce json
// @Param Addiction_Type query string false "Addiction Type"
// @Param Nasha_Mukti_Centre_Code query string false "Nasha Mukti Centre Code"
// @Param Employment_Status query int false "Employment Status"
// @Param Is_Treatment_Completed query bool false "Is Treatment Completed"
// @Success 200 {object} models.User
// @Router /users [get]
// GetUsers retrieves users from PostgreSQL based on query parameters.
func GetUsers(queries *project.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Check role from the context
		role, _ := c.Get("role")

		// Ensure the user has the right role
		if role != "superadmin" && role != "admin" && role != "user" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Unauthorized Acting Smart 😒",
				"data":    nil,
			})
			return
		}

		ctx := context.Background()

		// Fetch all users using SQLC ListUsers function
		users, err := queries.ListUsers(ctx)
		if err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error fetching users from PostgreSQL",
			}
			c.JSON(http.StatusInternalServerError, resp)
			return
		}

		resp := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "Users retrieved successfully",
			Data:    users,
		}
		c.JSON(http.StatusOK, resp)
	}
}

// AddPatient inserts a new user into the PostgreSQL database.
func AddPatient(queries *project.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user project.CreateUserParams

		// Bind JSON input to user struct
		if err := c.BindJSON(&user); err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusBadRequest,
				Message: "Failed to bind user data",
			}
			c.JSON(http.StatusBadRequest, resp)
			return
		}

		// Insert the user into PostgreSQL using SQLC's CreateUser function
		ctx := context.Background()
		createdUser, err := queries.CreateUser(ctx, user)
		if err != nil {
			resp := responses.ApplicationResponse{
				Status:  http.StatusInternalServerError,
				Message: "Error inserting user into PostgreSQL",
			}
			c.JSON(http.StatusInternalServerError, resp)
			return
		}

		resp := responses.ApplicationResponse{
			Status:  http.StatusOK,
			Message: "User inserted successfully",
			Data:    createdUser.ID, // Returning the created user's ID
		}
		c.JSON(http.StatusOK, resp)
	}
}
