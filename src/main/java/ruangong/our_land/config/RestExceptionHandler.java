package ruangong.our_land.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ruangong.our_land.model.ResultInfo;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 15:06
 * @describe:
 */
@RestControllerAdvice
@Slf4j
public class RestExceptionHandler {

    /**
     * 用于form-data
     * @param e
     * @return
     */
    @ExceptionHandler(BindException.class)
    public ResultInfo bindExceptionHandler(BindException e){
        String error=e.getFieldError().getDefaultMessage();
        log.warn("参数错误：{}",error);
        return ResultInfo.error(error);
    }

    /**
     * 用于json
     * @param e
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResultInfo methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e){
        String error=e.getFieldError().getDefaultMessage();
        log.warn("参数错误：{}",error);
        return ResultInfo.error(error);
    }

    /**
     * 用于Get参数
     * @param e
     * @return
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResultInfo constraintViolationExceptionHandler(ConstraintViolationException  e){
        String error="";
        System.out.println(e.getMessage());
        for (ConstraintViolation violation:e.getConstraintViolations()){
            error=violation.getMessage();
            break;
        }
        log.warn("参数错误：{}",error);
        return ResultInfo.error(error);
    }

    /**
     * 用于请求的method是否正确
     * @param e
     * @return
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResultInfo httpRequestMethodNotSupportedExceptionHandler(HttpRequestMethodNotSupportedException e){
        String error = e.getMessage();
        log.warn("method错误：{}",error);
        return ResultInfo.error(error);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResultInfo MissingServletRequestParameterExceptionHandler(MissingServletRequestParameterException e){
        String error = e.getMessage();
        log.warn("参数错误：{}",error);
        return ResultInfo.error(error);
    }

    /**
     * 未知错误
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    public ResultInfo exceptionHandler(Exception  e){
        e.printStackTrace();
        return ResultInfo.error(500,"系统未知错误");
    }
}
