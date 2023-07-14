package lib

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// APIResponse 是一个通用的 API 响应结构体
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// Success 生成一个成功的 API 响应
func ResponseSuccess(c *gin.Context, message string, data interface{}) {
	response := APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	}
	c.JSON(http.StatusOK, response)
}

// Fail 生成一个失败的 API 响应
func ResponseFail(c *gin.Context, message string) {
	response := APIResponse{
		Success: false,
		Message: message,
	}
	c.JSON(http.StatusOK, response)
}

func ResponseNotValid(c *gin.Context) {
	response := APIResponse{
		Success: false,
		Message: "未登录",
	}
	c.JSON(http.StatusOK, response)
}
