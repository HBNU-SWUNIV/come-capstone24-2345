import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/messages'>
            <Messages />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
