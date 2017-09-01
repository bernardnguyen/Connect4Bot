function createTree(boardRep, crumb, layers, botTurn) {
    var tree = {
        'root': copy(boardRep),
        'crumb': crumb,
        'score': -5,
        'children': [],
    }

    if (layers > 0) {
        for (var col = 0; col < 7; col++) {
            if (legal(tree.root, col) && gameNotOver(tree.root)) {
                var child = newBoard(boardRep, col, botTurn);
                tree.children.push(createTree(child, col, layers - 1, !botTurn));
            }
        }
    }
    botTurn = !botTurn;
    return tree;

}

function print(board) {
    var output = '';
    for (j = 0; j < 6; j++) {
        for (i = 0; i < 7; i++) {
            output += board[i][j];
        }
        output += '\n';
    }
    console.log(output);
}

function legal(boardRep, i) {
    if (boardRep[i][0] == ' ') {
        return true;
    } return false;
}

function gameNotOver(board){
    //CHECK HORIZONTAL
    for (i=0; i<4; i++){
        for(j=0; j<6; j++){
            var winner = board[i][j];
            if(winner!= ' ' && board[i+1][j]==winner && board[i+2][j]==winner && board[i+3][j]==winner){
                return false;
            }
        }
    }
    //CHECK VERTICAL
    for(i=0; i<7; i++){
        for(j=0; j<3; j++){
            var winner = board[i][j];
            if(winner!=' ' && board[i][j+1]==winner && board[i][j+2]==winner && board[i][j+3]==winner){
                return false;
            }
        }
    }
    //CHECK DIAGONAL DOWN
    for(i=0; i<4; i++){
        for(j=0; j<3; j++){
            var winner = board[i][j];
            if(winner!= ' ' && board[i+1][j+1]==winner && board[i+2][j+2]==winner && board[i+3][j+3]==winner){
                return false;
            }
        }
    }
    //CHECK DIAGONAL UP
    for(i=0; i<4; i++){
        for(j=3; j<6; j++){
            var winner = board[i][j];
            if(winner!= ' ' && board[i+1][j-1]==winner && board[i+2][j-2]==winner && board[i+3][j-3]==winner){
                return false;
            }
        }
    }
    return true;
}

function newBoard(boardRep, i, botTurn) {
    var output = copy(boardRep);
    for (j = 5; j > -1; j--) {
        if (output[i][j] == ' ') {
            output[i][j] = (botTurn) ? 'O' : 'X';
            break;
        }
    }
    return output;
}

function copy(boardRep){
    var output = empty([7,6]);

    for(i=0; i<7; i++){
        for(j=0; j<6; j++){
            output[i][j] = boardRep[i][j];
        }
    }

    return output;
}

function empty(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? ' ' : empty(dimensions.slice(1)));
    }

    return array;
}