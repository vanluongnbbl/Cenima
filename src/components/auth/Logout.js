import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from "../../actions/auth";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.userLogout());
  });

  return(
    <div>
      Logout
    </div>
  );
}

export default Logout;