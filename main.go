package main

import (
	"os"

	rice "github.com/GeertJohan/go.rice"
	"github.com/botto/dstask-gui/cmd"
)

func main() {
	// Only Initialise the box if it exists, this will typically be when building a release
	if _, err := os.Stat("client/build"); os.IsExist(err) {
		// Initialise box in root main so rice embed-go finds is
		rice.FindBox("client/build")
	}
	cmd.Execute()
}
