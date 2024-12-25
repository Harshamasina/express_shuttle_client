import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { AuthContext } from "../Context/AuthContext";

const AccountDetailsContext = createContext();

const AccountDetailsProvider = ({ children }) => {
    const { currentUser, loading: authLoading } = useContext(AuthContext);
    const [accountDetails, setAccountDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const userId = currentUser.uid;
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_fb_id/${userId}`);
                setAccountDetails(res.data);
            } catch (err) {
                console.error("Error fetching account details:", err);
                setError(err.response?.data?.message || err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchAccountDetails();
        }
    }, [currentUser, authLoading]);

    if (authLoading || loading) {
        return (
            <div>
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#e5be5c"
                    secondaryColor="#3a464e"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="loader_route"
                />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <AccountDetailsContext.Provider value={{ accountDetails, loading, error }}>
            {children}
        </AccountDetailsContext.Provider>
    );
};

export { AccountDetailsContext, AccountDetailsProvider };
