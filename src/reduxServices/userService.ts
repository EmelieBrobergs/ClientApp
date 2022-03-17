import instance from "./axios/Instance";

const edit = (user: IUser) => {
  return instance.patch("/appuser",
    {...user}
  )
  .then((response) => {
    return response.data as IUser
  })
}

const editPassword = (userId: string, passwordObject: IEditPassword) => {
  return instance.patch(`/appuser/${userId}`, {
    ...passwordObject
  })
  .then((response) => {
    return response.data as Text
  })
}

// TODO: Hämta vilket företag man tillhör


export default {
  edit,
  editPassword
};