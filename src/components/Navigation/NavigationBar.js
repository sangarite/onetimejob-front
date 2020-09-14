import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Signin from '../Signin';
import About from '../About';
import Help from '../Help';
import Register from '../Register';
import Entrance from '../Entrance/Entrance.js';
import  './Navigation.css';
import Logo from '../../Logo.png';

export default function NavigationBar()
{
    return(
      <div>
        <div id="navigation">
          <Link to="/signin">כניסה</Link>
          <Link to="/register">הרשמה</Link>
          <Link to="/about">עלינו</Link>
          <Link to="/help">עזרה</Link>
          <Link to="/">בית</Link>
        </div>
        <Switch>
          <Route path="/signin"><Signin/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/help"><Help/></Route>
          <Route path="/"><Entrance/></Route>
        </Switch>
      </div>
    );
}
