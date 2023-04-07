FROM golang:1.20-alpine as builder

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN CGO_ENABLE=0 go build -o dist/authApp ./cmd/api

RUN chmod +x /app/dist/authApp

FROM alpine:latest

RUN mkdir /app

COPY --from=builder /app/dist/authApp /app

CMD ["/app/authApp"]