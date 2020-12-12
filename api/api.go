package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

var ctx = &dstask.CmdLine{}
var cmdLine = &dstask.CmdLine{}

// Routes all the gin routes
func apiRoutes(router *gin.Engine) {

	// clientBox := packr.NewBox("../../client/build")

	// Serve frontend static files
	// router.StaticFS("/client/", clientBox)

	// router.GET("/", func(c *gin.Context) {
	// c.Redirect(http.StatusPermanentRedirect, "/client")
	// })

	apiGroup := router.Group("/api/v1")

	// reportapi.Routes(apiGroup.Group("report"))

	apiGroup.GET("/", func(c *gin.Context) {
		ts, err := dstask.NewTaskSet(
			dstaskConfig.Repo, dstaskConfig.IDsFile, dstaskConfig.StateFile,
			dstask.WithoutStatuses(dstask.STATUS_TEMPLATE),
			dstask.WithStatuses(dstask.NON_RESOLVED_STATUSES...),
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":  "failed to get tasklist",
				"detail": err,
			})
		}
		unfilteredTasks := ts.Tasks()
		c.JSON(200, unfilteredTasks)
	})
}
