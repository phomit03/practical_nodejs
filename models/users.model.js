module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        FirstName: {
            type: Sequelize.STRING,
        },
        LastName: {
            type: Sequelize.STRING,
        },
        Mobile: {
            type: Sequelize.STRING,
        },
        UserName: {
            type: Sequelize.STRING,
        },
        Password: {
            type: Sequelize.STRING,
        },
    });

    return User;
};
