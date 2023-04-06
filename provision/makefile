FE_BINARY=frontApp
BROKER_BINARY=brokerApp

up:
	@echo "Starting docker."
	docker compose up -d
	@echo "Containers started."

up_build:
	@echo "Stopping running containers."
	docker compose down
	@echo "Build and restart containers"
	docker compose up --build -d
	@echo "Containers started."

down:
	@echo "Stopping all containers."
	docker compose down
	@echo "Containers stopped."

start-front-dev:
	@echo "Starting frontend [dev]"
	cd ../micro-frontend && yarn start
