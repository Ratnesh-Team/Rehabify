package middleware

import (
	"net/http"
	"strings"

	"github.com/Ratnesh-Team/Rehabify/utils"
	"github.com/gin-gonic/gin"
)

// AuthMiddleware is a middleware for authentication validation
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the authorization header
		authHeader := c.GetHeader("Authorization")

		// Check if the token is missing
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing Authorization Header"})
			c.Abort()
			return
		}

		// Check if the token is in the format "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid Token Format"})
			c.Abort()
			return
		}

		// Validate the JWT token
		tokenString := tokenParts[1]
		Claims, err := utils.ValidateJWTToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": err})
			c.Abort()
			return
		}
		c.Set("role", Claims.Role)
		c.Next()
	}
}
