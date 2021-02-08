package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

func getTasksHandler(c *gin.Context) {
	ts, err := dstask.LoadTaskSet(
		dstaskConfig.Repo,
		dstaskConfig.IDsFile,
		false,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to get tasklist",
			"detail": err,
		})
		return
	}
	unfilteredTasks := ts.Tasks()
	c.JSON(200, unfilteredTasks)
}
