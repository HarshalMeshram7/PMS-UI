import axios from "axios";
import useStorage from "src/hooks/useStorage";
import {  MAIN_URL2 } from "./apiConfig";


//ADD REFEREE DETAILS
export const addReferee = async ( data) => {
  const { token } = useStorage();
  if ( !data || !token) {
    return;
  }
  try {
    const res = await axios.post(`${MAIN_URL2}/SaveReferee/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
    throw error;
  }
};




//GET All REFEREE 
export const getAllReferee = async ( params) => {
  const { token } = useStorage();
  try {
    let res = await axios.get(`${MAIN_URL2}/getRefereebypattern/`, {
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

//GET REFEREE DETAILS
export const getRefereeDetails = async (params) => {
  const { token  } = useStorage();
  if (!token) {
    throw new Error("No token");
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getReferee`, {
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

//UPDATE REFEREE DETAILS
export const updateReferee = async (id, data) => {
  const { token } = useStorage();
  if (!id || !data || !token) {
    return;
  }
  try {
    const res = await axios.put(`${MAIN_URL2}/admin/${id}/update_admin/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE USER DETAILS
// export const addUser = async (data) => {
//   const { token } = useStorage();
//   try {
//     const res = await axios.post(`${MAIN_URL}/admin/create_admin/`, data, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

//DELETE REFEREE
export const deleteReferee = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL2}/admin/${id}/delete_admin/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Change REFEREE PASSWORD
export const changeRefereePassword = async (id, data) => {
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
