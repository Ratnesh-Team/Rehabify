package main

import (
	"fmt"
	"github.com/Ratnesh-Team/Rehabify/config"
	"github.com/Ratnesh-Team/Rehabify/routes"
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger"github.com/swaggo/gin-swagger"
	"log"
	"net/http"
	"time"
)

func main() {
	config.LoadEnv()
	config.ConnectMongoDB()
	corsConfig := cors.Config{
		Origins:         "*",
		RequestHeaders:  "Origin, Authorization, Content-Type,App-User, Org_id",
		Methods:         "GET, POST, PUT,DELETE",
		Credentials:     false,
		ValidateHeaders: false,
		MaxAge:          1 * time.Minute,
	}

	fmt.Println("hello from the initializ backend")

	router := gin.Default()
	router.Use(cors.Middleware(corsConfig))
	routes.SecretRoutes(router)

	// swagger url is http://localhost:3000/swagger/index.html
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Print("Server listening on http://localhost:3000/")
	if err := http.ListenAndServe("0.0.0.0:3000", router); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
