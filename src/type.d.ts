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
  company: string | null;
}

interface IEditPassword {
  oldPass: string;
  newPass: string;
}