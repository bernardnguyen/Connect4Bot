var turn = 'YOU';
var gameOver = false;
var winner;
var bot = randomIdiot;
var boardRep = empty([7,6]);
var delay;

if (typeof document != 'undefined') {

    document.title = ('Connect4Bot');

    var header = document.createElement('div');
    header.id = 'header';
    container.append(header);

    var title = document.createElement('div');
    title.id = 'title';
    title.innerText = 'Connect4Bot';
    header.append(title);

    var navbar = document.createElement('div');
    navbar.id = 'navbar';
    header.append(navbar);

    var reset = document.createElement('button');
    reset.id = 'reset';
    reset.innerText = 'Reset Game';
    reset.className = 'nav-button';
    reset.addEventListener('click', function () {
        clearBoard();
    });
    navbar.append(reset);

    var opponent = document.createElement('button');
    opponent.id = 'opponent';
    opponent.innerText = 'Choose Opponent';
    opponent.className = 'nav-button dropdown';
    navbar.append(opponent);

    var content = document.createElement('div');
    content.className = 'dropdown-content';
    opponent.append(content);

    var randBot = document.createElement('button');
    randBot.className = 'nav-button selected';
    randBot.innerText = 'RandomIdiot';
    randBot.addEventListener('click', function(){
        currentSelection.className = 'nav-button';
        currentSelection = randBot;
        currentSelection.className = 'nav-button selected';
        bot=randomIdiot;
        clearBoard();
    });
    content.append(randBot);
    var currentSelection = randBot;

    var minimaxBot = document.createElement('button');
    minimaxBot.className = 'nav-button';
    minimaxBot.innerText = 'Minimax';
    minimaxBot.addEventListener('click', function(){
        currentSelection.className = 'nav-button';
        currentSelection = minimaxBot;
        currentSelection.className = 'nav-button selected';
        bot=minimax;
        clearBoard();
    });
    content.append(minimaxBot);

    var main = document.createElement('div');
    main.id = 'main';
    container.append(main);



    var game = document.createElement('div');
    game.id = 'game';
    main.append(game);
    
    var announcer = document.createElement('div');
    announcer.id = 'announcer';
    game.append(announcer);

    var overBoard = document.createElement('div');
    overBoard.id = 'overBoard';
    game.append(overBoard);

    for (i = 0; i < 7; i++) {
        var floatPiece = document.createElement('div');
        floatPiece.className = 'floatPiece';
        floatPiece.id = 'floatPiece' + i;
        overBoard.append(floatPiece);
    }

    var board = document.createElement('div');
    board.id = 'board';
    game.append(board);

    for (i = 0; i < 7; i++) {
        var column = document.createElement('div');
        column.className = 'column';
        column.id = 'column' + i;
        addEvents(column, i);
        board.append(column);
        for (j = 0; j < 6; j++) {
            var piece = document.createElement('div');
            piece.className = 'piece empty';
            piece.id = 'piece' + i + j;
            column.append(piece);
        }
    }


}

function addEvents(column, i) {
    var floatPiece = document.getElementById('floatPiece' + i);

    column.addEventListener('mouseover', function () {
        if (turn == 'YOU'){
            floatPiece.className = 'floatPiece showFloat YOU';
        }
    });

    column.addEventListener('mouseleave', function () {
        floatPiece.className = 'floatPiece';
    });

    column.addEventListener('click', function () {
        if (turn == 'YOU'){
            progressGame(i);
            floatPiece.className = 'floatPiece';
        }
    });
}

function progressGame(i) {
    if (!gameOver) {
        addPiece(i);
        updateBoardRep();
        checkGameOver();
    }
    if (!gameOver){
        botMove();
        setTimeout(function(){
            checkGameOver();
        }, delay);
    }
}

function addPiece(i) {
    for (j = 5; j > -1; j--) {
        var piece = document.getElementById('piece' + i + j);
        if (piece.className == 'piece empty') {
            piece.className = 'piece ' + turn;
            switchTurn();
            break;
        }
    }
}

function switchTurn() {
    turn = (turn == 'YOU') ? 'BOT' : 'YOU';
}

function clearBoard() {
    turn = 'YOU';
    gameOver = false;
    announcer.innerText = '';
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            document.getElementById('piece' + i + j).className = 'piece empty';
        }
    }
}

function checkGameOver() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
    if (gameOver) {
        announcer.innerText = (winner == 'YOU') ? 'GAME OVER - YOU WIN!' : 'GAME OVER - THE BOT WINS!';
    }
}

function checkHorizontal() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 6; j++) {
            var name = document.getElementById('piece' + i + j).className;
            if (name != 'piece empty') {
                var name1 = document.getElementById('piece' + (i + 1) + j).className;
                var name2 = document.getElementById('piece' + (i + 2) + j).className;
                var name3 = document.getElementById('piece' + (i + 3) + j).className;
                if (name1 == name && name2 == name && name3 == name) {
                    gameOver = true;
                    winner = name.substr(6);
                    return;
                }
            }
        }
    }
}

function checkVertical() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 3; j++) {
            var name = document.getElementById('piece' + i + j).className;
            if (name != 'piece empty') {
                var name1 = document.getElementById('piece' + i + (j + 1)).className;
                var name2 = document.getElementById('piece' + i + (j + 2)).className;
                var name3 = document.getElementById('piece' + i + (j + 3)).className;
                if (name1 == name && name2 == name && name3 == name) {
                    gameOver = true;
                    winner = name.substr(6);
                    return;
                }
            }
        }
    }
}

function checkDiagonal() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 3; j++) {
            var name = document.getElementById('piece' + i + j).className;
            if (name != 'piece empty') {
                var name1 = document.getElementById('piece' + (i + 1) + (j + 1)).className;
                var name2 = document.getElementById('piece' + (i + 2) + (j + 2)).className;
                var name3 = document.getElementById('piece' + (i + 3) + (j + 3)).className;
                if (name1 == name && name2 == name && name3 == name) {
                    gameOver = true;
                    winner = name.substr(6);
                    return;
                }
            }
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 3; j < 6; j++) {
            var name = document.getElementById('piece' + i + j).className;
            if (name != 'piece empty') {
                var name1 = document.getElementById('piece' + (i + 1) + (j - 1)).className;
                var name2 = document.getElementById('piece' + (i + 2) + (j - 2)).className;
                var name3 = document.getElementById('piece' + (i + 3) + (j - 3)).className;
                if (name1 == name && name2 == name && name3 == name) {
                    gameOver = true;
                    winner = name.substr(6);
                    return;
                }
            }
        }
    }
}

function updateBoardRep(){
    for(i=0; i<7; i++){
        for(j=0; j<6; j++){
            var space = document.getElementById('piece'+i+j);
            if(space.className == 'piece empty'){
                boardRep[i][j] = ' ';
            } else if(space.className == 'piece YOU'){
                boardRep[i][j] = 'X';
            } else boardRep[i][j] = 'O';
        }
    }
}

function botMove(){
    var next = bot.next(boardRep);
    animateBot(next);
}

function animateBot(next){    
    var currentRight = 0;
    var id = setInterval(right, 300);
    
    var currentLeft = 6;
    var id = setTimeout(function() {setInterval(left, 300);}, 1800);

    function right() {
        if (currentRight == 7) {
            clearInterval(id);
        } else {
            if(currentRight != 0){
                document.getElementById('floatPiece' + (currentRight-1)).className = 'floatPiece';
            }

            document.getElementById('floatPiece' + currentRight).className = 'floatPiece showFloat BOT';
            currentRight++;
        }    
    }

    function left() {
        if (currentLeft == next-1) {
            clearInterval(id);
        } else {
            if(currentLeft != 6){
                document.getElementById('floatPiece' + (currentLeft+1)).className = 'floatPiece';
            }

            document.getElementById('floatPiece' + currentLeft).className = 'floatPiece showFloat BOT';
            currentLeft--;
        }    
    }

    time = 300*7 + 300*(7-next);
    delay = time;
    setTimeout(function(){
        document.getElementById('floatPiece'+next).className = 'floatPiece';
        addPiece(next);
    }, time);
}