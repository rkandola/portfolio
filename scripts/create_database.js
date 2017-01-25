/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.portfolio_table + '` ( \
    `user_id` INT UNSIGNED NOT NULL, \
    `symbol` VARCHAR(20) NOT NULL, \
    `shares` INT NOT NULL, \
    `price` DECIMAL NOT NULL, \
     PRIMARY KEY (`user_id`,`symbol`) \
)');

console.log('Success: Database Created!')

connection.end();
