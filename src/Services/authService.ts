
// import api from "./api";
// import type { RegisterRequest } from "../Types/auth.types";

// export const registerUser = async (
//   registerData: RegisterRequest
// ) => {
//   const response = await api.post(
//     "/api/Auth/register",
//     registerData
//   );

//   return response.data;
// };


// import type { LoginRequest } from "../Types/auth.types";

// // Login API
// export const loginUser = async (loginData: LoginRequest) => {
//   const response = await api.post(
//     "/api/Auth/login",
//     loginData
//   );

//   return response.data;
// };



// import api from "./api";
// import type {
//   RegisterRequest,
//   LoginRequest
// } from "../Types/auth.types";

// // Registration API
// export const registerUser = async (
//   registerData: RegisterRequest
// ) => {
//   const response = await api.post(
//     "/api/Auth/register",
//     registerData
//   );

//   return response.data;
// };

// // Login API
// export const loginUser = async (
//   loginData: LoginRequest
// ) => {
//   const response = await api.post(
//     "/api/Auth/login",
//     loginData
//   );

//   return response.data;
// };



import api from "./api";
import type { RegisterRequest, LoginRequest, LoginResponse } from "../Types/auth.types";

export const registerUser = async (registerData: RegisterRequest) => {
  const response = await api.post("/api/Auth/register", registerData);
  return response.data;
};

export const loginUser = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/Auth/login",
    loginData
  );

  return response.data;
};