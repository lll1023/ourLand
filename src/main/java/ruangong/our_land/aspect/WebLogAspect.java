package ruangong.our_land.aspect;

import com.google.gson.Gson;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 10:57
 * @describe:
 */
@Aspect
@Component
public class WebLogAspect {
    private static Logger logger = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("@annotation(ruangong.our_land.aspect.WebLog)")
    public void doWebLog(){
    }

    @Before("doWebLog()")
    public void before(JoinPoint joinPoint) throws ClassNotFoundException {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        //注解描述信息
        String description = getAspectLogDescription(joinPoint);
        logger.info("====================start=================");
        logger.info("URL         :{}",request.getRequestURL().toString());
        logger.info("Description             :{}",description);
        logger.info("HTTP Method    :{}",request.getMethod());
        logger.info("Class Method  :{}.{}",joinPoint.getSignature().getDeclaringTypeName(),joinPoint.getSignature().getName());
        logger.info("IP    :{}",request.getRemoteAddr());
        logger.info("Request Arags:    {}",new Gson().toJson(joinPoint.getArgs()));
    }

    @After("doWebLog()")
    public void after(){
        logger.info("===============end====================");
    }

    @Around("doWebLog()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object result = proceedingJoinPoint.proceed();
        return result;
    }

    public String getAspectLogDescription(JoinPoint joinPoint) throws ClassNotFoundException {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        Class<?> target = Class.forName(targetName);
        Method[] methods = target.getMethods();
        StringBuilder builder = new StringBuilder();
        for (Method method:methods){
            if (method.getName().equals(methodName)){
                Class<?>[] parameterTypes = method.getParameterTypes();
                if (parameterTypes.length==args.length){
                    builder.append(method.getAnnotation(WebLog.class).message());
                    break;
                }
            }
        }
        return builder.toString();
    }

    @AfterReturning(pointcut = "doWebLog()",returning = "result")
    public void afterReturning(JoinPoint joinPoint,Object result){
        logger.info("Response Args:      {}",new Gson().toJson(result));
    }

    @AfterThrowing(pointcut = "doWebLog()",throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint,Exception exception){
        logger.info("Exception e:      {}",exception.getMessage());
    }
}
