package ruangong.our_land.model.spirit;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import ruangong.our_land.model.helper.ObjectHelper;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;


/**
 * 精灵类，包括boss、用户初始和野怪
 *
 * @author HuangZhiquan
 * @author Wizardk
 * @Description 精灵类
 * @date Created in 2021-11-02 22:57
 * @Modified By
 */
@Data
@Slf4j
@NoArgsConstructor
public abstract class Spirit {

    /**
     * 精灵的最高等级
     */
    @Max(value = 100, message = "等级最高为100")
    public static final int MAX_LEVEL = 100;
    /**
     * 攻击力
     */
    @Min(value = 0)
    private static int attack;
    /**
     * 防御力
     */
    @Min(value = 0)
    private static int defence;
    /**
     * 速度
     */
    @Min(value = 0)
    private static int speed;
    /**
     * 精灵名
     */
    @NonNull
    private String name;
    /**
     * 精灵的id
     */
    @NonNull
    private String id;
    /**
     * 精灵是否稀有(是：1，否：0)
     * 精灵稀有与否，关系到精灵捕捉时的成功率
     */
    @NonNull
    private int isRare;
    /**
     * 等级
     */
    @Min(value = 1, message = "等级最低为1")
    private int level;
    /**
     * 血量
     */
    @Min(value = 0)
    private int blood;
    /**
     * 精灵类型（初始、野怪或boss）
     */
    private String type;

    /**
     * 精灵属性（水、火、草）
     */
    private String nature;

    @JsonIgnore
    private int skill1;
    @JsonIgnore
    private int skill2;
    @JsonIgnore
    private int skill3;
    @JsonIgnore
    private int skill4;

    /**
     * 存放精灵的4个技能
     */
    @NonNull
    private List<Skill> skills;

    /**
     * 初始化技能
     *
     * @return 返回技能列表
     */
    protected abstract Skill[] initSkills();


    @Deprecated
    /*public Skill getSkills(String skillName) {
        String skill = ObjectHelper.requireNonNull(skillName, "skillName");
        if (skillMap == null) {
            return null;
        }
        if (!skillMap.containsKey(skill)) {
            throw new IllegalArgumentException("The skill \" " + skill + " \" not found! Please recheck!");
        }
        return skillMap.get(skill);
    }*/


    public void setBlood(int blood) {
        this.blood = ObjectHelper.verifyNonZeroPositive(blood, "blood");
    }

    public void setAttack(int attack) {
        this.attack = ObjectHelper.verifyNonZeroPositive(attack, "attack");
    }

    public void setDefence(int defense) {
        this.defence = ObjectHelper.verifyNonZeroPositive(defense, "defense");
    }

    public void setSpeed(int speed) {
        this.speed = ObjectHelper.verifyNonZeroPositive(speed, "speed");
    }

    /**
     * 连接数据库
     *
     * @return Connection对象
     * @throws SQLException
     * @throws java.lang.ClassNotFoundException
     */
    public Connection getConnection() throws SQLException, java.lang.ClassNotFoundException {
        log.info("连接数据库");
        String url = "jdbc:mysql://39.99.140.114:3306/our_land";
        Class.forName("com.mysql.cj.jdbc.Driver");
        String username = "root";
        String password = "whibin";
        Connection con = DriverManager.getConnection(url, username, password);
        return con;
    }

    /**
     * 根据用户经验值获取当前精灵等级
     * @param exp 用户经验值
     * @return 精灵当前等级
     */
    public int getLevel(int exp) {
        int level;
        if (exp >= 10000) {
            level = MAX_LEVEL;
        } else {
            level = exp / 100;
        }
        return level;
    }

    /**
     * 获取当前精灵血量
     * @param blood 精灵原血量
     * @param exp 用户经验值
     * @return 当前精灵血量
     */
    public int getBlood(int blood, int exp) {
        int curLevel = getLevel(exp);
        int curBlood = (int) (blood + (curLevel - 1) * 0.1);
        return curBlood;
    }

    /**
     * 技能类
     */
    @Data
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

        /**
         * 技能类型（伤害型或提升型）
         * 伤害型：基础伤害值
         * 提升型：提升精灵属性（攻击、防御、速度）
         */
        @NonNull

        String type;

        /**
         * 技能伤害（若技能为伤害型），用于精灵对战
         */

        int hurt;

        //提升型技能的构造方法
        public Skill(String name, String descrp, String type) {
            this.name = ObjectHelper.requireNonNull(name, "name");
            this.description = ObjectHelper.requireNonNull(descrp, "descrp");
            this.type = ObjectHelper.requireNonNull(type, "type");
        }

        //伤害型技能的构造方法
        public Skill(String name, String descrp, String type, int hurt) {
            this.name = ObjectHelper.requireNonNull(name, "name");
            this.description = ObjectHelper.requireNonNull(descrp, "descrp");
            this.type = ObjectHelper.requireNonNull(type, "type");
            this.hurt = hurt;
        }


        public void setTimes(int times) {
            this.times = ObjectHelper.verifyNonZeroPositive(times, "times");
        }

    }
}
