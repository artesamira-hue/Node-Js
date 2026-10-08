import api from "./axiosInstance";

export const signUp = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const login = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data.user;
};

export const forgotPassword = async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
};

export const resetPassword = async (token, password) => {
    const res = await api.post(`/auth/reset-password/${encodeURIComponent(token)}`, { password });
    return res.data;
};