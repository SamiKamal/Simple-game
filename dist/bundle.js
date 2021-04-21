/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst {uid} = __webpack_require__(/*! uid/single */ \"uid/single\")\r\nconst app = express();\r\nconst http = __webpack_require__(/*! http */ \"http\");\r\nconst server = http.createServer(app);\r\nconst io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\r\nlet connectedUsers = 0\r\nvar players = {};\r\nvar rooms = {};\r\n\r\n\r\napp.get('/', (req, res) => {\r\n  res.redirect('/home');\r\n});\r\n\r\n\r\napp.use(express.static(__dirname));\r\n\r\napp.get('/home', (req, res) => {\r\n  res.sendFile(__dirname + '/home.html');\r\n});\r\n\r\napp.get('/offline', (req, res) => {\r\n  res.sendFile(__dirname + '/indexOffline.html');\r\n});\r\n\r\napp.get('/online', (req, res) => {\r\n  res.sendFile(__dirname + '/onlineHome.html')\r\n  \r\n});\r\n\r\napp.get('/online/:id', (req, res) => {\r\n  let playersSet = new Set()\r\n  \r\n  res.sendFile(__dirname + '/index.html');\r\n  \r\n  \r\n  io.on('connection', socket => {\r\n    var clients_in_the_room = 0;\r\n    \r\n    socket.on('join room', ({socketRoomId, username}) => {\r\n      clients_in_the_room = io.sockets.adapter.rooms.get(socketRoomId)?.size\r\n      if(clients_in_the_room < 2 || clients_in_the_room === undefined){\r\n        rooms[socketRoomId] = {// add an example starter room\r\n          id: socketRoomId,\r\n          players: [],\r\n          setCount: 0\r\n      };\r\n        console.log('Waiting for an opponent')\r\n        socket.join(socketRoomId)\r\n        socket._username = username\r\n        rooms[socketRoomId].players.push(socket)\r\n        rooms[socketRoomId].setCount++\r\n        var newPlayer = {//A better pratice would be create a \"class\" or new function for the Player object\r\n          id: socket.id,\r\n          name: username,\r\n         };\r\n         players[socket.id] = newPlayer;//Adding this to the players dictionary will let us find the player object again via their socket id'\r\n      \r\n        playersSet.add(socket)\r\n          \r\n        } else if (clients_in_the_room === 2){\r\n          console.log('SORRY, Lobby is full');\r\n        }\r\n        socket.to(socketRoomId).emit('some event', 'You joined the room');\r\n        \r\n      })\r\n      \r\n    socket.on('test', s => {\r\n      console.log(rooms, players);\r\n    })\r\n    console.log(socket.id + ' ==== connected');\r\n    \r\n      socket.on('disconnect', () => {\r\n\r\n        console.log(socket.id + ' ==== diconnected');\r\n        for (const [key, value] of Object.entries(players)) {\r\n          if (value.id === socket.id){\r\n            delete key\r\n          }\r\n        }\r\n      \r\n        // socket.removeAllListeners();\r\n       });\r\n  \r\n})\r\n\r\nsetInterval(() => {\r\n  for (const [key, value] of Object.entries(rooms)) {\r\n    if (value.players.length === 0){\r\n      delete key\r\n    }\r\n  }\r\n}, 10000)\r\n\r\n\r\n// when user connects\r\n})\r\n\r\nserver.listen(3000, () => {\r\n  console.log('listening on *:3000');\r\n});\n\n//# sourceURL=webpack://3-dom-pig-game/./src/server/index.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");;

/***/ }),

/***/ "uid/single":
/*!*****************************!*\
  !*** external "uid/single" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("uid/single");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.js");
/******/ 	
/******/ })()
;