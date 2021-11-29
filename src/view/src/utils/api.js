// 接口实例化

import axios from "axios";

const DOMAIN = "http://101.43.56.21/our_land/"
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
        return Request.post("/map/getSpirit",data);
    },
    getRandomMonster : function() {
        return Request.get("/map/getMonster");
    }
}


// 战斗模块
export const Fight = {
    getFightInfo : function(data) {
        return Request.post("/spirit/getInfo",data);
    },
    saveFightRes : function(data) {
        return Request.post('/spirit/save',data);
    }
}