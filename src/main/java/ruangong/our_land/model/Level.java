package ruangong.our_land.model;

import lombok.Data;
import ruangong.our_land.model.spirit.boss.Boss;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.beans.Transient;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:06
 * @describe:
 */
@Data
public class Level {
    @Min(value = 1,message = "最小值为1")
    private int l_id;

    private Integer l_boss;

    @Size(max = 255,message = "长度不能超过255")
    private String l_story;
}
