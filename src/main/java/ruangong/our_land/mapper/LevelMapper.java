package ruangong.our_land.mapper;

import org.apache.ibatis.annotations.Param;
import ruangong.our_land.model.Level;

/**
 * @Author: Lsutin
 * @Date: 2021/11/24 21:24
 * @describe:
 */
public interface LevelMapper {
    Level getLevel(@Param("l_id") int l_id);
}
