import axios from "axios";
import useStorage from "src/hooks/useStorage";
import { MAIN_URL2 } from "./apiConfig";

// Add Team
export const addTeam = async (data) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.post(`${MAIN_URL2}/saveclubteam`, data, {
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
// Get All Teams
export const getAllTeams = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/getCLubTeamsListbypattern`, {
            params: params,
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return res?.data?.result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// Get All Teams
export const getTeam = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/getClubTeams`, {
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

export const deleteTeam = async (email) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {

        const res = await axios.post(`${MAIN_URL2}/api/team/deleteteam/`,{email:email}, {
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