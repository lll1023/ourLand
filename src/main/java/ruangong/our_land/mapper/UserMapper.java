package ruangong.our_land.mapper;

import org.apache.ibatis.annotations.Param;
import ruangong.our_land.model.user.User;
import ruangong.our_land.model.user.UserProp;
import ruangong.our_land.model.user.UserSpirit;

import java.util.List;
import java.util.Map;

/**
 * @Author: Lsutin
 * @Date: 2021/11/2 14:35
 * @describe:
 */
public interface UserMapper {

    /**
     * 根据用户名获取用户实体
     * @param uName 用户名
     * @return
     */
    User findByName(@Param("uName") String uName);

    /**
     * 根据用户id获取用户实体
     * @param uId 用户id
     * @return
     */
    User findById(@Param("uId") Integer uId);

    /**
     * 添加用户
     * @param uName 用户名
     * @param uPwd 用户密码
     * @return
     */
    Integer insertUser(@Param("uName") String uName,
                       @Param("uPwd") String uPwd);

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
    List<UserProp> findProp(@Param("uId") Integer uId);

    /**
     * 根据用户id获取拥有精灵
     * @param uId 用户id
     * @return
     */
    List<UserSpirit> findSpirit(@Param("uId") Integer uId);

    /**
     * 用户添加精灵
     * @param uId 用户id
     * @param sId 精灵id
     * @return
     */
    Integer insertUserSpirit(@Param("uId") Integer uId,
                             @Param("sId") Integer sId);

}
