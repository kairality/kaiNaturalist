import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { genTaxa } from './store/taxonomy';

import { MapContainer, TileLayer, Marker, Popup } from '@monsonjeremy/react-leaflet'
// import "leaflet/dist/leaflet.css";

import ObservationUpload from './components/ObservationUploadComponent/ObservationUpload';
import NaturalistHome from './components/NaturalistHome/NaturalistHome';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const taxa = useSelector((state) => state.taxonomy)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (loaded) {
      dispatch(genTaxa());
    }
  }, [dispatch, loaded])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
          <NaturalistHome />
          <ObservationUpload />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
