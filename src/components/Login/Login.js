import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context'
import Input from '../UI/Input/Input'


const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'PASSWORD_INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: null, isValid: false}
}

const Login = () => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

  //object de-structuring to pull out certain properties of object
  //we only want to call useEffect when the isValid is changed, not every time when the emailState value is changed
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
      const identifier = setTimeout(() => {
        console.log('hello')
        setFormIsValid(emailState.isValid && passwordState.isValid)
      }, 500);
      return () => {
        console.log('cleanup')
        clearTimeout(identifier);         // we clear the last timer befor we set a new one
      }
    }, [emailIsValid, passwordIsValid]            //[emailState, passwordState]
  )

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input type="email"
               id="email"
               label="E-Mail"
               ref={emailInputRef}
               value={emailState.value}
               onChange={emailChangeHandler}
               onBlur={validateEmailHandler}
               isValid={emailIsValid}/>

        <Input type="password"
               id="password"
               label="Password"
               ref={passwordInputRef}
               value={passwordState.value}
               onChange={passwordChangeHandler}
               onBlur={validatePasswordHandler}
               isValid={passwordIsValid}/>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
