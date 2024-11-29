document.addEventListener('DOMContentLoaded',()=>{
    let startBtn=document.querySelector('.start');
    let scoreDisplay=document.querySelector('span');
    let squares=document.querySelectorAll('.grid div');
    console.log(squares);
    
    
    const width=10;
    let currentIndex=0;
    let currentSnake=[2,1,0];
    let direction=1;
    let appleIndex=3;
    let score=0;
    let speed=0.9;
    let intervalTime=0;
    let interval=0;
    
    function startGame(){
    currentSnake.forEach(index=>squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score=0;
    
        radmonApple();
        direction=1;
        scoreDisplay.textContent=score;
        intervalTime=1000;
        currentSnake=[2,1,0];
        currentIndex=0;
        currentSnake.forEach(index=>squares[index].classList.add('snake'));
        console.log('the current snake is ',currentSnake);
        interval=setInterval(moves,intervalTime);
        console.log(interval);
    }
    
    function moves(){
        if(
            (currentSnake[0]+width>=(width*width) && direction===width) ||
            (currentSnake[0]-width<0 && direction===-width) ||
            (currentSnake[0]%width===0 && direction===-1) ||
            (currentSnake[0]%width===(width-1) && direction===1) ||
            squares[currentSnake[0]+direction].classList.contains('snake')
        ){
            const poisition=currentSnake[0];
            alert('Game is over');
            console.log('snake current head',poisition);
            return clearInterval(interval);
        }
        const tail=currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0]+direction);
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            score++;
            scoreDisplay.innerHTML=score;
            console.log('the score is ',score);
            radmonApple();
            clearInterval(interval);
            intervalTime=intervalTime*speed;
            interval=setInterval(moves,intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    
    }
    
    function control(e){
        console.log('hvgh');
        if(e.keyCode===39){
            direction=1
        }
        else if(e.keyCode===37){
            direction=-1
        }
    
        else if(e.keyCode===38){
            direction=-width
        }
        else if(e.keyCode===40){
            direction=+width
        }
    }
    function radmonApple(){
        // do{
        //     appleIndex=Math.floor(Math.random()*squares.length);
        //     console.log('apple index is at ',appleIndex);
        //     console.log('Sbnake index is at ',currentSnake);
        //     squares[appleIndex].classList.add('apple');
        // }while(squares[appleIndex].classList.contains('snake')){
        //     radmonApple();
        // }
    
            appleIndex=Math.floor(Math.random()*squares.length);
            console.log('apple index is at ',appleIndex);
            console.log('Sbnake index is at ',currentSnake);
            squares[appleIndex].classList.add('apple');
       while(squares[appleIndex].classList.contains('snake')){
            radmonApple();
        }
    }
    
    document.addEventListener('keyup',control)
    startBtn.addEventListener('click',startGame)
    
    })