package ruangong.our_land.model.spirit.boss;

import ruangong.our_land.model.spirit.Spirit;

/**
 * boss类
 * @author wizardk
 * @author HuangZhiquan
 * @email ozx1341530199@gmail.com
 */
public abstract class Boss extends Spirit {

    /**
     * 经验常量
     */
    protected static final int EXP_BOSS = 1000;

    public Boss(String name, String id, int level, int blood, int attack, int defense, int speed,String type,String nature,int isRare) {
        super(name, id, level, blood, attack, defense, speed, type, nature,isRare);
    }

    /**
     * 当boss被击败后，给予用户精灵经验
     * @return 经验值
     */
    public int getExp(){
        return EXP_BOSS;
    }
}
