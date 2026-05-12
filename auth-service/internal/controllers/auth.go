package controllers

import (
	"net/http"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/repositories"

	jwtservice "github.com/qwerty5554/shared/jwt"
	loggerservice "github.com/qwerty5554/shared/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
)

// Register godoc
// @Summary Register user
// @Description create new user
// @Tags auth
// @Accept json
// @Produce json
// @Param user body map[string]string true "User"
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

	user.Role = "user"

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {

		loggerservice.Logger.Error(
			"password hash error",
			zap.Error(err),
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "password hash error",
		})

		return
	}

	user.Password = string(hashedPassword)

	err = repositories.CreateUser(user)

	if err != nil {

		loggerservice.Logger.Error(
			"create user error",
			zap.Error(err),
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	createdUser, err := repositories.GetUserByEmail(
		user.Email,
	)

	if err != nil {

		loggerservice.Logger.Error(
			"user fetch error",
			zap.Error(err),
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "user fetch error",
		})

		return
	}

	token, err := jwtservice.GenerateToken(
		createdUser.ID,
		createdUser.Role,
	)

	if err != nil {

		loggerservice.Logger.Error(
			"token generation error",
			zap.Error(err),
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "token error",
		})

		return
	}

	createdUser.Password = ""

	loggerservice.Logger.Info(
		"user registered",
		zap.String("email", user.Email),
	)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  createdUser,
	})
}

// Login godoc
// @Summary Login user
// @Description login user
// @Tags auth
// @Accept json
// @Produce json
// @Param data body map[string]string true "Login"
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

	user, err := repositories.GetUserByEmail(
		data.Email,
	)

	if err != nil {

		loggerservice.Logger.Error(
			"user not found",
			zap.Error(err),
		)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "user not found",
		})

		return
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(data.Password),
	)

	if err != nil {

		loggerservice.Logger.Error(
			"wrong password",
			zap.Error(err),
		)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "wrong password",
		})

		return
	}

	token, err := jwtservice.GenerateToken(
		user.ID,
		user.Role,
	)

	if err != nil {

		loggerservice.Logger.Error(
			"token generation error",
			zap.Error(err),
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "token error",
		})

		return
	}

	user.Password = ""

	loggerservice.Logger.Info(
		"user login",
		zap.String("email", user.Email),
	)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}