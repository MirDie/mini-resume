package lib

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type config struct {
	MySQL struct {
		Host     string `mapstructure:"host"`
		Port     string `mapstructure:"port"`
		Username string `mapstructure:"username"`
		Password string `mapstructure:"password"`
		DBName   string `mapstructure:"dbname"`
	} `mapstructure:"mysql"`

	Redis struct {
		Host     string `mapstructure:"host"`
		Port     int    `mapstructure:"port"`
		Password string `mapstructure:"password"`
	} `mapstructure:"redis"`

	Email struct {
		Host     string `mapstructure:"host"`
		Port     string `mapstructure:"port"`
		Username string `mapstructure:"username"`
		Password string `mapstructure:"password"`
	} `mapstructure:"email"`
}

var Config *config = &config{}

func InitConfig(configPath string, configName string) {
	// 初始化 Viper
	viper.AddConfigPath(configPath)
	viper.SetConfigType("yaml")
	viper.SetConfigName(configName)
	// 读取配置文件
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("读取配置文件出错: %v", err)
	}
	// 解析配置文件
	err = viper.Unmarshal(Config)
	if err != nil {
		log.Fatalf("解析配置文件出错: %v", err)
	}
	fmt.Printf("配置:%+v", Config)
}
