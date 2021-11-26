package ruangong.our_land.service.Impl;

import org.springframework.stereotype.Service;
import ruangong.our_land.mapper.SpiritMapper;
import ruangong.our_land.model.spirit.Spirit;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.model.spirit.monster.Monster;
import ruangong.our_land.service.SpiritService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * @Author hwy
 * @Date 2021/11/26
 */

@Service
public class SpiritServiceImpl implements SpiritService {

    @Resource
    private SpiritMapper spiritMapper;

    @Override
    public Boss findBoss(Integer sId) {
        Boss boss = spiritMapper.getSpirit(sId);
        if (boss != null){
            boss.initSkills(spiritMapper);
        }
        return boss;
    }

    @Override
    public Monster findMonster(Integer sId) {
        Monster monster = spiritMapper.getMonster(sId);
        if (monster != null){
            monster.initSkills(spiritMapper);
        }
        return monster;
    }

}
