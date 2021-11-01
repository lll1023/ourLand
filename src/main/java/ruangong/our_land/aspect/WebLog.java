package ruangong.our_land.aspect;

import java.lang.annotation.*;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 10:56
 * @describe:
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Target(ElementType.METHOD)
public @interface WebLog {
    String message() default "";
}
