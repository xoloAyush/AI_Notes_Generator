import { serverUrl } from "../src/App"
import axios from "axios";

export const getCurrentUser = async () => {

    try {
        const response = await axios.get(serverUrl + "/api/user/currentuser", {
            withCredentials: true,
        })
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("get current user error:", err.message);
    }
}