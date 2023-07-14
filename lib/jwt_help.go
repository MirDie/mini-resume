package lib

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/golang-jwt/jwt/v4"
)

var mySigningKey = []byte("go-resume")

// Claims 是一些实体（通常指的用户）的状态和额外的元数据
type Claims struct {
	Email  string
	UserId uint
	jwt.RegisteredClaims
}

// GenerateToken 根据用户的用户名和密码产生token
func GenerateToken(email string, userId uint, expireTime time.Time) (string, error) {

	claims := Claims{
		Email:  email,
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
			Issuer:    "mini-resume",
		},
	}
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)
	//该方法内部生成签名字符串，再用于获取完整、已签名的token
	token, err := tokenClaims.SignedString(mySigningKey)
	return token, err
}

// Valid 实现 `type Claims interface` 的 `Valid() error` 方法,自定义校验内容
func (c *Claims) Valid() (err error) {
	if !c.VerifyExpiresAt(time.Now(), true) {
		return errors.New("Token已过期")
	}
	if !c.VerifyIssuer("mini-resume", true) {
		return errors.New("发行者错误")
	}
	if c.UserId <= 0 {
		return errors.New("错误的UserId")
	}
	return
}

// AuthToken 验证并解析Token
func AuthToken(tokenStr string) (uint, string, error) {
	claims := Claims{}
	_, err := jwt.ParseWithClaims(tokenStr, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return mySigningKey, nil
	})
	if err != nil {
		return 0, "", err
	}
	return claims.UserId, claims.Email, err
}

// 将令牌黑名单存入Redis
func RevokedToken(tokenStr string) error {
	// 解析令牌
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// 提供密钥用于解密
		return mySigningKey, nil
	})
	if !token.Valid || err != nil {
		return fmt.Errorf("Token验证错误")
	}
	claims, ok := token.Claims.(*Claims)
	if ok {
		ctx := context.Background()
		err = RedisClient.Set(ctx, tokenStr, "", time.Until(claims.ExpiresAt.Time)).Err()
		return err
	} else {
		return fmt.Errorf("Token验证错误")
	}
}

// token是否注销
func IsTokenRevoked(token string) (bool, error) {
	ctx := context.Background()
	_, err := RedisClient.Get(ctx, token).Result()
	if err != nil {
		if err == redis.Nil {
			return false, nil
		}
		return true, fmt.Errorf("登录信息已经失效")
	}
	return true, fmt.Errorf("登录信息已经失效")
}
