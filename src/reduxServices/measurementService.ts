import instance from "./axios/instance";

const fetchMeasurements = (styleId: string) => {
  return instance.get(`/measurement/get-by-style/${styleId}`
  )
    .then((response) => {
      return response.data as IMeasurement[];  //TODO: Funkar detta även om ayyar är tom ?
    });
};

//NOTE: Function name? 
// const createMeasurement = (data: ICreateMeasurement) => {
//   return instance.post(`/measurement`,
//     { ...data }
//   )
//     .then((response) => {
//       return response.data as IMeasurement;
//     });
// };
const createMeasurementAndSizeRange = (data: ICreateMeasurement) => {
  console.log(JSON.stringify(data, null, 2));
  return instance.post(`/measurement/sizerange-and-sizes`,
    { ...data }
  )
    .then((response) => {
      // returns a measurement object including sizerange and sizes
      console.log("the response will be handled");
      return response.data as ICreateMeasurementResponse;
    });
};

export default {
  fetchMeasurements,
  createMeasurementAndSizeRange
};