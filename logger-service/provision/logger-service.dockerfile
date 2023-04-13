FROM golang:1.20-alpine as builder

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN CGO_ENABLE=0 go build -o dist/loggerApp ./cmd/api

RUN chmod +x /app/dist/loggerApp

FROM alpine:latest

RUN mkdir /app

COPY --from=builder /app/dist/loggerApp /app

CMD ["/app/loggerApp"]