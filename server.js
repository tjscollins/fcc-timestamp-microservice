var express = require('express');
var moment = require('moment');

const PORT = process.env.PORT || 3000;

var app = express()

app.get('/:str', function(req, res) {
  res.send(JSON.stringify(parseInput(req.params.str)));
});

app.listen(PORT, function() {
  console.log('Server is listening on port 3000!')
});

function parseInput(str) {
  var unix = parseInt(str);
  if (isNaN(unix)) {
    var date = new Date(str);
    return moment(date).isValid()
      ? {
        unix: moment(date).unix(),
        natural: moment(date).format('MMMM D, YYYY')
      }
      : {
        unix: null,
        natural: null
      };
  } else {
    return moment
      .unix(unix)
      .isValid()
      ? {
        unix: moment
          .unix(unix)
          .unix(),
        natural: moment
          .unix(unix)
          .format('MMMM Do, YYYY')
      }
      : {
        unix: null,
        natural: null
      };
  }
}
