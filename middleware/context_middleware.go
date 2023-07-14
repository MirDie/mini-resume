package middleware

import (
	"go-resume/lib"

	"github.com/gin-gonic/gin"
)

func AppContextMiddleware(appContext lib.AppContext) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(lib.AppContextImplKey, appContext)
		ctx.Next()
	}
}
