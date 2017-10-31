var copycat = {
    'name': 'Copycat',
    'next': function(boardRep, humanMove) {
        return move(boardRep, humanMove);
    }
}

function move(boardRep, humanMove){
    if(boardRep[humanMove][0] == ' ') {
        console.log("LEGAL MOVE: " + humanMove);
        return humanMove;
    } else {
        var eligibleMoves = [];
        for (var i=0; i<7; i++){
            if (boardRep[i][0] == ' ') eligibleMoves.push(i);
        }
        return eligibleMoves[Math.floor(Math.random()*eligibleMoves.length)];
    }
}