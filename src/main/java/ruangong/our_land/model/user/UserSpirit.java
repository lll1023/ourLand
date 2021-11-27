package ruangong.our_land.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 用户-精灵类
 * @Author hwy
 * @Date 2021/11/25
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSpirit {

    /** 用户id */
    @NotNull
    private Integer u_id;

    /** 精灵id */
    @NotNull
    private Integer s_id;

}
