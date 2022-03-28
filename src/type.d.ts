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
  companyId: number | null;
}

interface IEditPassword {
  oldPass: string;
  newPass: string;
}

interface IStyle {
  id: int;
  companyId: int;
  assignedToUserId: int;
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