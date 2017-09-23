import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Doodles from './pages/Doodles';
import ResumeContainer from './pages/Resume';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={ResumeContainer}/>
            <Route exact path='/resume' component={ResumeContainer}/>
            <Route exact path='/projects' component={Doodles}/>
            <Route exact path='/doodles' component={Doodles}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
