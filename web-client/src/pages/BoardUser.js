import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const BoardUser = () => {
  const { userId } = useParams();
  const [ loggedUser, setLoggedUser ] = useState({});
  const [ profileUser, setProfileUser ] = useState({});

  useEffect(() => {
    const authData = AuthService.getAuthData();

    if(authData) {
      setLoggedUser(() => authData.user);
    }
    
    UserService.getUser(userId).then(res => {
      console.log(res.data);
      setProfileUser(() => res.data);
    });
  }, [setLoggedUser, setProfileUser, userId]);

  return (
    <>
      {profileUser.id ?
        (profileUser.id === loggedUser.id) ?
        <h1>Bienvenido, {profileUser.fullname}</h1> :
        <h1>{profileUser.fullname}</h1>
        :
        <h4>Cargando...</h4>
      }
    </>
  );
}

export default BoardUser;