var defaultBoard = new Array(7).fill(new Array(6).fill(' '));

var copycat = {
    'botBoard' : defaultBoard,
    'resetBoard': function() {
        this.botBoard = defaultBoard;
    },
    'name': 'Copycat',
    'next': function(boardRep) {
        var botMove = oppMove(boardRep, this.botBoard);
        this.botBoard = updateBotBoard(boardRep, botMove);
        return botMove;
    }
}

function oppMove(current, previous){
    for(var j=0; j<6; j++){
        for(var i=0; i<7; i++){
            if(current[i][j] != previous[i][j])
                if(j != 0) return i;
                else {
                    var eligibleMoves = [];
                    for(var i=0; i<7; i++){
                        if(current[i][0] == ' ') eligibleMoves.push(i);
                    }
                    return (eligibleMoves[Math.floor(Math.random()*eligibleMoves.length)]);
                }
        }
    }
}

function updateBoard(boardRep, botMove){
    var board = boardRep;
    for(var i=5; i>=0; i--){
        if(board[botMove][i] == ' '){
            board[botMove][i] = 'O';
            break;
        }
    }
    return board;
}