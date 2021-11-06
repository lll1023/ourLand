package ruangong.our_land.model.spirit.boss;

import ruangong.our_land.model.spirit.Spirit;

/**
 * boss类
 * @author wizardk
 * @email ozx1341530199@gmail.com
 */
public abstract class Boss extends Spirit {

    public Boss(String name, String id, int level, int blood, int attack, int defense, int speed) {
        super(name, id, level, blood, attack, defense, speed);
    }
}
