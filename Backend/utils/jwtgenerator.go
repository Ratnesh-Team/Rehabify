package utils

import (
	"github.com/Ratnesh-Team/Rehabify/models"
	"github.com/dgrijalva/jwt-go"
)

var JWTSecretKey = []byte("your_secret_key_here")

func GenerateJWTToken(user *models.SignUp) (string, error) {

	claims := jwt.MapClaims{
		"username": user.Username,
		"email":    user.Email,
		"role":     user.Role,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString(JWTSecretKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
