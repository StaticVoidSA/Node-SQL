const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initial DB connection
let db = new sqlite3.Database('./db/comments.db');

// DB connection function
function dbOpen() {
    db = new sqlite3.Database('./db/comments.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.log("Error with database: " + err);
        }
        else {
            console.log('Opening database connection...');
        }
    });
}

// DB selection function
function dbSelect() {
    db.each(`SELECT name AS name, comment AS comment FROM comments`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.name + "\t" + row.comment);
    });
}


// Middleware
app.use(express.static(__dirname + '/public')); // Set default directory
app.use(bodyParser.urlencoded({extended: false}));

// Route - GET
app.get('/comments', (req, res) => {
    console.log("Getting all feeds...");
    db.all('SELECT * FROM comments', (err, rows) => {
        if (err) {
            console.log('Error: ' + err.message);
        }
        else {
            res.send(rows);
        }
    });
});

// Route - POST
app.post('/comments', (req, res) => {
    dbOpen();
    db.run('INSERT INTO comments VALUES (?, ?)', [req.body.name, req.body.comment], (err) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.status(200).redirect('default.html');
        }
    });
    dbSelect();
    console.log("Record added to database"); 
});

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server: " + err);
    } 
    else {
        console.log(`Listening on PORT: ${port}`);
        // Log table info to console upon server starting
        db.serialize(() => {
            dbSelect();
        });
    }
});


   
 

