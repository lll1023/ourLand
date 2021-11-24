package ruangong.our_land.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ruangong.our_land.aspect.WebLog;
import ruangong.our_land.model.ResultInfo;
import ruangong.our_land.utils.EmailUtil;

/**
 * @Author: Lsutin
 * @Date: 2021/11/2 14:35
 * @describe:
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private EmailUtil emailUtil;

    @PostMapping("/mail")
    @WebLog(message = "发送邮箱")
    public ResultInfo send(){
        emailUtil.sendPlainText("找回密码","password","2335287299@qq.com");
        return ResultInfo.success(null);
    }
}
