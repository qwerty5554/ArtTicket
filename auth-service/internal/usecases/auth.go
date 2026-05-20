package usecases

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/repositories"

	jwtservice "github.com/qwerty5554/ArtTicket/shared/jwt"

	"golang.org/x/crypto/bcrypt"
)

type AuthUsecase struct{}

func NewAuthUsecase() *AuthUsecase {
	return &AuthUsecase{}
}

func (u *AuthUsecase) Register(
	user entities.User,
) (string, entities.User, error) {

	user.Role = "user"

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return "", entities.User{}, err
	}

	user.Password = string(hashedPassword)

	err = repositories.CreateUser(user)

	if err != nil {
		return "", entities.User{}, err
	}

	createdUser, err :=
		repositories.GetUserByEmail(
			user.Email,
		)

	if err != nil {
		return "", entities.User{}, err
	}

	token, err := jwtservice.GenerateToken(
		createdUser.ID,
		createdUser.Role,
	)

	if err != nil {
		return "", entities.User{}, err
	}

	createdUser.Password = ""

	return token, createdUser, nil
}

func (u *AuthUsecase) Login(
	email string,
	password string,
) (string, entities.User, error) {

	user, err := repositories.GetUserByEmail(
		email,
	)

	if err != nil {
		return "", entities.User{}, err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)

	if err != nil {
		return "", entities.User{}, err
	}

	token, err := jwtservice.GenerateToken(
		user.ID,
		user.Role,
	)

	if err != nil {
		return "", entities.User{}, err
	}

	user.Password = ""

	return token, user, nil
}