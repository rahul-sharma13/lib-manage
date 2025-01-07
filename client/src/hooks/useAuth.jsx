import axios from "axios";
import { useState } from "react";

export const useSignUpAuth = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (signupData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/signup", signupData);
            setData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export const useLoginAuth = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (loginData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", loginData, { withCredentials: true });
            setData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};
