import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (userData) =>
  API.post("users/googleSignin", userData);

export const createTour = (tourData) => API.post("tours/create", tourData);
