import { axios } from "./request";

const { get, put, post } = axios;

export const register = (data) => post("/badminton/users/register/", data);
export const login = (data) => post("/badminton/users/login/", data);
export const getUserInfo = (data) =>
  get(`/badminton/users/email/${data.email}`);
export const updateUserOnlineStatus = (data) =>
  put("/badminton/users/updateUserOnlineStaus/", data);
export const updateUserMatchStatus = (data) =>
  put("/badminton/users/updateUserMatchStaus/", data);
export const updateUserInfo = (data) =>
  put("/badminton/users/updateUserInfo/", data);
export const getRandomUsers = () => get(`/badminton/users/randomUsers`);
export const addAImodelData = (data) =>
  post("/badminton/users/addAImodelData/", data);
