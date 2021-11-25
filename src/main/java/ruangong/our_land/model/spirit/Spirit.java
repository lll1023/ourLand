package ruangong.our_land.model.spirit;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import ruangong.our_land.model.helper.ObjectHelper;
import ruangong.our_land.model.spirit.monster.Monster;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.sql.*;
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



    /**
     * 升级，使level+1
     */
    protected void levelUp() {
        if (this instanceof Monster && this.level < MAX_LEVEL) {
            this.level++;
        }
    }

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
     * 技能类
     */
    @Data
    public static class Skill {
        //技能基本属性
        /**
         * 技能名
         */
        @NonNull
        @Getter
        String name;
        /**
         * 技能描述
         */
        @NonNull
        @Getter
        String description;
        /**
         * 技能使用次数
         */
        @Getter
        int times = 0;

        /**
         * 技能类型（伤害型或提升型）
         * 伤害型：基础伤害值
         * 提升型：提升精灵属性（攻击、防御、速度）
         */
        @NonNull
        @Getter
        String type;

        /**
         * 技能伤害（若技能为伤害型），用于精灵对战
         */
        @Getter
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

        /**
         * 技能效果：
         * 伤害型：更新技能伤害值（用于对战）
         * 提升型：更新精灵属性（仅限于对战）
         */
        public void skillEffect() {
            log.info("技能效果实现");
            if (this.type.equals("伤害型")) {
                //当前伤害值 = 伤害值 * 攻击力
                this.hurt = this.hurt * attack;
            } else if (this.type.equals("提升型")) {
                //通过判断技能描述，来判断是提升攻击力、防御力还是速度
                //开始为简单起见，假设属性提升按+1的方式提升
                if (this.description.contains("攻击力")) {
                    attack = attack + 1;
                } else if (this.description.contains("防御力")) {
                    defence = defence + 1;
                } else if (this.description.contains("速度")) {
                    speed = speed + 1;
                }
            }
        }

        public void setTimes(int times) {
            this.times = ObjectHelper.verifyNonZeroPositive(times, "times");
        }

        /**
         * 连接数据库
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
         * 展示精灵图鉴
         *
         * @return 精灵图鉴信息
         * @throws SQLException
         * @throws ClassNotFoundException
         */
        public String showAllSpirit() throws SQLException, ClassNotFoundException {
            log.info("通过SQL查询语句，实现对数据库的查询，返回精灵图鉴信息");
            StringBuffer buffer = new StringBuffer();
            Connection con = getConnection();
            Statement sta = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet result;
            result = sta.executeQuery("SELECT s_id,s_name,s_type,s_blood,s_attack,s_defence,s_speed,s_prop,sk_id,sk_name,sk_intro,sk_times,sk_type\n" +
                    "FROM spirit,skill\n" +
                    "WHERE spirit.skill1 = skill.sk_id\n" +
                    "OR spirit.skill2 = skill.sk_id\n" +
                    "OR spirit.skill3 = skill.sk_id\n" +
                    "OR spirit.skill4 = skill.sk_id;");
            buffer.append("精灵ID        精灵名称        精灵类型      初始血量        攻击力        防御力        速度        属性        技能ID        技能名        技能效果        使用次数        技能类型\n");
            while (result.next()) {
                String s_id = result.getString("s_id");
                String s_name = result.getString("s_name");
                String s_type = result.getString("s_type");
                int s_blood = result.getInt("s_blood");
                int s_attack = result.getInt("s_attack");
                int s_defence = result.getInt("s_defence");
                int s_speed = result.getInt("s_speed");
                String s_prop = result.getString("s_prop");
                int sk_id = result.getInt("sk_id");
                String sk_name = result.getString("sk_name");
                String sk_intro = result.getString("sk_intro");
                int sk_times = result.getInt("sk_times");
                String sk_type = result.getString("sk_type");
                buffer.append("  " + s_id + "           " + s_name + "           " + s_type + "         " + s_blood + "           " + s_attack + "           "
                        + s_defence + "           " + s_speed + "           " + s_prop + "           " + sk_id + "           " + sk_name + "           " +
                        sk_intro + "           " + sk_times + "           " + sk_type + "\n");
            }
            return buffer.toString();
        }
    }
}
