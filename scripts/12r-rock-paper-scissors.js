//using default ||
const score = JSON.parse(localStorage.getItem('score')) ||
{
  wins :0,
  losses : 0,
  ties : 0
};

/*
if(!score ){
score = {
  wins :0,
  losses : 0,
  ties : 0
};
}
*/

updateScoreElement();//to display when we refresh the page
localStorage.setItem('message','hrllo');
console.log(localStorage.getItem('message'));
localStorage.removeItem('message');
console.log(localStorage.getItem('message'));



document.body.addEventListener('keydown',(event)=>{
  console.log(event.key);
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }else if(event.key === 'a'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    resetScore();
  }
});




let isAutoPlaying = false;
let intervalId ;

// const autoPlay = ()=>{

// }
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';

  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  }
}
document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
});
document.querySelector('.js-scissor-button').addEventListener('click',()=>{
  playGame('scissors');
});

function resetScore(){
  const conformationMessage = document.querySelector('.js-conformation');
  conformationMessage.innerHTML ='Are you sure you want to reset the score <button class="js-reset-yes-button" >Yes</button> <button class="js-reset-no-button" >No</button>'

    document.querySelector('.js-reset-yes-button')
      .addEventListener('click' ,()=>{
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        conformationMessage.innerHTML = '';
      });

    document.querySelector('.js-reset-no-button')
      .addEventListener('click' ,()=>{
        conformationMessage.innerHTML = '';
      });
    
    
    updateScoreElement();
}
document.querySelector('.js-reset-score-button').addEventListener('click',()=>{
  resetScore();
});
document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoPlay();
});

function playGame(playerMove){
const computerMove = pickComputerMove();

let result = '';
if(playerMove === 'rock'){
  if(computerMove === 'rock'){
    result = 'Tie.';
  }else if(computerMove === 'paper'){
    result = 'You lose.';
  }else if( computerMove === 'scissors'){
    result = 'You win.';
  }
  
}else if(playerMove === 'paper'){
  if(computerMove === 'paper'){
    result = 'Tie.';
  }else if(computerMove === 'scissors'){
    result = 'You lose.';
  }else if( computerMove === 'rock'){
    result = 'You win.';
  }

}else if (playerMove === 'scissors'){
  if(computerMove === 'scissors'){
    result = 'Tie.';
  }else if(computerMove === 'rock'){
    result = 'You lose.';
  }else if( computerMove === 'paper'){
    result = 'You win.';
  }
  
}
if(result === 'You win.'){
  score.wins++;
}else if (result === 'You lose.'){
  score.losses++;
}else if( result === 'Tie.'){
  score.ties++;
}
localStorage.setItem('score',JSON.stringify(score));
document.querySelector('.js-result')
  .innerHTML = `${result}`;
document.querySelector('.js-moves')
.innerHTML = `You 
<img src="10-rock-paper-scissors-image/${playerMove}-emoji.png" alt="Paper" class="move-icon">
<img src="10-rock-paper-scissors-image/${computerMove}-emoji.png" alt="Scissors" class="move-icon">
Computer.`;
updateScoreElement();
}

function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML = `Wins :${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
let computerMove = '';
const randomNumber = Math.random();
if(randomNumber >= 0 && randomNumber < 1/3){
  computerMove = 'rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3){
  computerMove = 'paper';
}else if(randomNumber >= 2/3 && randomNumber < 1){
  computerMove = 'scissors';
}
return computerMove;
}


