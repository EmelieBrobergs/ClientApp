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
          accessToken: response.data.accessToken
        };
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(response.data.user));  //NOTE: Hela IUser objektet sparas är, iom att store försvinner vid omladdning
      }
      return response.data.user as IUser;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return (<IUser>JSON.parse(localStorage.getItem("user") ?? "{}"));
};

export default {
  login,
  logout,
  getCurrentUser,
};

