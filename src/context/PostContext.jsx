import axios from "axios";
import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl } from "./Constains";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const getContent = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/random-quote`);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const postContextData = { getContent };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
