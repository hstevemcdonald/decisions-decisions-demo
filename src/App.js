import React, { Component } from "react";
import log from "ololog";
import PouchDB from "pouchdb";

import Button from "./components/button";
import Choice from "./components/choice";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      choices: [],
      choice: 0,
      choosing: false
    };
  }

  componentDidMount() {
    let _this = this;
    try {
      const db = new PouchDB("http://localhost:4000/choices");
      db.allDocs({ include_docs: true }).then(docs => {
        this.setState(() => ({
          choices: docs.rows.map(row => row.doc.choice)
        }));
      });
    } catch (e) {
      log.bright.red(e);
      process.exit(0);
    }
  }

  render() {
    return (
      <div>
        {this.state.choice && (
          <div className="App">
            <Choice choice={this.state.choices[this.state.choice]} />
            <br />
          </div>
        )}
        {!this.state.choosing && <Button handlePick={this.handlePick} />}
      </div>
    );
  }

  handlePick() {
    let _this = this;
    let timeout = null;
    let increment = 1.0000000000001;
    this.setState(() => ({ choosing: true }));
    function spin(time = 0) {
      if (time < 200) {
        increment **= 1.25;
        timeout = setTimeout(() => {
          _this.setState(() => ({
            choice: Math.floor(Math.random() * _this.state.choices.length)
          }));
          time += increment;
          console.log(time);
          spin(time);
        }, time);
        return;
      }
      _this.setState(() => ({ choosing: false }));
      clearTimeout(timeout);
    }
    spin();
  }
}

export default App;
