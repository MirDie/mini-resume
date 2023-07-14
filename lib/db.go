package lib

import (
	"go-resume/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var MysqlDB *gorm.DB

func InitMysqlDB() {
	//获取mysql配置信息
	config := Config.MySQL
	dsn := config.Username + ":" + config.Password + "@tcp(" + config.Host + ":" + config.Port + ")/" + config.DBName + "?charset=utf8mb4&parseTime=True&loc=Local"
	// 连接数据库
	db, err := gorm.Open(mysql.Open(dsn))
	if err != nil {
		log.Fatalf("连接数据库出错: %v", err)
	}
	MysqlDB = db
}

// AutoMigrate
func AutoMigrate() {
	MysqlDB.AutoMigrate(&models.User{})
	MysqlDB.AutoMigrate(&models.Resume{})
	MysqlDB.AutoMigrate(&models.ResumeItem{})
}
