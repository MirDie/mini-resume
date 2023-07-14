package middleware

import (
	"go-resume/lib"
	"go-resume/models"
	"gorm.io/gorm"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authorization() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		userid, email, err := lib.AuthToken(token)
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		lib.GetAppContext(c).SetUser(&models.User{Email: email, Model: gorm.Model{
			ID: userid,
		}})

		c.Next()
	}
}
