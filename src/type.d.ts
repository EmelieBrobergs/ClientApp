// File intended to be used for creation of types for React Redux

//As this file grows, it should be sorted in a nice way for better code structure..!

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
  originalStyle: IStyle | undefined;
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
  baseSizeName: string;  //ev. byta ut denna mot id ist..? 
  measurementId: string;
  sizes: ISize[];
}

interface ISize {
  id: string;
  name: string;
  orderIndex: string;   // NOTE: går att logga ut värdet, men inte skriva ut det i UI ???
  sizeRangeId: string;
}

interface IGrading {
  id: string;
  sizeId: string;
  measurementPointId: string;
  value: number;

  //********* only in React/UI */
  //calculatedValue: number | undefined;
}

interface IGradingMeasurementPoint {
  gradingId: string;
  sizeName: stirng;
  gradingValue: number;
  calculatedSizeValue: number;
  sizeOrderIndex: string;
  baseSize: boolean;
}

interface ICreateMeasurement {
  id: number;
  styleId: string;
  name: string;
  sizeRange: ICreateSizeRange;
  // unitOfMeasure: 0 | 1;
}

// TODO: Make Enum work in UI !
// enum EnumUnitOfMeasure {
//   cm = 0,
//   inch = 1
// }
interface ICreateSizeRange {
  id: number;
  baseSizeName: string | null;
  sizes: ICreateSizes[] | [];
}
interface ICreateSizes {
  id: number;
  name: string;
  orderIndex: string;
}

interface ICreateMeasurementResponse {
  id: string;
  parentMeasurementId?: string;
  name: string;
  styleId: string;
  createdDate: Date;
  sizeRange: ISizeRange | undefined;
}

interface ICreateMeasurementPoint {
  // measurementPoint: IMeasurementPoint;
  id: string;
  shortName: string;
  description: string;
  tolerance: number;
  measurementId: string;
  gradingField: IGradingMeasurementPoint[];
}