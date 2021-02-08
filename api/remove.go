package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

func removeTaskHandler(c *gin.Context) {
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
			"error":  "failed to add task",
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

	// Mark task as deleted
	task.Deleted = true

	ts.UpdateTask(*task)
	// TODO: Fix this so we don't have exit fails futher down the tree
	ts.SavePendingChanges()

	dstask.GitCommit(dstaskConfig.Repo, "Removed: %s", task)
	c.Status(204)
}
