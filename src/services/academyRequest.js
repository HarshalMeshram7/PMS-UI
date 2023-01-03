import axios from "axios";
import useStorage from "src/hooks/useStorage";
import {MAIN_URL2 } from "./apiConfig";

// Add Academy
export const addAcademy = async (data) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.post(`${MAIN_URL2}/Saveacademy`, data, {
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

// Update Academy
export const updateAcademy = async (data) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.post(`${MAIN_URL2}/Updateacademy`, data, {
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

// Get All Academy
export const getAllAcademies = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/getAcademybypattern`, {
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
// Get Academy Details
export const getAcademy = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/getAcademy`, {
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

export const deleteAcademy = async (ID) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {

        const res = await axios.post(`${MAIN_URL2}/Deleteacademy/`,{ID}, {
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



// Get Academy Detailsgit 
export const getAcademyFinanceById = async (params) => {
    const { token } = useStorage();
    if (!token) {
        throw "No Token";
    }
    try {
        const res = await axios.get(`${MAIN_URL2}/getacademyfinancebyid`, {
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

