/**
 * Created by ken on 06.06.2017.
 */
function EventController() {
    this.handleKeyEvent = function(event){
        //if arrow keys are pressed
        if(event.keyCode >= 37 && event.keyCode <= 40){
            if(!movement && !gridMovement){
                switch (event.keyCode){
                    //left
                    case 37:
                        selector.indexX--;
                        if(selector.indexX < 0){
                            selector.indexX = gameSize-1;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                            movement = setInterval(function(){
                                selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 1);
                        }else{
                            selector.xPos = selector.xPosArr[selector.indexX];
                            Rubics.update();
                        }
                        break;
                    //up
                    case 38:
                        selector.indexY--;
                        if(selector.indexY < 0){
                            selector.indexY = gameSize-1;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 1);
                        }else{
                            selector.yPos = selector.yPosArr[selector.indexY];
                            Rubics.update();
                        }
                        break;
                    //right
                    case 39:
                        selector.indexX++;
                        if(selector.indexX > gameSize-1){
                            selector.indexX = 0;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 1);
                        }else{
                            selector.xPos = selector.xPosArr[selector.indexX];
                            Rubics.update();
                        }
                        break;
                    //down
                    case 40:
                        selector.indexY++;
                        if(selector.indexY > gameSize-1){
                            selector.indexY = 0;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 1);
                        }else{
                            selector.yPos = selector.yPosArr[selector.indexY];
                            Rubics.update();
                        }
                        break;
                }
            }
        }else{
            switch (event.key){
                case "w":
                if(!movement && !gridMovement){
                    gridMovement = setInterval(function(){
                        Rubics.moveSurface("Up");
                    },1);
                }
                break;
                case "s":
                if(!movement && !gridMovement){
                    gridMovement = setInterval(function(){
                        Rubics.moveSurface("Down");
                    },1);
                }
                break;
                case "a":
                if(!movement && !gridMovement){
                    gridMovement = setInterval(function(){
                        Rubics.moveSurface("Left");
                    },1);
                }
                    break;
                case "d":
                if(!movement && !gridMovement){
                    gridMovement = setInterval(function(){
                        Rubics.moveSurface("Right");
                    },1);
                }
                    break;
                case "r":
                    if(!movement && !gridMovement){
                        infoSurface.drawInfoSurface();
                        randomizeSurface();
                    }
                    /*var file = new File([gameData], "rubicsDat.txt", {type: "text/plain;charset=utf-8"});
                    saveAs(file);*/
                    break;
                case "Escape":
                    Menu.showMenu();
                    Menu.showPrevSettings();
                    break;
            }
            Rubics.clear();
            Rubics.update();
        }
    };
}

function randomizeSurface() {
    //to reset the selector position
    var selectorPos = [selector.indexX, selector.indexY];
    switch (difficulty){
        case "Easy":
            do{
                for(let i = 0; i < 4; i++){
                    selector.indexX = Math.floor(Math.random() * gameSize);
                    selector.indexY = Math.floor(Math.random() * gameSize);
                    //move the grids in an unanimated way
                    gridMovements[Math.floor(Math.random() * 4)](false);
                }
                selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
            }while(gameFinished());
        break;
        case "Medium":
        do{
            for(let i = 0; i < 6; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)](false);
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
        case "Hard":
        do{
            for(let i = 0; i < 10; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)](false);
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
        case "Expert":
        do{
            for(let i = 0; i < 15; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)](false);
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
    }
}

//this is for gathering data from the game board and saving it on the local machine
/*function gatherData(surface) {
    for(var i = 0; i < gameSize; i++){
        for(var j = 0; j < gameSize; j++){

        }
    }
}*/

//surface grid movement functions, 0-up 1-down, 2-left, 3-right
//animated and unanimated movements are different so we seperate this with the 'animated' parameter
var gridMovements = [
    function moveGridUp(animated){
        if(animated){
            let tempArr = new Array(gameSize);
            let tempGrid;

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[selector.indexX][i];
            }

            for(let i = 0; i < gameSize; i++){
                tempGrid = tempArr[(i+1)%(gameSize)];
                if(tempGrid.yPos < 0){
                        surface[selector.indexX][gameSize-1] = new Grid(tempGrid.color,
                    tempGrid.xPos, canvasSize-tempGrid.size);
                }else{
                        surface[selector.indexX][i] = new Grid(tempGrid.color,
                    tempGrid.xPos, tempGrid.yPos);
                }
            }
        }else{
            let tempArr = new Array(gameSize);
            let tempGrid;

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[selector.indexX][i];
            }

            for(let i = 0; i < gameSize; i++){
                tempGrid = tempArr[(i+1)%(gameSize)];
                surface[selector.indexX][i] = new Grid(tempGrid.color,
                tempArr[i].xPos, tempArr[i].yPos);
            }
        }
    },
    function moveGridDown(animated){
        if(animated){
            let tempArr = new Array(gameSize);

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[selector.indexX][i];
            }

            surface[selector.indexX][0] = new Grid(tempArr[gameSize-1].color,
            tempArr[0].xPos, 0);

            for(let i = 1; i < gameSize; i++){
                surface[selector.indexX][i] = new Grid(tempArr[i-1].color, 
                tempArr[i].xPos, tempArr[i].yPos-surface[0][0].size);
            }     
        }else{
            let tempArr = new Array(gameSize);

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[selector.indexX][i];
            }

            surface[selector.indexX][0] = new Grid(tempArr[gameSize-1].color,
            tempArr[0].xPos, tempArr[0].yPos);

            for(let i = 1; i < gameSize; i++){
                surface[selector.indexX][i] = new Grid(tempArr[i-1].color, 
                tempArr[i].xPos, tempArr[i].yPos);
            }             
        }

    },
    function moveGridLeft(animated){
        if(animated){
            let tempArr = new Array(gameSize);
            let tempGrid; 

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[i][selector.indexY];
            }

            for(let i = 0; i < gameSize; i++){
                tempGrid = tempArr[(i+1)%(gameSize)];
                if(tempGrid.xPos < 0){
                        surface[gameSize-1][selector.indexY] = new Grid(tempGrid.color,
                    canvasSize-tempGrid.size, tempGrid.yPos);
                }else{
                        surface[i][selector.indexY] = new Grid(tempGrid.color,
                    tempGrid.xPos, tempGrid.yPos);
                }
            }
        }else{
            let tempArr = new Array(gameSize);
            let tempGrid; 

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[i][selector.indexY];
            }

            for(let i = 0; i < gameSize; i++){
                tempGrid = tempArr[(i+1)%(gameSize)];
                surface[i][selector.indexY] = new Grid(tempGrid.color,
                tempArr[i].xPos, tempArr[i].yPos);
            }            
        }
    },
    function moveGridRight(animated){
        if(animated){
            let tempArr = new Array(gameSize); 

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[i][selector.indexY];
            }

            surface[0][selector.indexY] = new Grid(tempArr[gameSize-1].color,
            0, tempArr[0].yPos);

            for(let i = 1; i < gameSize; i++){
                surface[i][selector.indexY] = new Grid(tempArr[i-1].color, 
                tempArr[i].xPos-surface[0][0].size, tempArr[i].yPos);
            }
        }else{
            let tempArr = new Array(gameSize); 

            for(let i = 0; i < gameSize; i++){
                tempArr[i] = surface[i][selector.indexY];
            }

            surface[0][selector.indexY] = new Grid(tempArr[gameSize-1].color, tempArr[0].xPos, tempArr[0].yPos);
            
            for(let i = 1; i < gameSize; i++){
                surface[i][selector.indexY] = new Grid(tempArr[i-1].color, tempArr[i].xPos, tempArr[i].yPos);
            }
        }
    }
]