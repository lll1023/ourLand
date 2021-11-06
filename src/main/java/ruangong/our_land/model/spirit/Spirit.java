package ruangong.our_land.model.spirit;

import org.springframework.lang.NonNull;
import ruangong.our_land.model.helper.ObjectHelper;
import ruangong.our_land.model.spirit.monster.Monster;

import java.util.HashMap;
import java.util.Map;

/**
 * 精灵类，包括boss和野怪
 *
 * @author HuangZhiquan
 * @author Wizardk
 * @Description 精灵类
 * @date Created in 2021-11-02 22:57
 * @Modified By
 */
public abstract class Spirit {

    /**
     * 精灵的最高等级
     */
    public static final int MAX_LEVEL = 100;

    /**
     * 精灵名
     */
    @NonNull
    private final String name;

    /**
     * 精灵的id
     */
    @NonNull
    private final String id;
    /**
     * 等级
     */
    private int level;
    /**
     * 血量
     */
    private int blood;
    /**
     * 攻击力
     */
    private int attack;
    /**
     * 防御力
     */
    private int defense;
    /**
     * 速度
     */
    private int speed;

    /**
     * 存放精灵的4个技能
     */
    @NonNull
    private Map<String, Skill> skillMap;

    public Spirit(String name, String id, int level, int blood, int attack,
                  int defense, int speed) {
        this.name = name;
        this.id = id;
        this.level = level;
        this.blood = blood;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        setSkills();
    }

    private void setSkills() {
        if (skillMap == null) {
            Skill[] skills = ObjectHelper.requireNonNull(initSkills());
            this.skillMap = new HashMap<>(4);
            for (Skill skill : skills) {
                skillMap.put(skill.name, skill);
            }
        }
    }

    /**
     * 初始化技能
     *
     * @return 返回技能列表
     */
    protected abstract Skill[] initSkills();

    /**
     * 根据技能名获取相应技能
     *
     * @param skillName 技能名
     * @return 返回对应的技能名
     */
    public Skill getSkills(String skillName) {
        String skill = ObjectHelper.requireNonNull(skillName, "skillName");
        if (skillMap == null) {
            return null;
        }
        if (!skillMap.containsKey(skill)) {
            throw new IllegalArgumentException("The skill \" " + skill + " \" not found! Please recheck!");
        }
        return skillMap.get(skill);
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    /**
     * 升级，使level+1
     */
    protected void levelUp() {
        if (this instanceof Monster && this.level < MAX_LEVEL) {
            this.level++;
        }
    }

    public int getBlood() {
        return blood;
    }

    public void setBlood(int blood) {
        this.blood = ObjectHelper.verifyNonZeroPositive(blood, "blood");
    }

    public int getAttack() {
        return attack;
    }

    public void setAttack(int attack) {
        this.attack = ObjectHelper.verifyNonZeroPositive(attack, "attack");
    }

    public int getDefense() {
        return defense;
    }

    public void setDefense(int defense) {
        this.defense = ObjectHelper.verifyNonZeroPositive(defense, "defense");
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = ObjectHelper.verifyNonZeroPositive(speed, "speed");
    }

    /**
     * 技能类
     */
    public static class Skill {
        //技能基本属性
        /**
         * 技能名
         */
        @NonNull
        String name;
        /**
         * 技能描述
         */
        @NonNull
        String description;
        /**
         * 技能使用次数
         */
        int times = 0;

        //构造方法
        public Skill(String name, String descrp) {
            this.name = ObjectHelper.requireNonNull(name, "name");
            this.description = ObjectHelper.requireNonNull(descrp, "descrp");
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public int getTimes() {
            return times;
        }

        public void setTimes(int times) {
            this.times = ObjectHelper.verifyNonZeroPositive(times, "times");
        }
    }
}
