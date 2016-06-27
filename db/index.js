/*
 * database.js
 */

module.exports = function (type, settings) {
    console.log('Specified motor database : ' + type);
    var db = null;

    /*
     * Database to instantiate
     */
    var dbClass = require('./mongodb');
    db = new dbClass(settings);
      

    /*
     * Initialize the database object
     */
    db.connect(function (err) {
        if (err) {
            console.log('Error: could not connect to the database.');
        }
    });

    return db;
}