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
export const updateTournament = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/Updatetournament/`, data, {
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

//Save Tournament Sports Division Step 1 old
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
//Save Tournament Sports Only Step 1.1 new
export const saveTournamentSports = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/SavetournamentSportsNew/`, data, {
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

//Save Tournament Sports Division Only Step 1.2 new
export const saveTournamentSportsDivisionNew = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/SavetournamentSportDivision/`, data, {
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

//Save Tournament Sports Division Step 2
export const saveTournamentSportsDivisionGroupAndTeams = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/tournamentSportsDivisionGroupsandteam/`, data, {
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

//Save Tournament Sports Division Step 3
export const saveTournamentSportsDivisionTeamsinGroup = async ( data) => {
  const { token } = useStorage();
  
  try {
    const res = await axios.post(`${MAIN_URL2}/tournamentSportsDivisionTeamsinGroup/`, data, {
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




//DELETE TournamentByID 
export const deleteTournamentMatch = async (ID) => {
  const { token } = useStorage();
  if (!ID || !token) {
    throw "No Token";
  }
  try {
    const res = await axios.delete(`${MAIN_URL2}/deleteTournamentMatch`, { ID }, {
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

//GET All Sports List for Fixtures 
export const getMatchesByTournamentID = async (params) => {
  const { token } = useStorage();
  if(!params.ID){
    return []
  }
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getTournamentMatchByTournamentID/`, {
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

//GET All Tournament 
export const getTournamentDetailsByID = async (params) => {
  const { token } = useStorage();
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getTournamentDetailsbyID/`, {
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

//GET All Sports List for Fixtures 
export const gettournamentSportsByTournamentID = async (params) => {
  const { token } = useStorage();
  if(!params.ID){
    return 
  }
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/gettournamentSportsByTournamentID/`, {
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

//GET All Sports Division for Fixtures 
export const gettournamentSportDivisionByTournamentSportID = async (params) => {
  const { token } = useStorage();
  if(!params.ID){
    return 
  }
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/gettournamentSportDivisionByTournamentSportID/`, {
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

//GET All Sports Group for Fixtures 
export const gettournamentGroupsandteamsBySportDivisionID = async (params) => {
  const { token } = useStorage();
  if(!params.ID){
    return 
  }
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/gettournamentGroupsandteamsBySportDivisionID/`, {
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

//GET All Group Teams for Fixtures 
export const getGroupTeamsByGroupID = async (params) => {
  const { token } = useStorage();
  if(!params.ID){
    return 
  }
  if (!token) {
    throw "No Token";
  }
  try {
    let res = await axios.get(`${MAIN_URL2}/getGroupTeamsByGroupID/`, {
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