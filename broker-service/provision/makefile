BROKER_BINARY=brokerApp

docker-build-broker:
	@echo 'Building broker binary.'
	cd .. && env GOOS=linux CGO_ENABLED=0 go build -o dist/${BROKER_BINARY} ./cmd/api
	@echo "Finished."