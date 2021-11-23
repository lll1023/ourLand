package ruangong.our_land.model.prop;

public class Prop {
    //道具类型
    int type;        //序号不同代表不同的道具  0:精灵球  1:血包  2:pp
    int sub_type;    //序号不同代表不同的功能
    String prop_name;   //分别为 精灵球,血包,pp
    String effect;
    String description;     //功能介绍
    float capture_rate= (float) 0.2;    //基础精灵球捕捉率,不同的精灵球有不同的捕捉率
}
