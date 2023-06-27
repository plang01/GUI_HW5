// http://jsfiddle.net/djjL16p2/
// https://codingbeautydev.com/blog/javascript-get-mouse-position/#:~:text=To%20get%20the%20current%20position,coordinates%20of%20the%20mouse%20respectively.

$.ajax({
    url: "pieces.json",
    dataType: "json",
    type: "get",
    cache: false,
    success:function(data){
      // $(data.pieces).each(function(index, value){
      //   console.log(value.letter);
      // });
      // var jObject = JSON.parse(data);
      // console.log(jObject);
      // console.log(data);
      // data.pieces[0].letter = "BYe";
    //   console.log(data.pieces[0].letter);
    
    
        for(var i = 0; i < 10; i++){
            var letter = getLetter(data);
            // console.log(letter);
            $(data.pieces).each(function(index, value){
                if(letter == value.letter) {
                    value.amount--;
                    // console.log(value.amount);
                }
            });
        }
    }
    });

function getLetter(jsonObject){
    var prob = [];
    $(jsonObject.pieces).each(function(index, value){
        for(var i = 0; i < value.amount;i++) {
            prob.push(value.letter);
        }
    })
    // prob.push(jsonObject.pieces[0].amount / 100);
    var idx = Math.floor(Math.random() * prob.length);
    return prob[idx];
    // console.log(jsonObject.pieces[0].letter);
}

let boardGrid=[];
let letterPiece=[];
function createGrid(){
    var grid1 = new Object();
    var leftPos = $(".board").offset().left + 16; 
    var rightPos = leftPos + 88;
    grid1.leftPosition = leftPos;
    grid1.rightPosition = rightPos;
    grid1.isEmpty = true;
    grid1.name = -1;
    boardGrid.push(grid1);
    for(var i=0; i < 14; i++){
        grid1 = new Object();
        leftPos = rightPos + 5;
        rightPos = leftPos + 88;
        grid1.leftPosition = leftPos;
        grid1.rightPosition = rightPos;
        grid1.isEmpty = true;
        grid1.name = -1;
        boardGrid.push(grid1);
    }

    var piece1 = new Object();
    // console.log($(".t1").offset().left);
    piece1.pos = $(".t1").offset().left;
    piece1.occupy = -1;
    
    piece1 = new Object();
    // console.log($(".t2").offset().left);
    piece1.pos = $(".t2").offset().left;
    piece1.occupy = -1;
    letterPiece.push(piece1);

    piece1 = new Object();
    // console.log($(".t2").offset().left);
    piece1.pos = $(".t3").offset().left;
    piece1.occupy = -1;
    letterPiece.push(piece1);

    piece1 = new Object();
    // console.log($(".t2").offset().left);
    piece1.pos = $(".t4").offset().left;
    piece1.occupy = -1;
    letterPiece.push(piece1);
}

window.onload = function(){
    // createGrid();
    var piece1 = $(".t1");
    var piece2 = $(".t2");
    var piece3 = $(".t3");
    var piece4 = $(".t4");
    place(piece1);
    place(piece2);
    place(piece3);
    place(piece4);
    createGrid();
    // var x = $(".t1").offset().left;
    // var y = $(".t1").offset().top;
    // console.log(boardGrid);
    // $(".t1").mousedown(function() {
    //     $(this).data("dragging", true);
        
    // });

    // $(".t1").mouseup(function() {
    //     $(this).data("dragging", false);
    //     var cx = $(".t1").offset().left;
    //     var cy = $(".t1").offset().top;
    //         // if ((cx > boardGrid[14].leftPosition && cx < boardGrid[14].rightPosition) && (cy > 68 && cy < 118) ){
    //         //     $(this).css("left", boardGrid[14].leftPosition + 20);
    //         //     return;
    //         // }
    //         if(checkPosition(cx,cy) == true){
    //             return;
    //         }
    //         else {
    //             $(this).css("left", x);
    //             $(this).css("top", y);
    //             return;
    //         }
    // });

    // $(".t1").mousemove(function(e) {
    //     if (!$(this).data("dragging")){
    //         return;
    //     }

    //     $(this).css("left", e.clientX - $(this).width()/2);
    //     // $(this).css("left",boardGrid[4].leftPosition);
    //     $(this).css("top", e.clientY - $(this).height()/2);
    // });

};


//get cursor position
const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
});

window.addEventListener('mousedown', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
    mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
    // console.log(mousePos);
});

function place(pieceId){
    var x = $(pieceId).offset().left;
    var y = $(pieceId).offset().top;
    // console.log(boardGrid);
    $(pieceId).mousedown(function() {
        $(this).data("dragging", true);
        
    });

    $(pieceId).mouseup(function() {
        $(this).data("dragging", false);
        var cx = $(pieceId).offset().left;
        var cy = $(pieceId).offset().top;
            // if ((cx > boardGrid[14].leftPosition && cx < boardGrid[14].rightPosition) && (cy > 68 && cy < 118) ){
            //     $(this).css("left", boardGrid[14].leftPosition + 20);
            //     return;
            // }
            if(checkPosition(cx,cy,$(this), x) == true){
                return;
            }
            else {
                $(this).css("left", x);
                $(this).css("top", y);
                return;
            }
    });

    $(pieceId).mousemove(function(e) {
        if (!$(this).data("dragging")){
            return;
        }

        $(this).css("left", e.clientX - $(this).width()/2);
        $(this).css("top", e.clientY - $(this).height()/2);
    });
}

function checkPosition(piecePosX, piecePosY, pieceId, boardPos ) {
    var status = false;
    var currentPiece = 0;
    var t;
    for(var i = 0; i < letterPiece.length; i++) {
        if(boardPos == letterPiece[i].pos) {
            currentPiece = i;
            // console.log(currentPiece);
        }
    }

    // console.log(piecePosX);
    // console.log(letterPiece[0].pos);

    if (piecePosY > 68 && piecePosY < 118){
        for(var i = 0; i <= 14; i++) {
            if(piecePosX > boardGrid[i].leftPosition && piecePosX < boardGrid[i].rightPosition && boardGrid[i].isEmpty == true){
                status = true;
                $(pieceId).css("left", boardGrid[i].leftPosition + 20);
                boardGrid[i].isEmpty = false;
                boardGrid[i].name = i;
                t = letterPiece[currentPiece].occupy;
                if(t != -1) {
                    // console.log(t);
                    boardGrid[t].isEmpty = true;
                    // letterPiece[0].occupy = i;
                }
                letterPiece[currentPiece].occupy = i;
                break;
            }
            else{
                continue;
            }

        }
    }
    else{
    for(var i =0; i <= 14; i++) {
        if ( boardGrid[i].name == i) {
            // console.log("!!!!!!!!!!!!!!!!!!!");
            letterPiece[currentPiece].occupy = -1;
            boardGrid[i].isEmpty = true;
        }
    } 
    }

    console.log(letterPiece[currentPiece].occupy);
    return status;
}
