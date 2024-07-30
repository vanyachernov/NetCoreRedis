import axios from "axios";

const baseUrl = 'http://localhost:5198/api';

export const fetchSpecialities = async () => {
    try {
        var response = await axios.get(`${baseUrl}/groups`);
        console.log(response);
    } catch(e) {
        console.error(e);
    }
}