import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Pagination from '../components/Pagination';
import RecipeCard from '../components/RecipeCard';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import DefaultProfileImage from '../images/profile.png';

const BoardUser = (props) => {
  const { userId } = useParams();
  const [loggedUser, setLoggedUser] = useState({});
  const [profileUser, setProfileUser] = useState({});
  const [recipes, setRecipes] = useState({ content: [] });
  const [loading, setLoading] = useState(true);

  const changePage = (page) => {
    UserService.getUserRecipes(userId, page).then(res => {
      setRecipes(res.data);
    });
  }

  useEffect(() => {
    const authData = AuthService.getAuthData();

    if (authData) {
      setLoggedUser(() => authData.user);
    }

    // load user profile
    UserService.getUser(userId).then(res => {
      setProfileUser(res.data);

      // load user recipes
      UserService.getUserRecipes(userId).then(res => {
        setRecipes(res.data);
        setLoading(false);
      });
    }, error => {
      console.log(error);
      setLoading(false);
      props.history.push('/'); // show 404 page ...
    });
  }, [setLoggedUser, setProfileUser, userId, props.history]);

  return (
    <>
      {!loading &&
        <div className="row">
          <div className="col-md-3 pe-3 text-center">
            <img src={profileUser.profileImage ? profileUser.profileImage : DefaultProfileImage} alt="mdo" width="140" height="140" className="bd-placeholder-img rounded-circle mb-3" />
            <h2>{profileUser.fullname}</h2>
            <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
            {loggedUser.id === profileUser.id &&
              <p><button className="btn btn-secondary">Editar</button></p>}
          </div>
          <div className="col-md-9">
            {recipes.content.length > 0 ?
              <>
                {recipes.content.map(recipe => {
                  return <RecipeCard recipe={recipe} />
                })}
                {recipes.totalPages > 1 &&
                  <Pagination
                    totalPages={recipes.totalPages}
                    currentPage={recipes.number}
                    changePage={changePage}
                  />
                }
              </> :
              <p>No hay recetas</p>
            }
          </div>
        </div>
        /*:
        <h4>Cargando...</h4>*/
      }
    </>
  );
}

export default BoardUser;