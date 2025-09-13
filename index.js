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
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  let parsedDate;

  // If no date provided, return current date
  if (!date) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // If it's all digits → treat as Unix timestamp
    // Check for seconds (10 digits) vs milliseconds (13 digits)
    parsedDate = date.length === 10
      ? new Date(Number(date) * 1000)
      : new Date(Number(date));
  } else {
    // Otherwise, parse as date string
    parsedDate = new Date(date);
  }

  // Invalid date handling
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date → return JSON
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
