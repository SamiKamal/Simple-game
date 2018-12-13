var score,roundScore,activePlayer,gamePlaying;

init();
var lastDice;

document.querySelector('.dice').style.display = 'none'; //set the dice invisbile
document.querySelector('.dice2').style.display = 'none'; //set the dice invisbile


document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying){
        //Random number
        var dice = Math.floor(Math.random()*6 +1);  //create random number for dice
        var dice2 = Math.floor(Math.random()*6 +1);  //create random number for dice

        //Display the result
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-'+dice+'.png';
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice2').src = 'dice-'+dice2+'.png';


        //update the roll number if the dice WAS NOT A 1
        if (dice !== 1 && dice2 !== 1 ) {
            // add score
            roundScore += dice + dice2 //Same as roundScore = roundScore + dice
            document.getElementById('current-'+activePlayer).textContent = roundScore

        } else {
            nextPlayer();


        }
        /*
        if (dice === 6 && dice2 === 6){
            score[activePlayer] = 0
            document.getElementById('score-'+activePlayer).textContent = '0';
            nextPlayer();
        }
        */
    }

})


//Hold button

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add CURRENT score to the global score
        score[activePlayer] += roundScore;
        
        //update the UI
        document.getElementById('score-'+activePlayer).textContent = score[activePlayer];




        //check if the player win 
        var input = document.querySelector('.input-winning').value
        var winScore;

        if (input){
            winScore = input;
        } else{
            winScore = 100;
        }
        if (score[activePlayer] >= winScore){
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER !'
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('acitve');
            document.querySelector('.dice').style.display = 'none'; //set the dice invisbile
            gamePlaying = false;



        } else {
            nextPlayer();

        }

    }
})


document.querySelector('.btn-new').addEventListener('click', init)





function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    //Same as
    /*
    if (activePlayer === 0) {
        activePlayer = 1
    } else {
        activePlayer = 0
    }
    */
   
    //setting the scores to 0
    roundScore = 0;
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0

    //change the css for active player
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    //remove dice when get 0 
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';



}

function init() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //set the winner to player
    document.querySelector('#name-0').textContent = 'PLAYER 1'
    document.querySelector('#name-1').textContent = 'PLAYER 2'


    //set all to 0 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    //remove active class and winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none'; //set the dice invisbile
    document.querySelector('.dice2').style.display = 'none'; //set the dice invisbile



}