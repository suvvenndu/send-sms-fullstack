import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  //const { getAccessTokenSilently } = useAuth0();
  

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();
  
  const [token, setToken] = useState("");
  
  useEffect(() => {
    (async () => {
      try {
        //console.log(process.env);
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          issuer: process.env.REACT_APP_AUTH0_ISSUER         
        });
        // const response = await fetch('https://api.example.com/posts', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
       // setPosts(await response.json());
       setToken(token);
       console.log(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  
  
  if (isAuthenticated) {
    return (
      <div>
        Hi There {user?.name}{' '}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
        <br/>
        <br/>
        <img src={user?.picture} />
        <br/>
        <br/>
        <label>{user?.email}</label>
        <br/>
        <label>{token}</label>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default App;
