package ruangong.our_land.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 用户-道具类
 * @Author hwy
 * @Date 2021/11/25
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProp {

    /** 用户id */
    @NotNull
    private Integer u_id;

    /** 道具id */
    private Integer p_id;

    /** 道具数量 */
    private Integer p_num;

}
