package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Ratnesh-Team/Rehabify/config"
	_ "github.com/Ratnesh-Team/Rehabify/docs"
	"github.com/Ratnesh-Team/Rehabify/middleware"
	"github.com/Ratnesh-Team/Rehabify/routes"
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	router := gin.Default()
	router.Use(cors.Middleware(corsConfig))
	// rate limiter route is the priortiy route so it should come at top
	// in the middleware chaim.
	router.Use(middleware.RateLimiterMiddlware())
	// looger middleware
	router.Use(gin.Logger())
	// recover from error
	router.Use(gin.Recovery())
	routes.RehabifyRoutes(router)

	// swagger url is http://localhost:3000/swagger-ui/index.html

	router.GET("/swagger-ui/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Print("Server listening on http://localhost:3000/")
	if err := http.ListenAndServe("0.0.0.0:3000", router); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
