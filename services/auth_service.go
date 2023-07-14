package services

import (
	"errors"
	"fmt"
	"go-resume/lib"
	"go-resume/models"
	"go-resume/repositories"
	"math/rand"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	UserRepository *repositories.UserRepository
}

func NewAuthService(ctx lib.AppContext) *AuthService {
	return &AuthService{UserRepository: repositories.NewUserRepository(ctx)}
}

func (s *AuthService) Register(email, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user := &models.User{
		Email:    email,
		Password: string(hashedPassword),
	}

	return s.UserRepository.CreateUser(user)
}

func (s *AuthService) IsEmailRegistered(email string) bool {
	user, err := s.UserRepository.GetUserByUserEmail(email)
	return user != nil && err == nil
}

// 验证邮箱验证码
func (s *AuthService) VerificationEmailCode(email string, code string) bool {
	verificationCode, err := s.UserRepository.GetVerificationCode(email)
	if err != nil {
		return false
	}
	return verificationCode == code
}

func (s *AuthService) Login(email, password string) (*models.User, error) {
	user, err := s.UserRepository.GetUserByUserEmail(email)
	if err != nil {
		return nil, err
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, err
	}
	return user, nil
}

// 登出
func (s *AuthService) Logout(token string) error {
	return lib.RevokedToken(token)
}

func (s *AuthService) SendVerificationCode(email string) error {
	// 生成随机的验证码
	code := generateVerificationCode()
	err := s.UserRepository.SaveVerificationCode(email, code)
	if err != nil {
		return err
	}
	// 使用邮件发送服务发送验证码到用户的邮箱
	err = lib.SendTextEmail(email, code)
	if err != nil {
		s.UserRepository.DeleteVerificationCode(email)
		return err
	}

	return nil
}

// 重置密码
func (s *AuthService) ResetPassword(email string, password string) error {
	user, err := s.UserRepository.GetUserByUserEmail(email)
	if err != nil || user == nil {
		return errors.New("用户不存在")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("加密错误")
	}
	s.UserRepository.UpdateUserPassword(user.ID, string(hashedPassword))
	return nil
}

func generateVerificationCode() string {
	rand.Seed(time.Now().UnixNano())
	code := fmt.Sprintf("%06d", rand.Intn(1000000))
	return code
}
