import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Pagination from '../components/Pagination';
import RecipeCard from '../components/RecipeCard';
import ProfileImageModal from '../components/ProfileImageModal';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import DefaultProfileImage from '../images/profile.png';

const BoardUser = (props) => {
  const { userId } = useParams();
  const [loggedUser, setLoggedUser] = useState({});
  const [profileUser, setProfileUser] = useState({});
  const [recipes, setRecipes] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

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
        <>
          <div className="row">
            <div className="col-md-3 pe-3 text-center">
              <div className="position-relative">
                {loggedUser.id === profileUser.id &&
                  <button onClick={() => setShowProfileImageModal(true)} class="btn btn-sm btn-secondary rounded-circle position-absolute top-0 start-50 translate-middle"><i class="bi bi-camera"></i></button>
                }
                <img src={profileUser.profileImage ? process.env.REACT_APP_API_STORAGE + profileUser.profileImage : DefaultProfileImage} alt="mdo" width="140" height="140" className="bd-placeholder-img rounded-circle mb-3" />
              </div>
              <h2>{profileUser.fullname}</h2>
              <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
              {loggedUser.id === profileUser.id &&
                <p><button className="btn btn-dark">Editar</button></p>}
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
          {showProfileImageModal && <ProfileImageModal show={showProfileImageModal} hide={() => setShowProfileImageModal(false)} />}
        </>
      }
    </>
  );
}

export default BoardUser;