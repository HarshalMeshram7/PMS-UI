import axios from "axios";
import useStorage from "src/hooks/useStorage";
import { MAIN_URL2 } from "./apiConfig";


//GET All COACH 
export const getAllCoach = async ( params) => {
  const { token } = useStorage();
  try {
    let res = await axios.get(`${MAIN_URL2}/getcoachbypattern/`, {
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

//GET COACH DETAILS
export const getCoachDetails = async (params) => {
  const { token  } = useStorage();
  if (!token) {
    throw new Error("No token");
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getCoach`, {
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

//UPDATE COACH DETAILS
export const updateCoach = async (id, data) => {
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

//UPDATE COACH DETAILS
// export const addCoach = async (data) => {
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

//DELETE COACH
export const deleteCoach = async (id) => {
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

//Change COACH PASSWORD
export const changeCoachPassword = async (id, data) => {
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
