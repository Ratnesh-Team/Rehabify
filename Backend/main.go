package main

import (
	// "context"
	"database/sql"
	"log"
	"net/http"
	"time"

	"github.com/Ratnesh-Team/Rehabify/config"
	"github.com/Ratnesh-Team/Rehabify/middleware"       // Import the sqlc-generated package
	project "github.com/Ratnesh-Team/Rehabify/projects" // Import SQLC-generated package

	// _ "github.coms/Ratnesh-Team/Rehabify/docs"

	"github.com/Ratnesh-Team/Rehabify/routes"
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	config.LoadEnv()
	config.ConnectPostgresDB()
	connStr := "postgres://avnadmin:AVNS_uNdMPZ5uBOzSCINFE9B@rehabify-ratneshmaurya2311-3bf1.i.aivencloud.com:17645/defaultdb?sslmode=disable"
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// ctx := context.Background()
	queries := project.New(db)

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
	routes.RehabifyRoutes(router, queries)

	// swagger url is http://localhost:3000/swagger-ui/index.html

	router.GET("/swagger-ui/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Print("Server listening on http://localhost:3000/")
	if err := http.ListenAndServe("0.0.0.0:3000", router); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}

// package main

// import (
// 	"context"
// 	"database/sql"
// 	"fmt"
// 	"log"

// 	project "github.com/Ratnesh-Team/Rehabify/projects"
// 	_ "github.com/lib/pq"
// )

// func main() {
// 	connStr := "postgres://avnadmin:AVNS_uNdMPZ5uBOzSCINFE9B@rehabify-ratneshmaurya2311-3bf1.i.aivencloud.com:17645/defaultdb?sslmode=disable"
// 	db, err := sql.Open("postgres", connStr)

// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	defer db.Close()

// 	ctx := context.Background()
// 	queries := project.New(db)

// 	// Get list users
// 	userList, err := queries.ListUsers(ctx)

// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println(userList)
// }
