import api from "./axiosInstance";

export const signUp = async (data) => {
    try {
        const res = await api.post("/auth/register", data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const res = await api.post("/auth/login", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};