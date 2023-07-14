package lib

import (
	"go-resume/models"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

type AppContext interface {
	GetDB() *gorm.DB
	SetUser(user *models.User)
	GetUser() *models.User
	SetTranslation(DB *gorm.DB)
	GetRedisClient() *redis.Client
	SetRedisClient(client *redis.Client)
}

type appContextImpl struct {
	*gorm.DB
	txDB          *gorm.DB
	loginUser     *models.User
	isTranslation bool
	redisClient   *redis.Client
}

func (receiver *appContextImpl) GetDB() *gorm.DB {
	if receiver.isTranslation {
		return receiver.txDB
	} else {
		return receiver.DB
	}
}

func (receiver *appContextImpl) SetTranslation(db *gorm.DB) {
	receiver.isTranslation = true
	receiver.txDB = db
}

func (receiver *appContextImpl) SetUser(user *models.User) {
	receiver.loginUser = user
}

func (receiver *appContextImpl) GetUser() *models.User {
	return receiver.loginUser
}

// GetRedisClient returns the Redis client of the app context.
func (r *appContextImpl) GetRedisClient() *redis.Client {
	return r.redisClient
}

func (r *appContextImpl) SetRedisClient(client *redis.Client) {
	r.redisClient = client
}

func NewAppContextImpl() AppContext {
	return &appContextImpl{DB: MysqlDB, redisClient: RedisClient}
}

const AppContextImplKey = "AppContextImpl"

func GetAppContext(ctx *gin.Context) AppContext {
	return ctx.MustGet(AppContextImplKey).(*appContextImpl)
}
