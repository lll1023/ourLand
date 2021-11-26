package ruangong.our_land.mapper;

import org.apache.ibatis.annotations.Param;
import ruangong.our_land.model.spirit.Spirit;
import ruangong.our_land.model.spirit.boss.Boss;
import ruangong.our_land.model.spirit.monster.Monster;

import java.util.ArrayList;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:31
 * @describe:
 */
public interface SpiritMapper {
    Boss getSpirit(@Param("s_id") int l_boss);

    Monster getMonster(@Param("s_id") Integer sId);

    ArrayList<Spirit.Skill> getSkill(@Param("skill1")int skill1,@Param("skill2")int skill2,@Param("skill3")int skill3,@Param("skill4")int skill4);

}
