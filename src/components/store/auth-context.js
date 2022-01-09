import React, {useEffect, useState} from 'react';

const AuthContext = React.createContext(
  {
    isLoggedIn: false,
    onLogout: ()=>{},
    onLogin:(email,password)=>{}
  }
);

export const AuthContextProvider = (props)=>{
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
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return(
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin:loginHandler,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
