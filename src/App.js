import React, { Component } from 'react';
import Test1 from './components/Test1';
import Test3 from './components/Test3';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.contentList = [{
      title: 'TEST 1',
      component: <Test1 />
    }, {
      title: 'TEST 3',
      component: <Test3 />
    }]

    this.state = {
      currentNav: 0
    }
  }

  onChangeNav = index => event => {
    event.preventDefault();
    this.setState({
      currentNav: index
    })
  }

  renderContent = () => {
    return (
      <>
        <nav className="nav nav-pills nav-fill">
          {this.contentList.map((item, index) => (
            <a key={`nav-${index}`} className={`nav-item nav-link ${index === this.state.currentNav ? 'active' : ''}`} href="#" onClick={this.onChangeNav(index)}>{item.title}</a>
          ))}
        </nav>
        <div className="tab-content p-3" id="myTabContent">
          {this.contentList.map((item, index) => (
            <div key={`tab-content-${index}`} className={`tab-pane fade ${index === this.state.currentNav ? 'show active' : ''}`} role="tabpanel" aria-labelledby="home-tab">
              {item.component}
            </div>
          ))}
        </div>
      </>
    )
  }

  render() {
    return (
      <div className='container'>
        <h1 className="py-3">FED</h1>
          {this.renderContent()}
        {/* <Test1 /> */}
        {/* <Test3 /> */}
      </div>
    )
  }
}