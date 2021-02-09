package api

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

func doneTaskHandler(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.Atoi(idString)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to parse id",
			"defail": err,
		})
	}

	ts, err := dstask.LoadTaskSet(dstaskConfig.Repo, dstaskConfig.IDsFile, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to load tasks",
			"detail": err,
		})
	}

	task, err := ts.GetByID(id)

	task.Status = dstask.STATUS_RESOLVED
	task.Resolved = time.Now()

	ts.UpdateTask(*task)
	ts.SavePendingChanges()

	dstask.GitCommit(dstaskConfig.Repo, "Resolved %s", task)
	c.Status(204)
}
