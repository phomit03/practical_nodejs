const db = require("../models");
const User = db.users;
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// home
exports.views = (req, res) => {
    res.render('index');
}

//get all user
exports.getAllUser = (req, res) => {
    try {
        User.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error Get Users"
                });
            });
    } catch(error) {
        console.log(error);
    }
};

// form
exports.formUser = (req, res) => {
    res.render('add-user');
}

// Add new user
exports.addUser = (req, res) => {
    const { FirstName, LastName, Mobile, UserName, Password } = req.body;

    // User the connection
    connection.query('INSERT INTO user SET FirstName = ?, LastName = ?, Mobile = ?, UserName = ?, Password = ?',
        [FirstName, LastName, Mobile, UserName, Password], (err, rows) => {
        if (!err) {
            res.render('add-user', { alert: 'User added successfully.' });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
}