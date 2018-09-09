var PouchDB = require('pouchdb');
var db = new PouchDB('http://localhost:4000/choices');
const read = require('read-file');
const log = require('ololog');

const choices = read.sync("./seed/list.txt");

let inc=0;
choices.toString().split("\n").map(choice => {
    if (choice.trim()) {
        inc++;
        try {
            db.put({"_id": inc.toString(), choice: choice.trim()})
        } catch (e) {
            log(e)
            process.exit(0)
        }
        
    }
})

console.log("Inserted " + inc + "choices.")