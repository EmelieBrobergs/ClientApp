import instance from "./axios/instance";

const fetchStyles = (companyId: number) => {
  return instance.get(`/style/company/${companyId}`
  )
  .then((response) => {
    return response.data as IStyle[]
  })
}


export default {
  fetchStyles
};