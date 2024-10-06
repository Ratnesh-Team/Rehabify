// routes/routes.go
package routes

import (
	"github.com/Ratnesh-Team/Rehabify/config"
	"github.com/Ratnesh-Team/Rehabify/controllers"
	"github.com/Ratnesh-Team/Rehabify/middleware"
	project "github.com/Ratnesh-Team/Rehabify/projects" // Import the SQLC-generated package
	"github.com/gin-gonic/gin"
)

// SetupRoutes initializes and returns the Gin router with defined routes

func RehabifyRoutes(router *gin.Engine, queries *project.Queries) {
	// user := config.GetRepoCollection("User")
	NMK := config.GetRepoCollection("NMK")
	home_remedies := config.GetRepoCollection("Home-Remedies")
	AuthDB := config.GetRepoCollection("authDB")
	DoctorDB := config.GetRepoCollection("DoctorDB")

	router.GET("/users", middleware.AuthMiddleware(), controllers.GetUsers(queries))
	router.GET("/NMK", middleware.AuthMiddleware(), controllers.GetNMK(NMK))
	router.GET("/home-remedies", middleware.AuthMiddleware(), controllers.GetHomeremediesDetails(home_remedies))
	router.POST("/signUp", controllers.AddUser(AuthDB))
	router.POST("/signIn", controllers.VerifyUser(AuthDB))
	router.GET("/doctor", middleware.AuthMiddleware(), controllers.GetDoctor(DoctorDB))
	router.POST("/addNmk", controllers.AddNMK(NMK))
	router.POST("/addDoctor", controllers.AddDoctor(DoctorDB))
	router.POST("/addPatient", controllers.AddPatient(queries))
	router.POST("/NMK/approve", controllers.ApproveNMK(NMK))
}
