var PouchDB = require("pouchdb");
var db = new PouchDB("http://localhost:4000/choices");
const read = require("read-file");
const log = require("ololog");
const uuid = require("uuid");

let currentSet = [];

const load = () => {
  return db.allDocs({ include_docs: true }).then(docs => {
    currentSet = docs.rows.map(row => row.doc.choice);
    log(currentSet, currentSet.length);
  });
};

const choices = read.sync("./seed/list.txt");

load().then(() => {
  let inc = currentSet.length;
  choices
    .toString()
    .split("\n")
    .map(choice => {
      choice = choice.trim();
      if (choice && !currentSet.includes(choice)) {
        inc++;
        try {
          let _id = uuid();
          console.log({ _id, choice });
          log("inserted ", _id, choice);
          return db.put({ _id: _id.toString(), choice }).catch(e => {
            log(e);
            process.exit(1);
          });
        } catch (e) {
          log(e);
          process.exit(1);
        }
      }
    });

  console.log("Inserted " + (inc - currentSet.length) + " choices.");
});
