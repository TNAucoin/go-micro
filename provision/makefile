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



build_front:
	@echo "Building frontend binary"
	cd ../front-end && env GOOS=linux CGO_ENABLED=0 go build -o ${FE_BINARY} ./cmd/web
	@echo "Finished."

start: build_front
	@echo "Starting frontend."
	cd ../front-end && go build -o ${FE_BINARY} ./cmd/web
	cd ../front-end && ./${FE_BINARY} &

stop:
	@echo "Stopping front end..."
	@-pkill -SIGTERM -f "./${FRONT_END_BINARY}"
	@echo "Stopped front end!"
