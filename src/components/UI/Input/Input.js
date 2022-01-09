import React, {useRef, useImperativeHandle} from 'react';

// ImperativeHandle 命令式方法
// this means not through the regular state props management, not controlling the component through state from the parent
// directly calling or manipulating something in the Component programmatically
// this is something we want to rarely use

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {

  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus()
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    };
  });

  return (

    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={`${classes.input} ${props.className}`}
      />
    </div>

  );
});

export default Input;
