import React, { Component } from 'react';
import { store, load } from './Test1.js';
import debounce from 'lodash.debounce';

const QUESTION_1_TITLE = "Question 1"; 
const STORE_DATA_TITLE = "Handle store data";
const LOAD_DATA_TITLE = "Handle load data";
const DEBOUNCE_DELAY_TIMING = 100;
const DEBOUNCE_OPTIONS = {
  'leading': true,
  'trailing': true
}

export default class Test1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeResult: [],
      loadResult: ''
    }
  }
  
  handleStoreData = event => {
    const storeResult = store(JSON.parse(event.target.value));
    this.setState({ storeResult });
    
  }

  handleLoadData = event => {
    const loadResult = load(event.target.value);
    this.setState({ loadResult });
  }

  renderResult = (result, converter = String) => {
    return (
      <div>
        {!!result ? <span className="w-100 text-success text-preline">{converter(result)}</span> : null}
      </div>
    )
  }

  render() {
    const { storeResult, loadResult } = this.state;
    return (
      <section>
        <h2>{QUESTION_1_TITLE}</h2>
        <div className="form-group p-3">
          <label htmlFor="q1-store">{STORE_DATA_TITLE}</label>
          <input type="text" className="form-control" id="q1-store" onChange={debounce(this.handleStoreData, DEBOUNCE_DELAY_TIMING, DEBOUNCE_OPTIONS)} placeholder='[{"key1":"value1","key2":"value2"},{"keyA":"valueA"}]' />
          {this.renderResult(storeResult)}
        </div>
        <div className="form-group p-3">
          <label htmlFor="q1-load">{LOAD_DATA_TITLE}</label>
          <input type="text" className="form-control" id="q1-load" onChange={debounce(this.handleLoadData, DEBOUNCE_DELAY_TIMING, DEBOUNCE_OPTIONS)} placeholder="key1=value1;key2=value2\nkeyA=valueA" />
          {this.renderResult(loadResult, JSON.stringify)}
        </div>
      </section>
    )
  }
}