import React, { memo, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from '@contexts/AuthContext';

const NotFound = () => {
  const auth = useContext(AuthContext);
  return <Redirect to={{ pathname: auth.me ? '/home' : '/login' }} />;
}

export default memo(NotFound);

