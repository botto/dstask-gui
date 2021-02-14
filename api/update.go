package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

func updateTaskHandler(c *gin.Context) {
	var postData Task
	idString := c.Param("id")
	id, err := strconv.Atoi(idString)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to parse id",
			"defail": err,
		})
	}

	// Unpack JSON data
	if err := c.BindJSON(&postData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to unpack task data",
			"detail": err,
		})
	}

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

	task.Summary = postData.Text
	ts.UpdateTask(*task)
	// TODO: Fix this so we don't have exit fails futher down the tree
	ts.SavePendingChanges()

	dstask.GitCommit(dstaskConfig.Repo, "Modified: %s", task)
	c.Status(204)
}
