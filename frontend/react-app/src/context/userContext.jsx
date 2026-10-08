import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/apiCalls";

/** @typedef {{ id?: string, name: string, email: string }} UserProfile */
/** @typedef {{
 * profile: UserProfile | null,
 * setProfile: import("react").Dispatch<import("react").SetStateAction<UserProfile | null>>,
 * isLoading: boolean,
 * authError: string,
 * loadProfile: () => Promise<UserProfile>,
 * logout: () => void
 * }} UserContextValue */

const UserContext = createContext(/** @type {UserContextValue | null} */ (null));

export const UserContextProvider = ({ children }) => {
    const [profile, setProfile] = useState(/** @type {UserProfile | null} */ (null));
    const [isLoading, setIsLoading] = useState(
        () => Boolean(sessionStorage.getItem("token"))
    );
    const [authError, setAuthError] = useState("");

    const loadProfile = useCallback(async () => {
        setIsLoading(true);
        setAuthError("");

        try {
            const userProfile = await getProfile();
            setProfile(userProfile);
            return userProfile;
        } catch (error) {
            sessionStorage.removeItem("token");
            setProfile(null);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            return;
        }

        loadProfile().catch((error) => {
            setAuthError(
                error.response?.data?.message ||
                "Could not load your profile. Please log in again."
            );
        });
    }, [loadProfile]);

    const logout = useCallback(() => {
        sessionStorage.removeItem("token");
        setProfile(null);
        setAuthError("");
    }, []);

    return (
        <UserContext.Provider
            value={{ profile, setProfile, isLoading, authError, loadProfile, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used inside UserContextProvider");
    }

    return context;
};
