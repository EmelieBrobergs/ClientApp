// File intended to be used for creation of types for React Redux

interface IUserCredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId: string | undefined;
}

interface IEditPassword {
  oldPass: string;
  newPass: string;
}


// STYLE **********************************
interface IStyle {
  id: string;   // NOTE: Ändra till number ?
  companyId: string;
  assignedToUserId: string | undefined;
  styleNumber: string;
  orderNumber: string;
  name: string;
  description: string;
  productType: string;
  productGroup: string;
  tags: string[];
  measurements: IMeasurement[] | [];
  // fittings: []
}
interface IEditStyleInfo {
  style: IStyle | undefined;
  assignedToUserId: string | undefined;
  styleNumber: string;
  orderNumber: string;
  name: string;
  description: string;
  productType: string;
  productGroup: string;
  tags: string[] | undefined;
}
// END STYLE **********************************

interface IMeasurement {
  id: string;
  parentMeasurementId?: string;
  name: string;
  styleId: string;
  //measurementPoints: IMeasurementPoint[] | [];
  createdDate: Date;
}

interface IMeasurementPoint {
  id: string;
  shortName: string;
  description: string;
  tolerance: number;
  measurementId: string;
}

interface ISizeRange {
  id: string;
  baseSizeName: string;
  measurementId: string;
  sizes: ISize[];
}

interface ISize {
  id: string;
  name: string;
  orderIndex: string;   // number gjode den undefined vid test print i measurementList, medan name funka..
  sizeRangeId: string;
}

interface IGrading {
  id: string;
  sizeId: string;
  measurementPointId: string;
  value: number;
}

