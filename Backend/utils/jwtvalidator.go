package utils

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
)

// Claims represents the JWT claims
type Claims struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

// ValidateJWTToken validates the JWT token
func ValidateJWTToken(tokenString string) (*Claims, error) {
	// Parse the JWT token
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return JWTSecretKey, nil
	})
	if err != nil {
		return nil, err
	}

	
	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
