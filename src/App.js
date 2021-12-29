import React, {useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //if this part is not write inside useEffect, it will cause a loop, every time that state is changed!!
  // const storedLoginInformation = localStorage.getItem('isLoggedIn');
  // if (storedLoginInformation.value==='LoggedIn'){
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
    const storedLoginInformation = localStorage.getItem('isLoggedIn');
    if (storedLoginInformation === 'LoggedIn') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'LoggedIn');
    //it will store the data in the browser storage, it could be cookies or local storage
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </React.Fragment>
  );
}

export default App;
