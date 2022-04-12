import instance from "./axios/instance";

const fetchMeasurementPoints = (measurementId: string) => {
  return instance.get(`/measurementpoint/get-by-measurement/${measurementId}`
  )
    .then((response) => {
      return response.data as IMeasurementPoint[];  //TODO: Funkar detta även om ayyar är tom ?
    });
};

export default {
  fetchMeasurementPoints
};