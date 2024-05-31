import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyPage from './pages/MyPage';
import ProfileEditPage from './pages/ProfileEditPage';
import HobbiesPage from './pages/HobbiesPage';
import PersonalityPage from './pages/PersonalityPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MyPage} />
        <Route path="/profile-edit" component={ProfileEditPage} />
        <Route path="/hobbies" component={HobbiesPage} />
        <Route path="/personality" component={PersonalityPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  );
}

export default App;
