package repositories

import (
	"context"
	"errors"
	"fmt"
	"go-resume/lib"
	"go-resume/models"
	"time"

	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

type UserRepository struct {
	DB          *gorm.DB
	redisClient *redis.Client
}

func NewUserRepository(ctx lib.AppContext) *UserRepository {
	return &UserRepository{DB: ctx.GetDB(), redisClient: ctx.GetRedisClient()}
}

func (r *UserRepository) CreateUser(user *models.User) error {
	return r.DB.Create(user).Error
}

func (r *UserRepository) GetUserByUserEmail(email string) (*models.User, error) {
	var user models.User
	err := r.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) SaveVerificationCode(email, code string) error {
	ctx := context.Background()
	err := r.redisClient.Set(ctx, getEmailKey(email), code, 5*time.Minute).Err()
	if err != nil {
		return fmt.Errorf("failed to save verification code: %v", err)
	}
	return nil
}

func (r *UserRepository) GetVerificationCode(email string) (string, error) {
	ctx := context.Background()
	code, err := r.redisClient.Get(ctx, getEmailKey(email)).Result()
	if err != nil {
		if err == redis.Nil {
			// Verification code does not exist
			return "", errors.New("验证码错误")
		}
		return "", fmt.Errorf("failed to get verification code: %v", err)
	}
	return code, nil
}

func (r *UserRepository) DeleteVerificationCode(email string) error {
	ctx := context.Background()
	err := r.redisClient.Del(ctx, getEmailKey(email)).Err()
	if err != nil {
		return fmt.Errorf("failed to delete verification code: %v", err)
	}
	return nil
}

// 更新密码
func (r *UserRepository) UpdateUserPassword(userId uint, password string) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userId).Update("password", password).Error
}

// Helper function: Generate the Redis key for storing verification code
func getEmailKey(email string) string {
	return fmt.Sprintf("verification_code:%s", email)
}
