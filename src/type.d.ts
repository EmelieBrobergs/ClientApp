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

interface IStyle {
  id: string;   // NOTE: Ändra till number ?
  companyId: string;
  assignedToUserId: string;
  styleNumber: string;
  orderNumber: string;
  name: string;
  description: string;
  productType: string;
  productGroup: string;
  tags: string[];
  // måste lägga till dessa under nu???
  // measurements: []
  //   fittings: []
}

interface IEditStyleInfo {
  style: IStyle | undefined;
  // assignedToUserId: string;
  styleNumber: string;
  orderNumber: string;
  name: string;
  description: string;
  productType: string;
  productGroup: string;
  // tags: string[];
}

//********************************* */
//*** More interfaces added.... */
interface IStyleInfoViewModel {
  id: string;
  companyId: string;
  assignedToUserId: string;
  styleNumber: string;
  orderNumber: string;
  name: string;
  description: string;
  productType: string;
  productGroup: string;
  tags: string[];
}


// interface IStyleCard {
//   id: int;
//   orderNumber: string;
//   assignedToUserId: int | null;
//   name: string;
//   productType: string;
//   productGroupe: string;
//   sizeRange: string | undefined;
// }