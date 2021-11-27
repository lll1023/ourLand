package ruangong.our_land.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import ruangong.our_land.aspect.WebLog;
import ruangong.our_land.model.ResultInfo;
import ruangong.our_land.model.dto.UserDto;
import ruangong.our_land.model.user.User;
import ruangong.our_land.model.user.UserProp;
import ruangong.our_land.model.user.UserSpirit;
import ruangong.our_land.service.UserService;

import javax.annotation.Resource;
import java.util.stream.Collectors;

/**
 * @Author: Lsutin
 * @Date: 2021/11/2 14:35
 * @describe:
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    /** 初始精灵id */
    private static final Integer INIT_SPIRIT = 1;

    /**
     * 用户注册
     * @param uName 用户名
     * @param uPwd 用户密码
     * @return
     */
    @PostMapping("/register")
    @WebLog(message = "用户注册")
    public ResultInfo register(@RequestParam("username") String uName,
                               @RequestParam("password") String uPwd){
        User user;
        user = userService.findByName(uName);
        if (user != null){
            return ResultInfo.error(500,"注册失败:用户名已存在");
        }else {
            int insert;
            insert = userService.insertUser(uName, uPwd);
            if (insert > 0){
                user = userService.findByName(uName);
                insert = userService.insertUserSpirit(user.getId(), INIT_SPIRIT);
                if (insert > 0){
                    return ResultInfo.success("注册成功");
                }
            }
            return ResultInfo.error(500, "注册失败:系统错误");
        }
    }

    /**
     * 用户登录
     * @param uName 用户名
     * @param uPwd 用户密码
     * @return
     */
    @PostMapping("/login")
    @WebLog(message = "用户登录")
    public ResultInfo login(@RequestParam("username") String uName,
                            @RequestParam("password") String uPwd){
        User user = userService.findByName(uName);
        if (user == null){
            return ResultInfo.error(500,"登录失败:该用户不存在");
        }else if (user.getPassword().equals(uPwd)){
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(user, userDto);
            userDto.setProps_bag(userService.findProp(user.getId()).stream().map(UserProp::getP_id).collect(Collectors.toList()));
            userDto.setSpirits_bag(userService.findSpirit(user.getId()).stream().map(UserSpirit::getS_id).collect(Collectors.toList()));
            return ResultInfo.success(userDto);
        }else {
            return ResultInfo.error(500,"登录失败:密码错误");
        }
    }
}
