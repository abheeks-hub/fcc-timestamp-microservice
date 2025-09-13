// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp API endpoint
// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let {dateString} = req.params;

  let date;

  // If no date is provided → use current time
  if (!dateString) {
    date = new Date();
  } else {
    // Check if input is a number (timestamp)
    if (/^\d+$/.test(dateString)) {
      // Important: FCC expects Unix timestamps in milliseconds, not seconds
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
