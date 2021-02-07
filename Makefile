.PHONY: all build

all: build

deps:
	go get github.com/GeertJohan/go.rice/rice

debug:
	go run . & yarn --cwd client run start

build:
	cd client && yarn install && yarn build
	rice embed-go
	GOOS=linux CGO_ENABLED=0 go build -a -ldflags="-s -w" -o dist/dstask-gui .
	(type upx && upx dist/dstask-gui) || { echo "Missing upx, can't make smaller bin :("; }
	rice clean