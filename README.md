# FASHIONFINDR

## Demo
[fashionfindr](https://fashionfindr.herokuapp.com/)

## Built With

* React (Hooks)
* Redux
* Express
* Node.js
* MongoDB

## Installing

### Files to add

You should have a `server/.env` file, with for example the following values:

```
PORT=5000
MONGODB_URI="mongodb://localhost/example-db"
```

### To Run
1. In the directory of the project run:

**To install all the packages**
```
$ npm install
# OR
$ (cd server && npm install)
$ (cd client && npm install)
```
**To install a package for the server**
```sh
$ cd server
$ npm install --save axios
```

**To install a package for the client**
```sh
$ cd client
$ npm install --save axios
```

```

2. Open two terminal windows to get the application up and running on server and client side

**Terminal 1**
```
$npm run dev:server // -> # Server running on http://localhost:4000/
```
**Terminal 2**
```
$npm run dev:client // -> # Client running on http://localhost:3000/
#OR
$npm run dev:windows:client // -> # If you are a windows user
```



