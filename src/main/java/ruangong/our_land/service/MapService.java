package ruangong.our_land.service;

import ruangong.our_land.model.Level;
import ruangong.our_land.model.spirit.boss.Boss;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:20
 * @describe:
 */
public interface MapService {
    Level getLevel(Level level);

    Boss getSpirit(Boss boss);
}
