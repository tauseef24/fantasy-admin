import { instance } from "./axiosBase";

export const login = async(data) => {
    return instance.post("http://localhost:8000/login",data)
        .then((res)=>res.data)
        .catch((err)=>err)
}