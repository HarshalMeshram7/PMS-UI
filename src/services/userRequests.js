import axios from "axios";
import useStorage from "src/hooks/useStorage";
import { MAIN_URL2 } from "./apiConfig";


//GET All USERS
export const getAllUser2 = async ( params) => {
  const { token } = useStorage();
  try {
    let res = await axios.get(`${MAIN_URL2}/getUserList`, {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET USER DETAILS
export const getUserDetails = async (params) => {
  const { token  } = useStorage();
  if (!token) {
    throw new Error("No token");
  }
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
};
//GET USER DETAILS
export const getUserTypeList = async (params) => {
  const { token  } = useStorage();
  if (!token) {
    throw new Error("No token");
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getUserTypeList`, {
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
};
// Add User
export const addUser = async (data) => {
  const { token } = useStorage();
  if (!token) {
      throw "No Token";
  }
  try {
      const res = await axios.post(`${MAIN_URL2}/adduser`, data, {
          headers: {
              Authorization: "Bearer " + token,
          },
      });
      return res.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
};
// Update User
export const updateUser = async (data) => {
  const { token } = useStorage();
  if (!token) {
      throw "No Token";
  }
  try {
      const res = await axios.post(`${MAIN_URL2}/updateuser`, data, {
          headers: {
              Authorization: "Bearer " + token,
          },
      });
      return res.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
};



//DELETE USER
export const deleteUser = async (data) => {
  const { token } = useStorage();
  if (!token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL2}/deleteuser`,{
      headers: {
        Authorization: "Bearer " + token,
      },
      data
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Change USER PASSWORD
export const changeUserPassword = async (id, data) => {
  const { token } = useStorage();
  try {
    const res = await axios.post(`${MAIN_URL2}/admin/${id}/reset_password/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
