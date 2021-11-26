package ruangong.our_land.model.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
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

    /** 用户id */
    @NotNull
    private Integer id;

    /** 用户名 */
    @NotNull
    private String user_name;

    /** 用户密码 */
    @NotNull
    private String password;

    /** 游戏进度 */
    @Min(value = 0)
    private Integer progress;

    /** 经验值 */
    @Min(value = 0)
    private Integer exp;

}
