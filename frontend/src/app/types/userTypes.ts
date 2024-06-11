// required fields to register user
export type regiterUserType = {
  name: string;
  email: string;
  password: string;
  mobile: number;
  gender: string;
  city: string;
};

// required fields to login user
export type loginUserType = {
  email: string;
  password: string;
};
