package cmd

import (
	"fmt"
	"os"

	"github.com/botto/dstask-gui/api"

	"github.com/spf13/cobra"

	"github.com/naggie/dstask"
	"github.com/spf13/viper"
)

var cfgFile string

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "dstask-gui",
	Short: "Start dstask HTTP api server",
	RunE: func(cmd *cobra.Command, args []string) error {
		conf := dstask.NewConfig()
		dstask.EnsureRepoExists(conf.Repo)
		api.Start(conf)
		return nil
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.dstask-gui.yaml)")

	viper.SetDefault("port", "20090")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	viper.AutomaticEnv() // read in environment variables that match
}
