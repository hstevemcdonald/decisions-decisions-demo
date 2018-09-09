import React, { Component } from 'react';
import log from 'ololog';
import PouchDB  from 'pouchdb';

import Button from './components/button';
import Choice from './components/choice';

class App extends Component {
  constructor(props) {
    super(props)
    this.handlePick = this.handlePick.bind(this);
    this.db = null;
    this.state = {
      choices:[],
      choice: 0
    }
  }

  componentDidMount() {
    let _this = this;
    try {
      this.db = new PouchDB('http://localhost:4000/choices');
    } catch (e) {
      log.bright.red(e)
    }
    
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.choice && <div className="App">
          <Choice choice={this.state.choices[this.state.choice]} />
          <br/>
          </div>}
          <Button handlePick={this.handlePick} />  
      </div>
    )
  }

  async handlePick() {
    let _this = this;
    let docSet = await  this.db.allDocs({include_docs: true})
    _this.setState(() => ({choices:docSet.rows.map(row => row.doc.choice)}))

    let increment = .011
    function spin(time = 0) {
      if (time<2) {
          increment**=2
          setTimeout(() => {
            _this.setState(() => ({choice: Math.floor(Math.random()*docSet.rows.length)}))
            time+=increment;
            spin(time);
          }, increment)
      }
    }
    spin()
  }
}

export default App;
