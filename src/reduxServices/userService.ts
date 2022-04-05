import instance from "./axios/instance";

const edit = (user: IUser) => {
  return instance.patch("/appuser",
    {...user}
  )
  .then((response) => {
    return response.data as IUser
  })
}

const editPassword = (userId: string, passwordObject: IEditPassword) => {
  return instance.patch(`/appuser/edit-password/${userId}`, {
    ...passwordObject
  })
  .then((response) => {
    return response.data as Text
  })
}

// NOTE: Denna metod skapar "dubbel kod" med login i Auth - finns det ett bättre sätt att skriva på?
const updateLocalstorage = (userId: string) => {
  return instance.get(`/appuser/${userId}`)
  .then((response) => {
    if (response.data.accessToken) {
      var token = {
        accessToken : response.data.accessToken
      }
      var user = {
        userId : response.data.user.id
      }
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user)); // TODO: Vilken user info vill vi ha ? Brukar man ha ?
    }
    return true; // TODO: Blir detta rätt???
  });
}

// TODO: Hämta vilket företag man tillhör


export default {
  edit,
  editPassword,
  updateLocalstorage
};