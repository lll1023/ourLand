package ruangong.our_land.service.Impl;

import org.springframework.stereotype.Service;
import ruangong.our_land.mapper.LevelMapper;
import ruangong.our_land.mapper.SpiritMapper;
import ruangong.our_land.model.Level;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.service.MapService;

import javax.annotation.Resource;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:20
 * @describe:
 */
@Service
public class MapServiceImpl implements MapService {
    @Resource
    private LevelMapper levelMapper;
    @Resource
    private SpiritMapper spiritMapper;

    @Override
    public Level getLevel(Level level) {
        level=levelMapper.getLevel(level.getL_id());
        return level;
    }

    @Override
    public Boss getSpirit(Boss boss) {
        boss = spiritMapper.getSpirit(boss.getId());
        if (null!=boss){
            boss.initSkills(spiritMapper);
        }
        return boss;
    }
}
