package middleware

import (
	"net/http"
	"strings"

	jwtservice "github.com/qwerty5554/shared/jwt"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "no token",
			})

			c.Abort()

			return
		}

		tokenString := strings.Replace(
			authHeader,
			"Bearer ",
			"",
			1,
		)

		claims, err := jwtservice.ParseToken(tokenString)

		if err != nil {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid token",
			})

			c.Abort()

			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("role", claims.Role)

		c.Next()
	}
}