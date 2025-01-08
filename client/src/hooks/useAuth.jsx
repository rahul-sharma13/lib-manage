import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInUserSuccess } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useSignUpAuth = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (signupData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `https://lib-manage-wzei.vercel.app/api/v1/auth/signup`,
                signupData
            );
            console.log(response);
            navigate("/login");
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { currentUser, loading, error, fetchData };
};

export const useLoginAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (loginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://lib-manage-wzei.vercel.app/api/v1/auth/login",
        loginData,
        { withCredentials: true }
      );
      console.log("Login response:", response.data); // Log the API response
      dispatch(signInUserSuccess(response.data)); // Adjust if payload structure changes
      console.log("State after login:", currentUser); // Log Redux state
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { currentUser, loading, error, fetchData };
};
