package api

import (
	"net/http"

	rice "github.com/GeertJohan/go.rice"
	"github.com/gin-gonic/gin"
)

// Routes all the gin routes
func apiRoutes(router *gin.Engine) {
	apiGroup := router.Group("/api/v1")
	box, err := rice.FindBox("client/build")

	if err == nil {
		// Serve frontend static files
		router.StaticFS("/client", box.HTTPBox())

		router.GET("/", func(c *gin.Context) {
			c.Redirect(http.StatusPermanentRedirect, "/client")
		})
	}

	apiGroup.GET("/", getTasksHandler)
	apiGroup.POST("/", addTaskHandler)
}
