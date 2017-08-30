var turn = 'YOU';
var gameOver = false;
var winner;

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
    opponent.innerText = 'Current Opponent: Dummy';
    opponent.className = 'nav-button';
    navbar.append(opponent);

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

    for (i = 1; i < 8; i++) {
        var floatPiece = document.createElement('div');
        floatPiece.className = 'floatPiece';
        floatPiece.id = 'floatPiece' + i;
        overBoard.append(floatPiece);
    }

    var board = document.createElement('div');
    board.id = 'board';
    game.append(board);

    for (i = 1; i < 8; i++) {
        var column = document.createElement('div');
        column.className = 'column';
        column.id = 'column' + i;
        addEvents(column, i);
        board.append(column);
        for (j = 1; j < 7; j++) {
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
        floatPiece.className = 'floatPiece showFloat ' + turn;
    });

    column.addEventListener('mouseleave', function () {
        floatPiece.className = 'floatPiece';
    });

    column.addEventListener('click', function () {
        progressGame(i);
        floatPiece.className = 'floatPiece showFloat ' + turn;
    });
}

function progressGame(i) {
    if (!gameOver) {
        addPiece(i);
        checkGameOver();
    }
}

function addPiece(i) {
    for (j = 6; j > 0; j--) {
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
    for (i = 1; i < 8; i++) {
        for (j = 1; j < 7; j++) {
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
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 7; j++) {
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
    for (i = 1; i < 8; i++) {
        for (j = 1; j < 4; j++) {
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
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 4; j++) {
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
    for (i = 1; i < 5; i++) {
        for (j = 4; j < 7; j++) {
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