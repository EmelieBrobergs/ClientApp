import instance from "./axios/instance";

const fetchGradings = (measurementPointId: string) => {
  return instance.get(`/grading/get-by-measurementpoint/${measurementPointId}`
  )
    .then((response) => {
      return response.data as IGrading[];  //TODO: Funkar detta även om ayyar är tom ?
    });
};

export default {
  fetchGradings
};