function drawInfoCanvas() {
    var infoSurface = construct2DArr();
    var infoCanvasData = Rubics.infoCanvas.getBoundingClientRect();
    var infoContext = Rubics.infoContext;
    var gridSize = canvasSize/gameSize;
    var i,j;

    for(i = 0; i < gameSize; i++){
        for(j = 0; j < gameSize; j++){
            infoSurface[i][j] = new Grid("black", infoCanvasData.left+(gridSize*i),infoCanvasData.top+(gridSize*j));
        }
    }

    //draw grids
    var tempGrid;
    for(i = 0; i < gameSize; i++){
        for(j = 0; j < gameSize; j++){
            tempGrid = infoSurface[i][j];
            //console.log("Temp Grid Info: " + tempGrid.xPos + " " + tempGrid.yPos);
            infoContext.fillStyle = tempGrid.color;
            infoContext.fillRect(tempGrid.xPos, tempGrid.yPos, tempGrid.size, tempGrid.size);
        }
    }
}

//will be usefull sometime...
function construct2DArr() {
    var result = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        result[i] = new Array(gameSize);
    }
    return result;
}