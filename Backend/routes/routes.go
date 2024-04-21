// routes/routes.go
package routes

import (
	"github.com/Ratnesh-Team/Rehabify/config"
	"github.com/Ratnesh-Team/Rehabify/controllers"
	"github.com/gin-gonic/gin"
)

// SetupRoutes initializes and returns the Gin router with defined routes

func RehabifyRoutes(router *gin.Engine) {

	user := config.GetRepoCollection("User")
	NMK := config.GetRepoCollection("NMK")
	home_remedies := config.GetRepoCollection("Home-Remedies")
	router.GET("/users", controllers.GetUsers(user))
	router.GET("/NMK", controllers.GetNMK(NMK))
	router.GET("/home-remedies", controllers.GetHomeremediesDetails(home_remedies))

}
