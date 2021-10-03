import { createContext, useReducer, useEffect } from "react";
import { setAuthToken } from "../utils/setAuthToken";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_ID_TOKEN,
} from "./Constains";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { parseJwt } from "../utils/decodeJwt";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    username: null,
  });

  // Authenticate user
  const loadUser = async () => {
    //cấp token
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
    }

    try {
      var id_token = localStorage.getItem(LOCAL_STORAGE_ID_TOKEN);
      var decode = parseJwt(id_token);
      const response = await axios.get(`${apiUrl}/api/protected/random-quote`);

      if (response) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: decode.extra,
            username: decode.username,
          },
        });
      }

      //nhỡ token nhằng thì xóa
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN);

      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null, username: null },
      });
    }
  };
  useEffect(() => loadUser(), []);

  //login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/sessions/create`, userForm);
      if (response) {
        //save in storage
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.access_token);
        localStorage.setItem(LOCAL_STORAGE_ID_TOKEN, response.data.id_token);

        var decode = parseJwt(response.data.id_token);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: decode.extra,
            username: decode.username,
          },
        });
      }
      // return response;
      await loadUser();

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, userForm);
      if (response) {
        //save in storage
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.access_token);
        localStorage.setItem(LOCAL_STORAGE_ID_TOKEN, response.data.id_token);

        var decode = parseJwt(response.data.id_token);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: decode.extra,
            username: decode.username,
          },
        });
      }
      // return res;
      await loadUser();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //logout
  const logoutUser = () => {
    //remove in storage
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN);
    setAuthToken(null);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null, username: null },
    });
  };

  const authContextData = { loginUser, registerUser, logoutUser, authState };
  return (
    //save as provider
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
