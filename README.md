ArtTicket Backend

# Описание проекта

ArtTicket — backend часть приложения для покупки билетов на выставки и музеи.

Проект реализован в виде микросервисной архитектуры на Go.

# Используемые технологии
Go
Gin
PostgreSQL
WebSocket
Swagger (swaggo)
golang-migrate
Zap Logger
JWT
sqlmock
Testify

# Архитектура проекта

Проект состоит из:

ArtTicket/
├── auth-service
├── ticket-service
├── shared
├── frontend

# auth-service

Сервис авторизации и регистрации пользователей.

Функционал:
регистрация
логин
WT авторизация
middleware авторизации

Порт:8081

# ticket-service

Сервис работы с билетами.

Функционал:
создание билетов
получение билетов пользователя
websocket чат

Порт:8082


# shared

Общие модули проекта.

Содержит:
JWT модуль
Logger модуль

Модули импортируются через GitHub.

# База данных

Используется PostgreSQL без ORM.

Подключение осуществляется через стандартный пакет:

go
database/sql

Драйвер:

go
github.com/lib/pq

# Миграции

Для управления миграциями используется:

golang-migrate

В проекте присутствуют SQL миграции:

migrations/

Пример запуска миграций:

migrate -path migrations -database "postgres://postgres:1234@localhost:5432/artticket?sslmode=disable" up


# Swagger

Swagger документация доступна:

# auth-service

http://localhost:8081/swagger/index.html

# ticket-service

http://localhost:8082/swagger/index.html

# Запуск проекта

# 1. Запуск PostgreSQL

Пример через Docker:

docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=artticket \
  -p 5432:5432 \
  postgres


# 2. Запуск auth-service

cd auth-service
go run cmd/main.go

# 3. Запуск ticket-service

cd ticket-service
go run cmd/main.go

# Тестирование

В проекте используются:

unit tests
mock tests
sqlmock
testify

Запуск тестов:

go test ./...

Запуск тестов с coverage:

go test ./... -cover

# Логирование

Для логирования используется:

zap

Logger вынесен в отдельный shared модуль.

# JWT

JWT функциональность вынесена в shared модуль.

Используется для:

генерации токена
проверки токена
middleware авторизации

# Чистая архитектура

Проект реализован с разделением на слои:

controllers
repositories
middleware
infrastructure
entities
routes

# Выполненные требования Б2

PostgreSQL без ORM
golang-migrate
минимум 3 миграции
минимум 2 микросервиса
unit tests
mock tests
shared modules
GitHub modules
clean architecture
zap logger
Swagger документация
