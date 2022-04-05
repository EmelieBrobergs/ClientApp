import instance from "./axios/instance";

const fetchStyles = (companyId: string) => {
  return instance.get(`/style/get-by-company/${companyId}`
  )
  .then((response) => {
    return response.data as IStyle[]
  })
}

// TODO: Se över namn, ska den endast editera viss nivå? ex. "info" ?
// TODO: Skapa API endpint ?
// FRÅGA: Hur hanterar jag svaret i Redux statet nu ? retunera en syle eller retunera en hel lista och ersätta hela statet ??
const edit = (style: IStyle) => {
  return instance.patch("/style",
    {...style}
  )
  .then((response) => {
    return response.data as IStyle
  })
}

export default {
  fetchStyles,
  edit
};