module.exports = app => {
    const users = require("../controllers/users.controller");

    var router = require("express").Router();

    //home
    router.get("/", users.views);

    //get
    router.get("/getUser", users.getAllUser);

    router.get("/addUser", users.formUser);
    router.post("/addUser", users.addUser);

    //app.use('/api/users', router);
}