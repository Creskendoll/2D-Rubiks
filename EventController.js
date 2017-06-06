/**
 * Created by ken on 06.06.2017.
 */
function EventController() {
    this.handleKeyEvent = function(event){
        //console.log(event);
        //if arrow keys are pressed
        if(event.keyCode >= 37 && event.keyCode <= 40){
            if(!movement){
                switch (event.keyCode){
                    //left
                    case 37:
                        selector.indexX--;
                        if(selector.indexX < 0){
                            selector.indexX = gameSize-1;
                            selector.outOfMap = true;
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                        break;
                    //up
                    case 38:
                        selector.indexY = selector.indexY-1;
                        if(selector.indexY < 0){
                            selector.indexY = gameSize-1;
                            selector.outOfMap = true;
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                        break;
                    //right
                    case 39:
                        selector.indexX = selector.indexX+1;
                        if(selector.indexX > gameSize-1){
                            selector.indexX = 0;
                            selector.outOfMap = true;
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                        break;
                    //down
                    case 40:
                        selector.indexY = selector.indexY+1;
                        if(selector.indexY > gameSize-1){
                            selector.indexY = 0;
                            selector.outOfMap = true;
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                        break;
                }
            }
        }else{
            var tempArr = new Array(gameSize);
            var i = 0;

            Rubics.clear();
            Rubics.update();
            switch (event.key){
                case "w":
                    break;
                case "s":
                    break;
                case "a":
                    //vertical array, WORKS
                    for(i = 0; i < gameSize; i++){
                        tempArr[i] = surface[i][selector.indexY];
                    }

                    //swaps the places as needed but doesn't update surface
                    for(i = 0; i < gameSize; i++){
                        var tempGrid = tempArr[(i+1)%(gameSize)];
                        surface[i][selector.indexY] = new Grid(tempGrid.color,
                            tempArr[i].xPos, tempArr[i].yPos);
                    }
                    break;
                case "d":
                    for(i = 0; i < gameSize; i++){
                        tempArr[i] = surface[i][selector.indexY];
                    }

                    surface[0][selector.indexY] = new Grid(tempArr[gameSize-1].color, tempArr[0].xPos, tempArr[0].yPos);
                   // console.log(surface[0][selector.indexY]);

                    for(i = 1; i < gameSize; i++){
                        surface[i][selector.indexY] = new Grid(tempArr[i-1].color, tempArr[i].xPos, tempArr[i].yPos);
                    }
                    break;
                case " ":
                    console.log(surface);
                    break;
            }
            Rubics.clear();
            Rubics.update();
        }
    }
}