package controllers

import (
	"go-resume/middleware"

	"github.com/gin-gonic/gin"
)

func InitRouters(e *gin.Engine) {
	g := e.Group("/api/v1")

	authApi := g.Group("")
	authApi.Use(middleware.Authorization())
	authController := NewAuthController()
	g.POST("/login", authController.Login)
	g.POST("/register", authController.Register)
	g.POST("/send-verification-code", authController.SendEmailCode)
	authApi.POST("/logout")
	authApi.POST("/reset-password", authController.ResetPassword)
	resumeController := NewResumeController()
	authApi.GET("/resume/:id", resumeController.GetResume)
	authApi.POST("/resume/:id", resumeController.CreateOrUpdateResume)

}
