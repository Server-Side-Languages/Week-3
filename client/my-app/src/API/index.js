import axios from "axios";

const API = Object.create(null);

API.fetchDevelopers = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/developers/");
    console.log(response.data);
    return response.data.results;
};
export default API;