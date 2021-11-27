package ruangong.our_land.service;

import ruangong.our_land.model.user.User;
import ruangong.our_land.model.user.UserProp;
import ruangong.our_land.model.user.UserSpirit;

import java.util.List;
import java.util.Map;

/**
 * @Author: Lsutin
 * @Date: 2021/11/2 14:36
 * @describe:
 */
public interface UserService {

    /**
     * 根据用户名获取用户实体
     * @param uName 用户名
     * @return
     */
    User findByName(String uName);

    /**
     * 根据用户id获取用户实体
     * @param uId 用户id
     * @return
     */
    User findById(Integer uId);

    /**
     * 插入用户
     * @param uName 用户名
     * @param uPwd 用户密码
     * @return
     */
    Integer insertUser(String uName, String uPwd);

    /**
     * 更新用户
     * @param param 参数map
     * @return
     */
    Integer updateUser(Map<String, Object> param);

    /**
     * 根据用户id获取拥有道具
     * @param uId 用户id
     * @return
     */
    List<UserProp> findProp(Integer uId);

    /**
     * 根据用户id获取拥有精灵
     * @param uId 用户id
     * @return
     */
    List<UserSpirit> findSpirit(Integer uId);

    /**
     * 用户添加精灵
     * @param uId 用户id
     * @param sId 精灵id
     * @return
     */
    Integer insertUserSpirit(Integer uId, Integer sId);

}
