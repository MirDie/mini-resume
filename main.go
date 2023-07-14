package main

import (
	"flag"
	"fmt"
	"go-resume/controllers"
	docs "go-resume/docs"
	"go-resume/lib"
	"go-resume/middleware"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {

	//初始化flag
	var configName, configPath string
	flag.StringVar(&configName, "n", "config", "配置文件名称")
	flag.StringVar(&configPath, "p", "./config", "配置文件路径")
	flag.Parse()
	fmt.Printf("configName:%s\n", configName)
	fmt.Printf("configPath:%s\n", configPath)

	//初始化配置
	lib.InitConfig(configPath, configName)
	//初始化redis
	lib.InitRedisClient()
	//初始化mysql
	lib.InitMysqlDB()

	// 初始化数据库
	lib.AutoMigrate()
	//初始化gin
	router := gin.Default()
	docs.SwaggerInfo.BasePath = "/api/v1"
	router.Use(middleware.AppContextMiddleware(lib.NewAppContextImpl()))
	//初始化swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	//注册路由
	controllers.InitRouters(router)
	router.Run(":8080")
}
