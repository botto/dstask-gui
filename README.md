# dstask-gui (placeholder)

The name of this project is a placeholder, suggestions are more than welcome.  

## What

This is a HTTP API layer and Web frontend on top of [dstask](https://github.com/naggie/dstask/). It's born out of a need to manage my tasks when I'm using my phone.  

It does this by using dstask as a library and doesn't simply `exec` out to dstask.  

It's very early days still and expect bugs (possibly destroying your entire task history)

## Todo

[ ] Complete basic CRUD API  
[ ] Priorities (filter and add to task)  
[ ] Templates (add to task and show templates)  
[ ] Tags (filter and add to task)  
[ ] Contexts (filter and add to task)  
[ ] Project (filter and add to task)  
[ ] State (filter and set on task)  

## Dev setup

For development the app is broken in to 2 pieces

- Frontend end client
- Backend API server

To start them you can use `make debug` or if you want to start them individually, look below.

### Frontend

The frontend is a react based webapp that uses CRA as it's base, blueprint for component library and axios for API calls.

To start the FE app:

```shell
cd client
yarn
yarn run start
```

### Backend

The backend app is a simple go http api that has handlers to call dstask library function.

At the moment the backend relies on a modified version of `dstask` that includes tweaks so that dstask behaves better when used as a lib.
The advised way is to clone the modified version `git clone --branch lib-tweaks https://github.com/botto/dstask.git` and update the replace line in go mod to point to the correct path of the lib tweaks version.

To start the BE API:

```shell
go get
go run .
```
