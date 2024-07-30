import { jwtDecode } from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  
  console.log(accessToken)
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    document.cookie = `accessToken=${accessToken};path=/;`;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
   
  } else {
    localStorage.removeItem('accessToken');
    document.cookie = `accessToken=; Max-Age=0; path=/;`;
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
