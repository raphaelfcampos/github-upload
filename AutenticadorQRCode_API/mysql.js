const mysql = require('mysql');

var pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
    debug: false,
   /* charset: "utf8_general_ci",
    multipleStatements: true,
    typeCast: function (field, next) {
        if (field.type == 'VAR_STRING') {
            return field.string();
        }
        return next();
    }*/
});

exports.pool = pool;