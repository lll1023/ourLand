package ruangong.our_land.service;

import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.model.spirit.monster.Monster;

/**
 * @Author hwy
 * @Date 2021/11/26
 */

public interface SpiritService {

    /**
     * 根据精灵id获取Boss实体
     * @param sId 精灵id
     * @return
     */
    Boss findBoss(Integer sId);

    /**
     * 根据精灵id获取Monster实体
     * @param sId 精灵id
     * @return
     */
    Monster findMonster(Integer sId);

}
