// http://jsfiddle.net/djjL16p2/
// https://codingbeautydev.com/blog/javascript-get-mouse-position/#:~:text=To%20get%20the%20current%20position,coordinates%20of%20the%20mouse%20respectively.

// $.ajax({
//     url: "pieces.json",
//     dataType: "json",
//     type: "get",
//     cache: false,
//     success:function(data){
//       // $(data.pieces).each(function(index, value){
//       //   console.log(value.letter);
//       // });
//       // var jObject = JSON.parse(data);
//       // console.log(jObject);
//       // console.log(data);
//       // data.pieces[0].letter = "BYe";
//     //   console.log(data.pieces[0].letter);
    
    
//         for(var i = 0; i < 10; i++){
//             var letter = getLetter(data);
//             // console.log(letter);
//             $(data.pieces).each(function(index, value){
//                 if(letter == value.letter) {
//                     value.amount--;
//                     // console.log(value.amount);
//                 }
//             });
//         }
//     }
// });

// $.getJSON("pieces.json", function(data) {
//     for(var i = 0; i < 10; i++){
//                     var letter = getLetter(data);
//                     console.log(letter);
//                     $(data.pieces).each(function(index, value){
//                         if(letter == value.letter) {
//                             value.amount--;
//                             console.log(value.amount);
//                         }
//                     });
//                 }
// });

// function getLetter(jsonObject){
//     var prob = [];
//     $(jsonObject.pieces).each(function(index, value){
//         for(var i = 0; i < value.amount;i++) {
//             prob.push(value.letter);
//         }
//     })
//     // prob.push(jsonObject.pieces[0].amount / 100);
//     var idx = Math.floor(Math.random() * prob.length);
//     return prob[idx];
//     // console.log(jsonObject.pieces[0].letter);
// }

let boardGrid=[];
let letterPiece=[];
let dataObject;
let piece = [];
var object = new Object();
var temp;

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

// function submit(dataObject){
//     for(var i = 0; i < 7; i++){
//         letter = getLetter(dataObject);
//         $(dataObject).each(function(index, value){
//             if(letter == value.letter) {
//                 value.amount--;
//             }
//         });
//     }
//     upload(dataObject);
// }




// window.onload = function(){
$(function(){
    var point = 0;
    createGrid();

    $.getJSON("pieces.json", function(data) {
        dataObject = JSON.parse(JSON.stringify(data.pieces));
        // submit(dataObject);
        for(var i = 0; i < 7; i++){
            letter = getLetter(dataObject);
        //     $(dataObject).each(function(index, value){
        //         if(letter == value.letter) {
        //             value.amount--;
        //         }
            // });
        }
        upload(dataObject);
        // for(var i = 0; i < letterPiece.length; i++) {
        //     console.log(letterPiece[i].value);
        // }
        console.log(point);
    });

    var piece1 = $(".t1");
    var piece2 = $(".t2");
    var piece3 = $(".t3");
    var piece4 = $(".t4");
    var piece5 = $(".t5");
    var piece6 = $(".t6");
    var piece7 = $(".t7");
    var moving = false;
    var x = $(".t1").offsetLeft;
    var y = $(".t1").offset().top;;
    piece1[0].addEventListener("mousedown", initialClick);
    piece2[0].addEventListener("mousedown", initialClick)
    piece3[0].addEventListener("mousedown", initialClick)
    piece4[0].addEventListener("mousedown", initialClick)
    piece5[0].addEventListener("mousedown", initialClick);
    piece6[0].addEventListener("mousedown", initialClick)
    piece7[0].addEventListener("mousedown", initialClick)


//get cursor position
// const mousePosText = document.getElementById('mouse-pos');
// let mousePos = { x: undefined, y: undefined };

// window.addEventListener('mousemove', (event) => {
//   mousePos = { x: event.clientX, y: event.clientY };
//   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
// });

// window.addEventListener('mousedown', (event) => {
//     mousePos = { x: event.clientX, y: event.clientY };
//     mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
// });


function checkPosition(piecePosX, piecePosY, pieceId, boardPos ) {
    var status = false;
    var currentPiece = 0;
    var t;
    for(var i = 0; i < letterPiece.length; i++) {
        if(boardPos == letterPiece[i].pos) {
            currentPiece = i;
        }
    }
    // console.log(letterPiece[currentPiece].name);
    if (piecePosY > 68 && piecePosY < 118){
        for(var i = 0; i <= 14; i++) {
            // if (letterPiece[currentPiece].name == boardGrid[i].name){
            //     console.log("occupy: " + i);
            //     status = true;
            //     boardGrid[i].isEmpty = false;
            //     boardGrid[i].slot = i;
            //     boardGrid[i].name = pieceId.attr("class");
            //     t = letterPiece[currentPiece].occupy;
            //     if(t != -1) {
            //         console.log("change to" + t);
            //         boardGrid[t].isEmpty = true;
            //         // boardGrid[t].name = "none" 
            //         // letterPiece[currentPiece].occupy = i;
            //     }
            //     letterPiece[currentPiece].occupy = i;
            //     break;
            // }
            // console.log(letterPiece[currentPiece].name);
            if(piecePosX > boardGrid[i].leftPosition && piecePosX < boardGrid[i].rightPosition && boardGrid[i].isEmpty == true){
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
                console.log("bitch: " + i);
            }
            if (letterPiece[currentPiece].name == boardGrid[i].name && piecePosX > boardGrid[i].leftPosition && piecePosX < boardGrid[i].rightPosition){
                console.log("how?");
                status = true;
                return status
            }
            else{
                continue;
            }

        }
    }
    else{
    for(var i =0; i <= 14; i++) {
        if ( boardGrid[i].slot == i) {
            letterPiece[currentPiece].occupy = -1;
            boardGrid[i].name = "none" 
            boardGrid[i].isEmpty = true;
        }
    } 
    }
    return status;
}

function initialClick() {
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
        //   console.log("lol");
        }
        moving = false;
        $(this).css("z-index", "auto");
        calcPoint();
        return;
    }
    
    // moving = !moving;
    moving = true;
    document.addEventListener("mousemove", move);
}

function move(e){
    var newX = e.clientX - 10;
    var newY = e.clientY - 10;
    image.style.left = newX + "px";
    image.style.top = newY + "px";
}

function calcPoint() {
    var point = 0;
    var doublePoint = false;
    for (var i =0; i < letterPiece.length; i++) {
        if (letterPiece[i].occupy != -1) {
            if (letterPiece[i].occupy == 2 || letterPiece[i].occupy == 12) {
                // console.log("Please: " + letterPiece[i].value);
                doublePoint = true
                point += letterPiece[i].value;
            }
            else if (letterPiece[i].occupy == 6 || letterPiece[i].occupy == 8) {
                var tempPoint = letterPiece[i].value * 2;
                point += tempPoint;
                // console.log("Please: " + letterPiece[i].value);
            }
            else {
                point += letterPiece[i].value;
                // console.log("Please: " + letterPiece[i].value);
            }
        }
    }
    // console.log(point);
    if(doublePoint == true) {
        point *= 2;
    }
    // console.log("Point: " + point);
    $(".point").text("Point: " + point);
    return point;
}

function getLetter(jsonObject){
    var prob = [];
    // console.log("hi " + jsonObject);
    $(jsonObject).each(function(index, value){
        for(var i = 0; i < value.amount;i++) {
            prob.push(value.letter);
        }
    })
    // prob.push(jsonObject.pieces[0].amount / 100);
    var idx = Math.floor(Math.random() * prob.length);
    if(prob[idx] == "_") {
        piece.push("Blank");
    }
    else{
        piece.push(prob[idx]);
    }
    
    $(jsonObject).each(function(index, value){
        if(prob[idx] == value.letter) {
            value.amount--;
        }
    });
   
    return prob[idx];
}

function upload(jsonObject) {
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
            // console.log(jsonObject[index].value);
            letterPiece[i].value = jsonObject[index].value;

            console.log(letterPiece[i].value);
        }
    }
} 


});
