package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/naggie/dstask"
)

// AddTask is fields for new task
type AddTask struct {
	Text     string
	Tags     []string
	Project  string
	Priority string
	Note     string
}

func addTaskHandler(c *gin.Context) {
	var postData AddTask

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
			"error":  "failed to add task",
			"detail": err,
		})
	}

	task := &dstask.Task{
		WritePending: true,
		Status:       dstask.STATUS_PENDING,
		Summary:      postData.Text,
		Tags:         postData.Tags,
		Project:      postData.Project,
		Priority:     postData.Priority,
		Notes:        postData.Note,
	}

	task, err = ts.LoadTask(task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to add task to taskset",
			"detail": err.Error(),
		})
		return
	}
	ts.SavePendingChanges()
	dstask.GitCommit(dstaskConfig.Repo, "Added %s", task)
	c.JSON(http.StatusNoContent, gin.H{})
}
