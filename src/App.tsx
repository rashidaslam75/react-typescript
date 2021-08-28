import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Auth } from './auth';
import { Features } from './features';
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAppSelector } from './store/hooks';
import { LoadingSpinner } from './shared/components/Loader';


function App() {
  const isLoading = useAppSelector(state => state.app.loading);
  return (
    <Router>
      {isLoading && (
        <LoadingSpinner />
      )}

      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Features} />
      </Switch>
    </Router>
  );
}

export default App;
