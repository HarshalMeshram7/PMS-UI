import axios from "axios";
import useStorage from "src/hooks/useStorage";
import jwtDecode from "src/utils/jwt-decode";
import { MAIN_URL2 } from "./apiConfig";

//ADMIN LOGIN
export const login = async ({ email, password }) => {
  try {
    let res;
    if (email == "Federation@pixonix.tech" && password == "Federation@1234") {
      res = {
        message: "Login Success",
        status: "success",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ2NTllYTcxNTM5ZTA1ZTMyYjc5YTQiLCJlbWFpbCI6IkZlZGVyYXRpb25AcGl4b25peC50ZWNoIiwicm9sZSI6IkZlZGVyYXRpb24iLCJpYXQiOjE2NjgxNDY1MDcsImV4cCI6MTY2ODU3ODUwN30.9YvBlqbhhcvqov5DQ--sTSKCEsm32JFCIs8lOikmDfA",
      };
      const { setToken, setUserId, setEmail, setRole } = useStorage();
      const authData = jwtDecode(res?.token);
      const tokenExp = authData?.exp;

      setToken(res?.token);
      setRole(authData?.role);
      setUserId(authData?.userId);
      setEmail(authData?.email);
    } else {
      res = {
        message: "Login Failed",
        status: "failed",
      };
    }

    return res;
  } catch (error) {
    throw error;
  }
};
//ADMIN LOGIN
export const loginNew = async ({ userName, password }) => {
  try {
    const res = await axios.post(`${MAIN_URL2}/login`, {
      userName,
      password,
    });
    if (res.data.status == "success") {
      // const authData = jwtDecode(res?.token);
      // const tokenExp = authData?.exp;
      // data we need
      const { setToken, setUserId, setEmail, setFname, setLname, setLoggedInUserName } =
        useStorage();
      setUserId(res?.data?.result?.Id);
      setEmail(res?.data?.result?.EMail);
      setFname(res?.data?.result?.FirstName);
      setLname(res?.data?.result?.LastName);
      setLoggedInUserName(res?.data?.result?.UserName);
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ2NTllYTcxNTM5ZTA1ZTMyYjc5YTQiLCJlbWFpbCI6IkZlZGVyYXRpb25AcGl4b25peC50ZWNoIiwicm9sZSI6IkZlZGVyYXRpb24iLCJpYXQiOjE2NjgxNDY1MDcsImV4cCI6MTY2ODU3ODUwN30.9YvBlqbhhcvqov5DQ--sTSKCEsm32JFCIs8lOikmDfA"
      );
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

//GET LoginUser DETAILS
export const getLoginUser = async (params) => {
  const { token } = useStorage();
  if (params.id) {
    try {
      let res = await axios.get(`${MAIN_URL2}/getUser`, {
        params: params,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

//USER LOGOUT
export const logout = async () => {
  const { clearAll } = useStorage();
  try {
    clearAll();
  } catch (error) {}
};

//UPDATE USER DETAILS
export const updateAdmin = async (data) => {
  const { token, userID } = useStorage();
  if (!token) {
    throw "No Token";
  }
  if (!userID) {
    throw "No User Id";
  }
  try {
    const res = await axios.put(`${MAIN_URL2}/updateAdmin`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
