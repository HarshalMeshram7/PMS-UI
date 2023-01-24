import axios from "axios";
import useStorage from "src/hooks/useStorage";
import {MAIN_URL2 } from "./apiConfig";



// Get All Sports
export const getAllSports = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/sportslistbypattern`, {
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

