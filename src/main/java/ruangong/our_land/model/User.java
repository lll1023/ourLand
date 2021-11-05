package ruangong.our_land.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;

/**
 * @Author: LianWL
 * @Date: 2021/11/5 14:23
 * @Description: 用户类
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private int progress; //进度
    private String user_name;
    private String password;
    private String email;
    private ArrayList<Integer> spirits_bag; //精灵背包
    private ArrayList<Integer> props_bag; //道具背包
}
