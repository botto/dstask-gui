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

	// Get the taskset
	ts, err := dstask.LoadTaskSet(
		dstaskConfig.Repo,
		dstaskConfig.IDsFile,
		false,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to load task set",
			"detail": err,
		})
	}

	// Get task from set by ID
	task, err := ts.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to load task",
			"detail": err,
		})
		return
	}

	// Mark task as done
	task.Status = dstask.STATUS_RESOLVED
	task.Resolved = time.Now()

	ts.UpdateTask(*task)
	// TODO: Fix this so we don't have exit fails futher down the tree
	ts.SavePendingChanges()

	dstask.GitCommit(dstaskConfig.Repo, "Resolved: %s", task)
	c.Status(204)
}
