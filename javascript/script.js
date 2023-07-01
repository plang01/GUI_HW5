/*  
    File: script.js
    GUI Assignment: Implement part of the game Scrabble with drag-and-drop
    Phat Lang, UMass Lowell Computer Science, Phat_Lang@student.uml.edu
    What to submit: Readme file with Github URL and link to repository, a zip file contains the code, 
    and a writeup describing what's working and what's not
    Description: Implement features of the game Scrabble using drag-and-drop 
    Copyright (c) 2023 by Phat Lang. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated by Phat Lang on July 1 at 1:54 p.m
    ReferencesCitations: I used W3Schools, Stackoverflow, and jQuery for references. 
    Additionally I borrowed codes from 
        https://stackoverflow.com/questions/33948464/move-an-image-with-javascript-using-mouse-events
        https://www.youtube.com/watch?v=wI1CWzNtE-M
        https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates
*/



// Global object;
let boardGrid=[];
let letterPiece=[];
let dataObject;
let piece = [];
var object = new Object();
var temp;
var moving = false;
var y =0

// Create object to store grids and letterpieces infos
function createGrid(){
    var grid1 = new Object();
    var leftPos = $(".board").offset().left + 16; 
    var rightPos = leftPos + 88;
    grid1.leftPosition = leftPos;
    grid1.rightPosition = rightPos;
    grid1.isEmpty = true;
    grid1.slot = -1;
    grid1.name = "none";
    boardGrid.push(grid1);
    for(var i=0; i < 14; i++){
        grid1 = new Object();
        leftPos = rightPos + 5;
        rightPos = leftPos + 88;
        grid1.leftPosition = leftPos;
        grid1.rightPosition = rightPos;
        grid1.isEmpty = true;
        grid1.slot = -1;
        grid1.name = "none"
        boardGrid.push(grid1);
    }

    for(var i = 1; i <= 7; i++) {
        temp = new Object();
        var id = "t" + i;
        temp.name = id;
        temp.pos = $("." + id).offset().left;
        temp.occupy = -1;
        temp.value = 1;
        letterPiece.push(temp);
    }

}

// Call when body loaded
$(function(){
    createGrid();

    // Read from json file and create a copy of javascript object
    $.getJSON("json/pieces.json", function(data) {
        dataObject = JSON.parse(JSON.stringify(data.pieces));
        for(var i = 0; i < 7; i++){
            letter = getLetter(dataObject);

        }
        upload(dataObject);

    });

    // Get element value of each piece
    var piece1 = $(".t1");
    var piece2 = $(".t2");
    var piece3 = $(".t3");
    var piece4 = $(".t4");
    var piece5 = $(".t5");
    var piece6 = $(".t6");
    var piece7 = $(".t7");
    y = $(".t1").offset().top;
    
    // Call initialClick if user click on any of the pieces
    piece1[0].addEventListener("mousedown", initialClick);
    piece2[0].addEventListener("mousedown", initialClick)
    piece3[0].addEventListener("mousedown", initialClick)
    piece4[0].addEventListener("mousedown", initialClick)
    piece5[0].addEventListener("mousedown", initialClick);
    piece6[0].addEventListener("mousedown", initialClick)
    piece7[0].addEventListener("mousedown", initialClick)
 
})

// Cleared the board after each round and update scoreboard
function submit(){
    for(var i = 0; i < letterPiece.length; i++) {
        if(letterPiece[i].occupy != -1) {

            letter = getLetter(dataObject);
        }
    }
    resetPos();
    upload(dataObject);
    var currentPoint = $(".point").text().substring(7);
    var temp = $(".totalPoint").text().substring(14);
    var totalPoint = Number(currentPoint) + Number(temp);
   var b = $(".totalPoint").text().replace(temp, totalPoint);
   $(".totalPoint").text(b);
   $(".point").text("Point: 0");

}

// Reset position of each piece back to rack
function resetPos() {
    for(var i = 0; i < letterPiece.length; i++) {
       $("." + letterPiece[i].name)[0].style.left = letterPiece[i].pos + "px";
       $("." + letterPiece[i].name)[0].style.top = y + "px";
    }
}

// Restart the game by reloading the page
function restart() {
    location.reload();
}

// Check if the position dropped into the correct tile, otherwise return false 
// Case 1: Tile can only hold one piece, and once it places on the board it cannot be moved
// Case 2: Except the first piece, subsequent pieces must be placed next to another piece
function checkPosition(piecePosX, piecePosY, pieceId, boardPos ) {
    var status = false;
    var currentPiece = 0;
    var t;
    for(var i = 0; i < letterPiece.length; i++) {
        if(boardPos == letterPiece[i].pos) {
            currentPiece = i;
        }
    }
    
    if (piecePosY > 68 && piecePosY < 118){
        for(var i = 0; i <= 14; i++) {
            if(piecePosX > boardGrid[i].leftPosition && piecePosX < boardGrid[i].rightPosition && boardGrid[i].isEmpty == true){
                for(var j = 0; j < letterPiece.length; j++) {
                    if(letterPiece[j].occupy != -1) {
                        if (i == 0) {
                            if(boardGrid[i+1].isEmpty != false) {
                                return status;
                            }
                        }
                        else if (i == 14) {
                            if (boardGrid[i-1].isEmpty != false) {
                                return status
                            }
                        }

                        else {
                            if((boardGrid[i-1].isEmpty != false) && (boardGrid[i+1].isEmpty != false)) {
                                return status;
                            }
                        }
                    }
                }

                status = true;
                boardGrid[i].isEmpty = false;
                boardGrid[i].slot = i;
                boardGrid[i].name = pieceId.attr("class");
                t = letterPiece[currentPiece].occupy;
                if(t != -1) {
                    boardGrid[t].isEmpty = true;
                }
                letterPiece[currentPiece].occupy = i;
                break;
            }
            if (letterPiece[currentPiece].name == boardGrid[i].name && piecePosX > boardGrid[i].leftPosition && piecePosX < boardGrid[i].rightPosition){
                status = true;
                return status
            }
            else{
                continue;
            }

        }
    }
    return status;
}

// Allow user to click once to have the piece follow cursor, and click again to place the piece
// If its not correct tile, the piece will bounce back to the rack
function initialClick() {
    for(var i = 0; i < letterPiece.length; i++) {
        if (letterPiece[i].name == $(this).attr("class")) {
            if(letterPiece[i].occupy != -1) {
                return;
            }
        }
    }

    $(this).css("z-index", "100");
    var cx = $(this).offset().left;
    var cy = $(this).offset().top;
    var t;
    image = this;
    if(moving){
        document.removeEventListener("mousemove", move);
        for(var i =0; i < letterPiece.length; i++) {
            if($(this).attr("class") == letterPiece[i].name){
                t = letterPiece[i].pos;
            }
        }

        if (checkPosition(cx,cy,$(this),t) != true) {
        image.style.left = t + "px";
        image.style.top = y + "px";
        }
        moving = false;
        $(this).css("z-index", "auto");
        calcPoint();
        return;
    }
    
    moving = true;
    document.addEventListener("mousemove", move);
}

// Have the piece follow the cursor
function move(e){
    var newX = e.clientX - 10;
    var newY = e.clientY - 10;
    image.style.left = newX + "px";
    image.style.top = newY + "px";
}

// Calculate the current point based the pieces value and tile bonus square multipliers
function calcPoint() {
    var point = 0;
    var doublePoint = false;
    for (var i =0; i < letterPiece.length; i++) {
        if (letterPiece[i].occupy != -1) {
            if (letterPiece[i].occupy == 2 || letterPiece[i].occupy == 12) {
                doublePoint = true
                point += letterPiece[i].value;
            }
            else if (letterPiece[i].occupy == 6 || letterPiece[i].occupy == 8) {
                var tempPoint = letterPiece[i].value * 2;
                point += tempPoint;
            }
            else {
                point += letterPiece[i].value;
            }
        }
    }
    if(doublePoint == true) {
        point *= 2;
    }
    $(".point").text("Point: " + point);
    return point;
}

// Randomly select letter piece, does keep track of remaining pieces
function getLetter(jsonObject){
    var prob = [];
    $(jsonObject).each(function(index, value){
        for(var i = 0; i < value.amount;i++) {
            prob.push(value.letter);
        }
    })
    var idx = Math.floor(Math.random() * prob.length);
    if(prob.length != 0) {
        if(prob[idx] == "_") {
            for(var i = 0; i < letterPiece.length; i++){
                if (letterPiece[i].occupy == -1 && piece.length < 7) {
                    piece.push("Blank");
                    break;
                }
                else if (letterPiece[i].occupy != -1 && piece.length >= 7) {
                    var m = letterPiece[i].occupy;
                    boardGrid[m].isEmpty = true;
                    boardGrid[m].slot = -1;
                    boardGrid[m].name = "none"
                    letterPiece[i].occupy = -1;
                    piece[i] = "Blank";
                    break;
                }
            }
        }
        else{
            for(var i = 0; i < letterPiece.length; i++){
                if (letterPiece[i].occupy == -1 && piece.length < 7) {
                    piece.push(prob[idx]);
                    break;
                }
                else if (letterPiece[i].occupy != -1 && piece.length >= 7) {
                    var m = letterPiece[i].occupy;
                    boardGrid[m].isEmpty = true;
                    boardGrid[m].slot = -1;
                    boardGrid[m].name = "none"
                    letterPiece[i].occupy = -1;
                    piece[i] = prob[idx];
                    break;
                }
            }
        }
        
        $(jsonObject).each(function(index, value){
                if(prob[idx] == value.letter) {
                    value.amount--;
                }
        });
        return prob[idx];
    }
}

// Display correct pieces image onto webpage
function upload(jsonObject) {;
    for(var i = 0; i < piece.length; i++) {
        var id = ".t" + Number(i+1);
        var img_path = "graphics_data/Scrabble_Tiles/Scrabble_Tile_" + piece[i] + ".jpg";
        $(id).attr("src", img_path);
    }
    
    for(var i =0; i < piece.length; i++) {
        if(piece[i] == "Blank") {
            letterPiece[i].value = 0;
        }
        else {
            var index = jsonObject.findIndex(item => item.letter === piece[i]);
            if(index != -1) {
                letterPiece[i].value = jsonObject[index].value;
            }
        }
    }
    var numPiece = 0;
    $(jsonObject).each(function(index, value){
        numPiece += value.amount;
    });
    if(numPiece == 0) {
        for(var i = 0; i < piece.length; i++) {
            if(letterPiece[i].occupy != -1) {
                boardGrid[letterPiece[i].occupy].isEmpty = true;
                boardGrid[letterPiece[i].occupy].slot = -1;
                boardGrid[letterPiece[i].occupy].name = "none"
                letterPiece[i].occupy = -1;
                var id = ".t" + Number(i+1);
                $(id).css("visibility", "hidden");
            }
        }
    }   

} 

