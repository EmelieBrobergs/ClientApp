import instance from "./axios/instance";

const fetchMeasurements = (styleId: string) => {
  return instance.get(`/measurement/get-by-style/${styleId}`
  )
    .then((response) => {
      return response.data as IMeasurement[];  //TODO: Funkar detta även om ayyar är tom ?
    });
};

export default {
  fetchMeasurements
};