var randomIdiot = {
    'name': 'RandomIdiot',
    'next': function(boardRep){
        var possibleMoves = [];
        for(i=0; i<7; i++){
            if(boardRep[i][0] == ' '){
                possibleMoves.push(i);
            }
        }

        return possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    }
}