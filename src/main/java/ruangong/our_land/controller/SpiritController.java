package ruangong.our_land.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ruangong.our_land.model.ResultInfo;
import ruangong.our_land.model.spirit.Spirit;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.model.spirit.monster.Monster;
import ruangong.our_land.model.user.User;
import ruangong.our_land.model.user.UserSpirit;
import ruangong.our_land.service.SpiritService;
import ruangong.our_land.service.UserService;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Author hwy
 * @Date 2021/11/26
 */

@RestController
@RequestMapping("/spirit")
public class SpiritController {

    @Resource
    private SpiritService spiritService;

    @Resource
    private UserService userService;

    /**
     * 获取战斗信息
     * @param uId 用户id
     * @param bossId 关卡的怪物id
     * @return
     */
    @PostMapping("/getInfo")
    public ResultInfo getBattleInfo(@RequestParam("userId") @Valid Integer uId,
                                    @RequestParam("bossId") @Valid Integer bossId){
        Boss bossInfo = spiritService.findBoss(bossId);
        List<Integer> sIdList = userService.findSpirit(uId).stream().map(UserSpirit::getS_id).collect(Collectors.toList());
        List<Monster> userInfo = new ArrayList<>();
        for (Integer sId : sIdList) {
            userInfo.add(spiritService.findMonster(sId));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("bossInfo", bossInfo);
        map.put("userInfo", userInfo);
        return ResultInfo.success(map);
    }

    /**
     * 战斗结果上传
     * @param uId 用户id
     * @param bossId 关卡的怪物id
     * @param isWin 战斗是否胜利
     * @param isCatch 精灵是否被捕捉
     * @return
     */
    @PostMapping("/save")
    public ResultInfo uploadResult(@RequestParam("userId") @Valid Integer uId,
                                   @RequestParam("bossId") @Valid Integer bossId,
                                   Boolean isWin,
                                   Boolean isCatch){
        User user = userService.findById(uId);
        if (user != null){
            if (isWin){
                Map<String, Object> param = new HashMap<>();
                param.put("uId", uId);
                param.put("uProgress", user.getProgress() + 1);
                if(bossId >= 16) {
                    Boss boss = spiritService.findBoss(bossId);
                    param.put("uExp", user.getExp() + boss.getExp());
                    userService.updateUser(param);
                }else if(bossId >= 2) {
                    Monster monster = spiritService.findMonster(bossId);
                    param.put("uExp", user.getExp() + monster.getExp());
                    userService.updateUser(param);
                }else {
                    return ResultInfo.success("上传失败:怪物id有误");
                }
            }
            if (isCatch){
                List<Integer> sIdList = userService.findSpirit(uId).stream().map(UserSpirit::getS_id).collect(Collectors.toList());
                if (!sIdList.contains(bossId)){
                    userService.insertUserSpirit(uId, bossId);
                }else {
                    return ResultInfo.success("背包已存在该精灵");
                }
            }
        }else {
            return ResultInfo.success("上传失败:用户id有误");
        }
        return ResultInfo.success("战斗结果已上传");
    }

}
