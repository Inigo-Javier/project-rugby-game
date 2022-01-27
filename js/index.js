window.onload = () => {
    document.getElementById('start-button').onclick = () =>{
        startGame();
    };

function startGame(){
  document.activeElement.blur()
  rugbyApp.init()
   }
};