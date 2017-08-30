var express = require('express');
var app = express();


/************* DEFINE ROUTES *************/

app.use(express.static(__dirname + '/'));

/************ LISTEN ON PORT **************/

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port ' + port);
});