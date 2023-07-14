package lib

import (
	"context"
	"strconv"

	"github.com/go-redis/redis/v8"
)

func NewRedisClient() (*redis.Client, error) {
	// 从配置文件中获取 Redis 相关配置
	redisHost := Config.Redis.Host
	redisPort := Config.Redis.Port
	redisPassword := Config.Redis.Password
	// 初始化 Redis 客户端
	client := redis.NewClient(&redis.Options{
		Addr:     redisHost + ":" + strconv.Itoa(redisPort),
		Password: redisPassword,
		DB:       0, // 使用的数据库编号
	})
	// 使用 Ping 方法测试与 Redis 的连接
	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		return nil, err
	}
	return client, nil
}

var RedisClient *redis.Client

func InitRedisClient() {
	client, err := NewRedisClient()
	if err != nil {
		panic(err)
	}
	RedisClient = client
}
