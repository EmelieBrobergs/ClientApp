import instance from "./axios/instance";

const fetchSizeRange = (measurementId: string) => {
  return instance.get(`/sizerange/get-by-measurement/${measurementId}`
  )
    .then((response) => {
      return response.data as ISizeRange;  //TODO: Funkar detta även om ayyar är tom ?
    });
};

const createSizeRange = (sizerange: ICreateSizeRange) => {
  return instance.post(`/sizerange`,
    { ...sizerange }
  )
    .then((response) => {
      return response.data as ISizeRange;
    });
};

export default {
  fetchSizeRange,
  createSizeRange
};