package ruangong.our_land.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ruangong.our_land.mapper.LevelMapper;
import ruangong.our_land.mapper.SpiritMapper;
import ruangong.our_land.model.Level;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.service.MapService;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:20
 * @describe:
 */
@Service
public class MapServiceImpl implements MapService {
    @Autowired
    private LevelMapper levelMapper;
    @Autowired
    private SpiritMapper spiritMapper;

    @Override
    public Level getLevel(Level level) {
        level=levelMapper.getLevel(level.getL_id());
        Boss boss = spiritMapper.getSpirit(level.getL_boss());

        level.setBoss(boss);
        return level;
    }
}
