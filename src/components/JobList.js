import React, { Component } from 'react';
import {jobs} from "./temp";

const initialState = {
    jobs: jobs
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return(
      <div className="topSpace">
        <br/>
        {
          (this.state.jobs).map((id, i) => {
            return(
              <p>{(this.state.jobs)[i].title}</p>
            )
          })
        }
      </div>
    );
  }
}

export default App;
