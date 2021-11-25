package ruangong.our_land.service.Impl;

import org.springframework.stereotype.Service;
import ruangong.our_land.mapper.UserMapper;
import ruangong.our_land.model.user.User;
import ruangong.our_land.model.user.UserProp;
import ruangong.our_land.model.user.UserSpirit;
import ruangong.our_land.service.UserService;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author: Lsutin
 * @Date: 2021/11/2 14:36
 * @describe:
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public User findByName(String uName) {
        return userMapper.findByName(uName);
    }

    @Override
    public Integer insertUser(String uName, String uPwd) {
        return userMapper.insertUser(uName, uPwd);
    }

    @Override
    public List<UserProp> findProp(Integer uId) {
        return userMapper.findProp(uId);
    }

    @Override
    public List<UserSpirit> findSpirit(Integer uId) {
        return userMapper.findSpirit(uId);
    }

    @Override
    public Integer insertUserSpirit(Integer uId, Integer sId) {
        return userMapper.insertUserSpirit(uId, sId);
    }

}
