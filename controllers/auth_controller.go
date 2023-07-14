package controllers

import (
	"go-resume/lib"
	"go-resume/services"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
}

func NewAuthController() *AuthController {
	return &AuthController{}
}

// @title 注册
// @version 1.0
// @description 注册
// @produce json
// @router /register [post]
// @param email formData string true "email"
// @param password formData string true "password"
func (c *AuthController) Register(ctx *gin.Context) {
	var registerRequest struct {
		Email            string `json:"email" binding:"required"`
		Password         string `json:"password" binding:"required"`
		VerificationCode string `json:"verificationCode" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&registerRequest); err != nil {
		lib.ResponseFail(ctx, "注册失败")
		return
	}
	authService := services.NewAuthService(lib.GetAppContext(ctx))
	// 验证邮箱是否已经注册
	if authService.IsEmailRegistered(registerRequest.Email) {
		lib.ResponseFail(ctx, "邮箱已经注册")
		return
	}

	if !authService.VerificationEmailCode(registerRequest.Email, registerRequest.VerificationCode) {
		lib.ResponseFail(ctx, "验证码错误")
		return
	}

	if err := authService.Register(registerRequest.Email, registerRequest.Password); err != nil {
		lib.ResponseFail(ctx, "注册失败")
		return
	}
	lib.ResponseSuccess(ctx, "注册成功", nil)
}

// @title 登录
// @version 1.0
// @description 登录
// @produce json
// @router /login [post]
func (c *AuthController) Login(ctx *gin.Context) {
	var loginRequest struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&loginRequest); err != nil {
		lib.ResponseSuccess(ctx, "登录失败", nil)
		return
	}
	authService := services.NewAuthService(lib.GetAppContext(ctx))
	user, err := authService.Login(loginRequest.Username, loginRequest.Password)
	if err != nil {
		lib.ResponseFail(ctx, "账号或密码错误")
		return
	}

	//设置token有效时间
	nowTime := time.Now()
	expireTime := nowTime.Add(3 * time.Hour)
	token, err := lib.GenerateToken(user.Email, user.ID, expireTime)
	if err != nil {
		lib.ResponseFail(ctx, "登录失败")
		return
	}
	ctx.Header("Authorization", token)
	lib.ResponseSuccess(ctx, "登录成功", user)
}

// @title 发送验证码
// @version 1.0
// @description 发送验证码
// @produce json
// @router /send-verification-code [post]
// @param email body string true "email"
// @param code body string true "code"
func (c *AuthController) SendEmailCode(ctx *gin.Context) {
	var registerRequest struct {
		Email string `json:"email" binding:"required"`
	}
	if err := ctx.ShouldBind(&registerRequest); err != nil {
		lib.ResponseFail(ctx, "验证码发送失败")
		return
	}
	authService := services.NewAuthService(lib.GetAppContext(ctx))
	// 验证邮箱是否已经注册
	if authService.IsEmailRegistered(registerRequest.Email) {
		lib.ResponseFail(ctx, "邮箱已经注册，请直接登录")
		return
	}
	authService.SendVerificationCode(registerRequest.Email)
	lib.ResponseSuccess(ctx, "验证码发送成功", nil)
}

//重置密码

// @title 重置密码
// @version 1.0
// @description 重置密码
// @produce json
// @router /reset-password [post]
// @param email body string true "email"
// @param code body string true "code"
// @param password body string true "password"
func (c *AuthController) ResetPassword(ctx *gin.Context) {
	var registerRequest struct {
		Email    string `json:"email" binding:"required"`
		Code     string `json:"code" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := ctx.ShouldBind(&registerRequest); err != nil {
		lib.ResponseFail(ctx, "内部错误")
		return
	}

	authService := services.NewAuthService(lib.GetAppContext(ctx))
	if !authService.VerificationEmailCode(registerRequest.Email, registerRequest.Code) {
		lib.ResponseFail(ctx, "验证码错误")
		return
	}
	if err := authService.ResetPassword(registerRequest.Email, registerRequest.Password); err != nil {
		lib.ResponseFail(ctx, "重置密码失败")
		return
	}
	lib.ResponseSuccess(ctx, "重置密码成功", nil)
}

// 登出
func (c *AuthController) Logout(ctx *gin.Context) {
	authService := services.NewAuthService(lib.GetAppContext(ctx))
	token := ctx.GetHeader("Authorization")
	if token == "" {
		lib.ResponseFail(ctx, "认证失败")
	}
	authService.Logout(ctx.GetHeader("Authorization"))
	lib.ResponseSuccess(ctx, "登出成功", nil)
}
