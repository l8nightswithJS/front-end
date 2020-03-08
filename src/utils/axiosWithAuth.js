import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        headers: {
            authorization: token,
        },
        baseURL: "https://sleep-tracker-server.herokuapp.com/api", //Your API base URL here
    });
};
