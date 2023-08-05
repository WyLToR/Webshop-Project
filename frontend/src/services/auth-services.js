import jwtDecode from 'jwt-decode';
import { API_URL } from '../constants/backendConfig';

class AuthService {
  static async login(loginData) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const info = await response.json();
    if (response.status !== 200) {
      throw new Error('Invalid username/password');
    }
    const { token } = info;
    const user = jwtDecode(info.token);
    if (!user.isActivated) {
      throw new Error('User is not activated');
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      user,
      token,
    };
  }

  static getUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && token) {
      return { ...user, token };
    }
    return ({});
  }

  static logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

export default AuthService;
