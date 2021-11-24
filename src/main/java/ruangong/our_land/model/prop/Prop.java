package ruangong.our_land.model.prop;
/**
 * @Author:FengBoChang
 * @Description:道具类
 * @Date: Created in 2021-11-23
 */
public class Prop {
    //道具类型
    int type;        //序号不同代表不同的道具  0:精灵球  1:血包  2:pp
    int sub_type;    //序号不同代表不同的功能
    String prop_name;   //分别为 精灵球,血包,pp
    String effect;
    String description;     //功能介绍
    float capture_rate= (float) 0.2;    //基础精灵球捕捉率,不同的精灵球有不同的捕捉率

    public Prop(int type, int sub_type, float capture_rate){

        if(type==0){
            this.prop_name="精灵球";
            if(sub_type == 0) {
                this.description="高级球:有一定机率捕捉到精灵";
                this.capture_rate = capture_rate;
                this.effect="20%捕捉率";
            }else if(sub_type==1){
                this.description="超级球:有1.5倍机率捕捉到精灵";
                this.capture_rate = (float) (1.5*capture_rate);
                this.effect="30%的捕捉率";
            }else if(sub_type==2){
                this.description="溜溜球:有2倍机率捕捉到精灵";
                this.capture_rate = (float) (2*capture_rate);
                this.effect="40%的捕捉率";
            }
        }

    }

}
