var minimax = {
    'name': 'Minimax',
    'next': function (boardRep) {
        var depth = 1;
        var gameTree = createTree(boardRep, -1, depth, true);

        gameTree.score = MINIMAX(gameTree, depth, true);

        var bestCol = -1;
        var maxScore = -1000;
        console.log("SCORES");
        for (var k = 0; k < gameTree.children.length; k++) {
            var score = gameTree.children[k].score;
            console.log(k + " " + score);
            if (score > maxScore) {
                maxScore = score;
                bestCol = gameTree.children[k].crumb;
            }
        }
        return (bestCol == -1) ? 1 + Math.floor(Math.random() * 5) : bestCol;
    }
}

function MINIMAX(node, depth, isMaximizingPlayer) {
    if (node.children.length == 0 || depth == 0) {
        return evaluate(node.root);
    }

    if (isMaximizingPlayer) {
        var bestVal = -Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var value = MINIMAX(node.children[i], depth - 1, false);
            bestVal = Math.max(value, bestVal);
            node.children[i].score = bestVal;
        }
        return bestVal;
    } else {
        bestVal = Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var value = MINIMAX(node.children[i], depth - 1, true);
            bestVal = Math.min(value, bestVal);
            node.children[i].score = bestVal;
        }
        return bestVal;
    }
}

function evaluate(board) {
    print(board);

    var output = 0;
    
    output += checkHorizontalLinks(board);
    output += checkVerticalLinks(board);
    output += checkDDLinks(board);
    output += checkDULinks(board);

    console.log("SCORE: " + output);
    return output;
}

function checkHorizontalLinks(board){
    var output = 0;
    var runningCount = 1;
    var score = 1;
    var currentChar = ' ';

    for(var j=0; j<6; j++){
        for(var i=1; i<7; i++){
            if (board[i][j] != ' '){    
                curentChar = board[i][j];
                if(board[i][j]==board[i-1][j]){
                    runningCount+=1;
                    score *= 5;

                    if (i+1<7){
                        if(board[i+1][j]!=currentChar){
                            output+= (currentChar == 'X') ? -score : score;
                            runningCount = 1;
                            score = 1;
                        }
                    }
                }
            } else{
                runningCount = 1;
                score = 1;
            }
        }
    }
    console.log("HORIZONTAL SCORE: " + output);
    return output;
}

function checkVerticalLinks(board){
    var output = 0;
    var runningCount = 1;
    var score = 1;
    var currentChar = ' ';

    for(var i=0; i<7; i++){
        for(var j=1; j<6; j++){
            if (board[i][j] != ' '){    
                curentChar = board[i][j];
                if(board[i][j]==board[i][j-1]){
                    runningCount+=1;
                    score *= 5;
                    if (j+1<6){
                        if(board[i][j+1]!=currentChar){
                            output+= (currentChar == 'X') ? -score : score;
                            runningCount = 1;
                            score = 1;
                        }
                    }
                } 
            } else{
                runningCount = 1;
                score = 1;
            }
        }
        score = 1;
    }
    console.log("VERTICAL SCORE: " + output);
    return output;
}

function checkDDLinks(board){
    var output = 0;
    var runningCount = 1;
    var score = 1;
    var currentChar = ' ';

    for(var i=1; i<7; i++){
        for(var j=1; j<6; j++){
            if (board[i][j] != ' '){    
                curentChar = board[i][j];
                if(board[i][j]==board[i-1][j-1]){
                    runningCount+=1;
                    score *= 5;
                    if (i+1<7 && j+1<6){
                        if(board[i+1][j+1]!=currentChar){
                            output+= (currentChar == 'X') ? -score : score;
                            runningCount = 1;
                            score = 1;
                        }
                    }
                } 
            } else{
                runningCount = 1;
                score = 1;
            }
        }
    }
    console.log("DD SCORE: " + output);
    return output;
}

function checkDULinks(board){
    var output = 0;
    var runningCount = 1;
    var score = 1;
    var currentChar = ' ';

    for(var i=1; i<7; i++){
        for(var j=4; j>-1; j--){
            if (board[i][j] != ' '){    
                curentChar = board[i][j];
                if(board[i][j]==board[i-1][j+1]){
                    runningCount+=1;
                    score *= 5;
                    if (i+1<7 && j-1>-1){
                        if(board[i+1][j-1]!=currentChar){
                            output+= (currentChar == 'X') ? -score : score;
                            runningCount = 1;
                            score = 1;
                        }
                    }
                }
            } else{
                runningCount = 1;
                score = 1;
            }
        }
    }
    console.log("DU SCORE: " + output);
    return output;
}