import Home from "../views/Home/index";
import Main from "../views/Main";
import Adventure from "../views/Adventure";
import Fight from "../views/Fight"

// 存放路由配置信息
export const route = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/game",
    component: Main,
  },
  {
    path: "/adventure",
    component: Adventure
  },
  {
    path: "/fight",
    component: Fight
  }
];
