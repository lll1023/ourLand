package ruangong.our_land.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ruangong.our_land.model.ResultInfo;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 15:06
 * @describe:
 */
@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {

    /**
     * 用于form-data
     * @param e
     * @return
     */
    @ExceptionHandler(BindException.class)
    public ResultInfo bindExceptionHandler(BindException e){
        HashMap<String, String> map = new HashMap<>();
        List<FieldError> fieldErrors = e.getFieldErrors();
        for (FieldError fieldError:fieldErrors){
            map.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        return ResultInfo.error(map);
    }

    /**
     * 用于json
     * @param e
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResultInfo methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e){
        BindingResult result = e.getBindingResult();
        HashMap<String, String> map = new HashMap<>();
        List<FieldError> fieldErrors = result.getFieldErrors();
        for (FieldError fieldError:fieldErrors){
            map.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        return ResultInfo.error(map);
    }

    /**
     * 用于Get参数
     * @param e
     * @return
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResultInfo constraintViolationExceptionHandler(ConstraintViolationException  e){
        Set<ConstraintViolation<?>> set = e.getConstraintViolations();
        HashMap<String, String> map = new HashMap<>();
        for (ConstraintViolation violation:set){
            String path = violation.getPropertyPath().toString();
            map.put(path.substring(path.lastIndexOf(".")+1),violation.getMessage());
        }
        return ResultInfo.error(map);
    }

    /**
     * 未知错误
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    public ResultInfo exceptionHandler(Exception  e){
        return ResultInfo.error(500,"系统未知错误");
    }
}
