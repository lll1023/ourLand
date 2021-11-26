package ruangong.our_land.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ruangong.our_land.aspect.WebLog;
import ruangong.our_land.model.Level;
import ruangong.our_land.model.ResultInfo;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.model.spirit.monster.Monster;
import ruangong.our_land.service.MapService;

import javax.validation.Valid;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 20:50
 * @describe:
 */
@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @WebLog(message = "随机获取野怪")
    @GetMapping("/getMonster")
    public ResultInfo getMonster(){
        return ResultInfo.success(Monster.getMonster());
    }

    @WebLog(message = "获取关卡信息")
    @GetMapping("/getLevel")
    public ResultInfo getLevel(@Valid Level level){
        level=mapService.getLevel(level);
        return ResultInfo.success(level);
    }

    @WebLog(message = "获取精灵信息")
    @PostMapping("/getSpirit")
    public ResultInfo getSpirit(@Valid Boss boss){
        boss=mapService.getSpirit(boss);
        return ResultInfo.success(boss);
    }
}
