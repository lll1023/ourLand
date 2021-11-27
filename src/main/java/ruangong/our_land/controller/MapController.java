package ruangong.our_land.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ruangong.our_land.model.Level;
import ruangong.our_land.model.ResultInfo;
import ruangong.our_land.model.spirit.Spirit;
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
//    @GetMapping("/getMonster")
//    public ResultInfo getMonster(){
//
//    }

    @GetMapping("/getLevel")
    public ResultInfo getLevel(@RequestBody @Valid Level level){
        level=mapService.getLevel(level);
        System.out.println(Spirit.Skill.class);
        return ResultInfo.success(level);
    }
}
