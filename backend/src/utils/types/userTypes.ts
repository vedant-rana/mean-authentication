// type to define required properties for registering the user
export type userRquestType = {
  name: string;
  email: string;
  mobile: number;
  gender: "Male" | "Female" | "Other";
  city: string;
  password: string;
};
