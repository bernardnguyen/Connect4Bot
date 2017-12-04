var minimax = {
    'name': 'Minimax',
    'next': function (boardRep, recentMove) {
        var depth = 5;
        var gameTree = createTree(boardRep, -1, depth, true);

        gameTree.score = alphaBeta(gameTree, depth, -Infinity, Infinity, true);

        var bestCol = -1;
        var maxScore = -1000;
        for (var k = 0; k < gameTree.children.length; k++) {
            var score = gameTree.children[k].score;
            if (score > maxScore) {
                maxScore = score;
                bestCol = gameTree.children[k].crumb;
            }
        }
        return (bestCol == -1) ? 1 + Math.floor(Math.random() * 5) : bestCol;
    }
}

function alphaBeta(node, depth, alpha, beta, isMaximizingPlayer) {
    if (node.children.length == 0 || depth == 0) {
        return evaluate(node.root);
    }

    if (isMaximizingPlayer) {
        var bestVal = -Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var value = alphaBeta(node.children[i], depth - 1, alpha, beta, false);
            bestVal = Math.max(Math.floor(0.7*value), bestVal);
            alpha = Math.max(alpha, bestVal);
            node.children[i].score = value;

            if(beta<=alpha){
                break;
            }
        }
        return bestVal;
    } else {
        bestVal = Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var value = alphaBeta(node.children[i], depth - 1, alpha, beta, true);
            bestVal = Math.min(Math.floor(1.3*value), bestVal);
            beta = Math.min(beta, bestVal);
            node.children[i].score = value;

            if(beta<=alpha){
                break;
            }
        }
        return bestVal;
    }
}

function evaluate(board) {
    var score = 0;
    score += gaussian(board);
    score += checkFor3(board, 3);
    score += checkFor4(board, 7);
    return score;
}

var evaluationBoard = [
    [1,2,3,5,9,10],
    [2,3,6,10,14,17],
    [5,10,12,15,18,20],
    [8,13,18,20,23,25],
    [5,10,12,15,18,20],
    [2,3,6,10,14,17],
    [1,2,3,5,9,10]
];

function gaussian(board){
    var sum = 0;
    for(var i=0; i<7; i++){
        for(var j=0; j<6; j++){
            if(board[i][j] == 'O'){
                sum+= evaluationBoard[i][j];
            } else if(board[i][j] == 'X'){
                sum-= evaluationBoard[i][j];
            }
        }
    }

    return sum;
}

function checkFor3(board, weight){
    var output = 0;

    //CHECK HORIZONTAL
    for(var j=0; j<6; j++){
        for(var i=0; i<5; i++){
            if(board[i][j]!=' '){
                if(board[i+1][j]==board[i][j] && board[i+2][j]==board[i][j]){
                    var score = Math.pow(weight, 3);
                    output += (board[i][j] == 'X') ? -score : score;
                    i+=3;
                }
            }
        }
    }
    //CHECK VERTICAL
    for(var i=0; i<7; i++){
        for(var j=0; j<4; j++){
            if(board[i][j]!=' '){
                if(board[i][j+1]==board[i][j] && board[i][j+2]==board[i][j]){
                    var score = Math.pow(weight, 3);
                    output += (board[i][j] == 'X') ? -score : score;
                    j+=3;
                }
            }
        }
    }
    //CHECK DIAGONAL DOWN
    for(var i=0; i<5; i++){
        for(var j=0; j<4; j++){
            if(board[i][j]!=' '){
                if(board[i+1][j+1]==board[i][j] && board[i+2][j+2]==board[i][j]){
                    var score = Math.pow(weight, 3);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }
    //CHECK DIAGONAL UP
    for(var i=0; i<5; i++){
        for(var j=2; j<6; j++){
            if(board[i][j]!=' '){
                if(board[i+1][j-1]==board[i][j] && board[i+2][j-2]==board[i][j]){
                    var score = Math.pow(weight, 3);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }

    return output;
}

function checkFor4(board, weight){
    var output = 0;

    //CHECK HORIZONTAL
    for(var j=0; j<6; j++){
        for(var i=0; i<4; i++){
            if(board[i][j]!=' '){
                if(board[i+1][j]==board[i][j] && board[i+2][j]==board[i][j] && board[i+3][j]==board[i][j]){
                    var score = Math.pow(weight, 4);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }
    //CHECK VERTICAL
    for(var i=0; i<7; i++){
        for(var j=0; j<3; j++){
            if(board[i][j]!=' '){
                if(board[i][j+1]==board[i][j] && board[i][j+2]==board[i][j] && board[i][j+3]==board[i][j]){
                    var score = Math.pow(weight, 4);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }
    //CHECK DIAGONAL DOWN
    for(var i=0; i<4; i++){
        for(var j=0; j<3; j++){
            if(board[i][j]!=' '){
                if(board[i+1][j+1]==board[i][j] && board[i+2][j+2]==board[i][j] && board[i+3][j+3]==board[i][j]){
                    var score = Math.pow(weight, 4);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }
    //CHECK DIAGONAL UP
    for(var i=0; i<4; i++){
        for(var j=3; j<6; j++){
            if(board[i][j]!=' '){
                if(board[i+1][j-1]==board[i][j] && board[i+2][j-2]==board[i][j] && board[i+3][j-3]==board[i][j]){
                    var score = Math.pow(weight, 4);
                    output += (board[i][j] == 'X') ? -score : score;
                }
            }
        }
    }

    return output;
}