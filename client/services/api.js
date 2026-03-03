import axios from "axios";
import { setLoading, setUserData } from "../src/redux/userSlice";
import { serverUrl } from "../src/App";

export const getCurrentUser = async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(
            serverUrl + "/api/user/currentuser",
            { withCredentials: true }
        );

        dispatch(setUserData(response.data));

        return response.data;

    } catch (err) {
        console.error("get current user error:", err.message);
    } finally {
        dispatch(setLoading(false))
    }
};