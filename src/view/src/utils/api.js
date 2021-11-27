// 接口实例化

import axios from "axios";

const DOMAIN = "http://localhost:8080/"
const Request = axios.create({
    baseURL: DOMAIN
})

// 用户模块
export const User = {
    register : function(data) {
        return Request.post("/user/register",data);
    },
    login : function(data) {
        return Request.post("/user/login",data);
    }
}

// 精灵模块
export const Spirit = {
    getSpiritById : function(data) {
        return Request.post("/")
    }
}
