FROM golang:1.20-alpine as builder

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN CGO_ENABLE=0 go build -o dist/brokerApp ./cmd/api

RUN chmod +x /app/dist/brokerApp

FROM alpine:latest

RUN mkdir /app

COPY --from=builder /app/dist/brokerApp /app

CMD ["/app/brokerApp"]