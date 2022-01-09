import React, {useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    <AuthContext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogout:logoutHandler}}>
      <MainHeader onLogout={logoutHandler}/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </AuthContext.Provider>

  );
}

export default App;
