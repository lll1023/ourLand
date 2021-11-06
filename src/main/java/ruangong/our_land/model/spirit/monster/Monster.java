package ruangong.our_land.model.spirit.monster;

import ruangong.our_land.model.spirit.Spirit;

/**
 * 野怪类，野怪可捕捉
 *
 * @author wizardk
 * @email ozx1341530199@gmail.com
 */
public abstract class Monster extends Spirit {
    /**
     * 野怪的初始等级，默认为1
     */
    protected static final int INITIAL_LEVEL = 1;
    /**
     * 经验常量
     */
    protected static final int EXP_CONSTANT = 100;

    public Monster(String name, String id, int level, int blood, int attack, int defense, int speed) {
        super(name, id, level, blood, attack, defense, speed);
    }

    /**
     * 获取经验值，即精灵经验值在原本的基础上加gained
     * @param gained 获取到的经验值
     */
    public abstract void gainExp(int gained);

}
