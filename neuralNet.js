var neuralNet = {
    'name': 'Dummy',
    'next': function (boardRep) {
        return 3;
    }
}

var inputs = [];
var hiddenLayer = [];

function processInputs(board){
    inputs = [];
    for (var i=0; i<7; i++){
        for (var j=0; j<6; j++){
            var intVal;
            if(board[i][j] == ' '){
                intVal = 0;
            } else if (board[i][j] == 'X'){
                intVal = -1;
            } else intVal = 1;
            inputs.push(intVal);
        }
    }
}

function createHiddenLayer(N){
    
}