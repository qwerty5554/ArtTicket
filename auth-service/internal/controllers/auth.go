package controllers

import (
	"net/http"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/usecases"

	loggerservice "github.com/qwerty5554/ArtTicket/shared/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

var authUsecase =
	usecases.NewAuthUsecase()

// Register godoc
// @Summary Регистрация пользователя
// @Description Создание нового аккаунта
// @Tags auth
// @Accept json
// @Produce json
// @Param user body entities.User true "User"
// @Success 200 {object} map[string]interface{}
// @Router /register [post]
func Register(c *gin.Context) {

	var user entities.User

	if err := c.BindJSON(&user); err != nil {

		loggerservice.Logger.Error(
			"invalid register json",
			zap.Error(err),
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid json",
		})

		return
	}

	token, createdUser, err :=
		authUsecase.Register(user)

	if err != nil {

		loggerservice.Logger.Error(
			"register error",
			zap.Error(err),
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  createdUser,
	})
}

// Login godoc
// @Summary Авторизация
// @Description Вход пользователя
// @Tags auth
// @Accept json
// @Produce json
// @Param user body entities.User true "User"
// @Success 200 {object} map[string]interface{}
// @Router /login [post]
func Login(c *gin.Context) {

	var data struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&data); err != nil {

		loggerservice.Logger.Error(
			"invalid login json",
			zap.Error(err),
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid json",
		})

		return
	}

	token, user, err :=
		authUsecase.Login(
			data.Email,
			data.Password,
		)

	if err != nil {

		loggerservice.Logger.Error(
			"login error",
			zap.Error(err),
		)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}