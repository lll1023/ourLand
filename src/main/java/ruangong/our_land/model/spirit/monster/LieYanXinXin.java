package ruangong.our_land.model.spirit.monster;

import ruangong.our_land.model.helper.ObjectHelper;
import ruangong.our_land.model.spirit.Spirit;

/**
 * 火焰猩猩
 *
 * @author wizardk
 * @email ozx1341530199@gmail.com
 */
public class LieYanXinXin extends Monster {

    /**
     * 升级所需经验值，与当前等级有如下关系：exp = level * {@link Monster#EXP_CONSTANT}
     */
    private int exp = 100;
    /**
     * 当前经验值
     */
    private int curExp = 0;

    public LieYanXinXin() {
        super("LieYanXinXin", "LieYanXinXin@1", Monster.INITIAL_LEVEL, 500, 50,
                45, 100);
    }

    @Override
    protected Skill[] initSkills() {
        Skill[] list = new Skill[4];
        list[0] = new Spirit.Skill("疯狂乱抓", "一回合做2-5次攻击");
        list[1] = new Spirit.Skill("全力一击", "造成120伤害");
        list[2] = new Spirit.Skill("火焰漩涡", "100%令对方烧伤");
        list[3] = new Spirit.Skill("烈焰冲撞", "对方所受伤害的1/4会反弹给自己");
        return list;
    }

    @Override
    public void gainExp(int gained) {
        ObjectHelper.verifyNonZeroPositive(gained, "gained");
        int sum = gained + curExp;
        while (sum >= exp) {
            sum -= exp;
            levelUp();
            exp = getLevel() * EXP_CONSTANT;
        }
        curExp = sum;
    }
}
