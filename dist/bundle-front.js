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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("var score,roundScore,activePlayer,gamePlaying;\nvar socket = io();\nlet counter = 0;\nlet socketRoomId = location.pathname.match(/(?<=\\/)(?=[^\\/]*$).*/gm)[0]\nwindow.addEventListener('click', e => {\n    counter++\n    // emit to server\n    socket.emit('join', 'hola this is the ' + counter + ' message');\n    socket.emit('join room', (socketRoomId))\n})\nconsole.log(socket);\n// when recive from server\nsocket.on('some event', msg => {\n    console.log('ddd');\n})\n\ninit();\n\ndocument.querySelector('.dice').style.display = 'none'; //set the dice invisbile\n\ndocument.querySelector('.btn-roll').addEventListener('click', function() {\n\n    if (gamePlaying){\n        //Random number\n        var dice = Math.floor(Math.random()*6 +1);  //create random number for dice\n\n        //Display the result\n        document.querySelector('.dice').style.display = 'block';\n        document.querySelector('.dice').src = '/img/dice-'+dice+'.png';\n\n        //update the roll number if the dive WAS NOT A 1\n        if (dice !== 1) {\n            // add score\n            roundScore += dice //Same as roundScore = roundScore + dice\n            document.getElementById('current-'+activePlayer).textContent = roundScore\n\n        } else {\n            nextPlayer();\n\n\n        }\n\n    }\n\n})\n\n\n//Hold button\n\ndocument.querySelector('.btn-hold').addEventListener('click', function () {\n    if (gamePlaying) {\n        //add CURRENT score to the global score\n        score[activePlayer] += roundScore;\n        \n        //update the UI\n        document.getElementById('score-'+activePlayer).textContent = score[activePlayer];\n\n\n\n\n        //check if the player win \n        var input = document.querySelector('.input-winning').value\n        var winScore;\n\n        if (input){\n            winScore = input;\n        } else{\n            winScore = 100;\n        }\n\n        if (score[activePlayer] >= winScore){\n            document.querySelector('#name-'+activePlayer).textContent = 'WINNER !'\n            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');\n            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('acitve');\n            document.querySelector('.dice').style.display = 'none'; //set the dice invisbile\n            gamePlaying = false;\n\n\n\n        } else {\n            nextPlayer();\n\n        }\n\n    }\n})\n\n\ndocument.querySelector('.btn-new').addEventListener('click', init)\n\n\n\n\n\nfunction nextPlayer() {\n    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0\n    //Same as\n    /*\n    if (activePlayer === 0) {\n        activePlayer = 1\n    } else {\n        activePlayer = 0\n    }\n    */\n   \n    //setting the scores to 0\n    roundScore = 0;\n    document.getElementById('current-0').textContent = 0\n    document.getElementById('current-1').textContent = 0\n\n    //change the css for active player\n    document.querySelector('.player-0-panel').classList.toggle('active')\n    document.querySelector('.player-1-panel').classList.toggle('active')\n\n    //remove dice when get 0 \n    document.querySelector('.dice').style.display = 'none';\n\n\n}\n\nfunction init() {\n    score = [0,0];\n    roundScore = 0;\n    activePlayer = 0;\n    gamePlaying = true;\n\n    //set the winner to player\n    document.querySelector('#name-0').textContent = 'PLAYER 1'\n    document.querySelector('#name-1').textContent = 'PLAYER 2'\n\n\n    //set all to 0 \n    document.getElementById('score-0').textContent = '0';\n    document.getElementById('score-1').textContent = '0';\n    document.getElementById('current-0').textContent = '0';\n    document.getElementById('current-1').textContent = '0';\n\n\n    //remove active class and winner class\n    document.querySelector('.player-0-panel').classList.remove('winner');\n    document.querySelector('.player-1-panel').classList.remove('winner');\n    document.querySelector('.player-0-panel').classList.remove('active');\n    document.querySelector('.player-1-panel').classList.remove('active');\n    document.querySelector('.player-0-panel').classList.add('active');\n    document.querySelector('.dice').style.display = 'none'; //set the dice invisbile\n\n\n}\n\n// alert('GAME RULES \\n \\n \\n - The game has 2 players, playing in rounds \\n \\n - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score \\n \\n - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\\'s the next player\\'s turn \\n \\n - The player can choose to \\'Hold\\', which means that his ROUND score gets added to his GLBAL score. After that, it\\'s the next player\\'s turn \\n \\n - The first player to reach 100 points on GLOBAL score wins the game')\n\n\n//# sourceURL=webpack://3-dom-pig-game/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;