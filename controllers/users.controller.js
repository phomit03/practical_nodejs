const db = require("../models");
const User = db.users;
const mysql = require('mysql');


// home
exports.views = (req, res) => {
    res.render('index');
}

//get all user
exports.getAllUser = (req, res) => {
    const UserName = req.query.UserName;
    var checkUserName = UserName ? { UserName: { [Op.like]: `%${UserName}%` } } : null;

    try {
        User.findAll({ where: checkUserName })  //check username khong bi trung lap
            .then(data => {
                console.log(data);
                res.render('list', {users: data || []});
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
    res.render('add-user', {error: ''});
}

// Add new user
exports.addUser = (req, res) => {
    if (!req.body.Mobile) {
        res.render('create', {error: "Error!"})
        return;
    }
    const user = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Mobile: req.body.Mobile,
        UserName: req.body.UserName,
        Password: req.body.Password,

    };
    User.create(user)
        .then(data => {
            res.render('index')
        })
        .catch(err => {
            res.render('create', {error: err.message || "Error"})
        });
}