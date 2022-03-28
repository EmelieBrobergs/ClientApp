import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/appuser`;

const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken && response.data.user.id) {
        var token = {
          accessToken : response.data.accessToken
        }
        var user = {
          userId : response.data.user.id
        }
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user)); // TODO: Vilken user info vill vi ha ? Brukar man ha ?
      }
      return response.data.user as IUser;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}') as {userId: string};
  return user.userId;
};

export default {
  login,
  logout,
  getCurrentUser,
};

