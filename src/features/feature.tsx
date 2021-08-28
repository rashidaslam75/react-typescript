import { Container } from '@material-ui/core';
import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import Navbar from '../layout/navbar/Navbar';
import Albums from './users/albums/Album';
import { Dashboard } from './dashboard/Dashboard';
import { Post } from './posts/Post';
import UserPhotos from './users/Photos/Photo';
import Users from './users/Users';

export const Features = () => {
  return (
    <Container fixed maxWidth="xl">
      <Navbar />
      <div className="feat-container" >
        <Container  maxWidth="xl">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={Users} />
            <Route path="/photos/:id" component={UserPhotos} />
            <Route path="/albums/:id" component={Albums} />
            <Route path="/posts" component={Post} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Container>
      </div>
    </Container>
  )
}
