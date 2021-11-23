package ruangong.our_land.model.spirit.monster;

import ruangong.our_land.model.spirit.Spirit;

import java.util.Random;

/**
 * 野怪类，野怪可捕捉
 * @author wizardk
 * @author HuangZhiquan
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

    public Monster(String name, String id, int level, int blood, int attack, int defense, int speed,String type,String nature,int isRare) {
        super(name, id, level, blood, attack, defense, speed,type,nature,isRare);
    }

    /**
     * 获取经验值，即精灵经验值在原本的基础上加gained
     * @param gained 获取到的经验值
     */
    public abstract void gainExp(int gained);

    /**
     * 当野怪被击败后，给予用户精灵经验
     * @return 经验值
     */
    public int getExp(){
        return EXP_CONSTANT;
    }

    /**
     * 根据概率生成野怪（稀有野怪出现概率低，约为3%；普通野怪出现概率高，约为10%），用于精灵捕捉
     * @return 野怪精灵的id
     */
    public int getMonster(){

        //初始化野怪id数组
        int[] monsterId = new int[100];
        monsterId[0] = 4;
        monsterId[1] = 5;
        monsterId[2] = 6;
        for (int i = 3; i < 13; i++) {
            monsterId[i] = 7;
        }
        for (int i = 13; i < 23; i++) {
            monsterId[i] = 8;
        }
        for (int i = 23; i <34; i++) {
            monsterId[i] = 9;
        }
        for (int i = 34; i < 46; i++) {
            monsterId[i] = 10;
        }
        for (int i = 46; i < 59; i++) {
            monsterId[i] = 11;
        }
        for (int i = 59; i < 69; i++) {
            monsterId[i] = 12;
        }
        for (int i = 69; i < 79; i++) {
            monsterId[i] = 13;
        }
        for (int i = 79; i < 89; i++) {
            monsterId[i] = 14;
        }
        for (int i = 89; i < 100; i++) {
            monsterId[i] = 15;
        }

        //随机生成范围为[0,99]的数组下标
        Random rand = new Random();
        int randNumber =rand.nextInt(100);

        //随机选择野怪id
        return monsterId[randNumber];
    }

}
