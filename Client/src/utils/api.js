import axios from "axios"

const BASE_URL=`http://localhost:4000/api/v1/`;

const getAuth =()=>{
    return `Bearer ${localStorage.getItem('token')}`
}

export const loginApiCall = async(payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const getDataApiCall = async (END_POINT) => {
  return await axios.get(`${BASE_URL}${END_POINT}`);
};