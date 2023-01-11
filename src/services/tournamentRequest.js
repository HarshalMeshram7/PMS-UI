import axios from "axios";
import useStorage from "src/hooks/useStorage";
import {  MAIN_URL2 } from "./apiConfig";

// Add Tournament
export const addTournament = async (data) => {
  const { token } = useStorage();
  if (!token) {
    throw "No Token";
  }
  try {
    const res = await axios.post(`${MAIN_URL2}/savetournament`, data, {
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


//UPDATE Tournament
export const updateTournament = async (id, data) => {
  const { token } = useStorage();
  if (!id || !data || !token) {
    throw "No Token";
    // return;
  }
  try {
    const res = await axios.put(`${MAIN_URL2}/admin/${id}/Updatetournament/`, data, {
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

//Save Tournament Sports Division Step 1
export const saveTournamentSportsDivision = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/SavetournamentSports/`, data, {
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




//GET All Tournament 
export const getAllTournament = async (params) => {
  const { token } = useStorage();
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getTournamentsbypattern/`, {
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


//GET STAFF DETAILS
export const getStaffDetails = async (params) => {
  const { token } = useStorage();
  if (!token) {
    throw new Error("No token");
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getStaff`, {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res?.data?.result[0];
  } catch (error) {
    console.log(error);

    throw error;
  }
};




//DELETE STAFF
export const deleteStaff = async (ID) => {
  const { token } = useStorage();
  if (!ID || !token) {
    throw "No Token";
  }
  try {
    const res = await axios.delete(`${MAIN_URL2}/admin/${ID}/Deletestaff/`, { id: ID }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



//EXTRA 

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



//Change STAFF PASSWORD
export const changeStaffPassword = async (id, data) => {
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
