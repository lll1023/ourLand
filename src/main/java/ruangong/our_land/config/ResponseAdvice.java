package ruangong.our_land.config;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import ruangong.our_land.model.ResultInfo;

/**
 * @Author: Lsutin
 * @Date: 2021/11/1 15:04
 * @describe:
 */
@RestControllerAdvice
public class ResponseAdvice implements ResponseBodyAdvice<Object> {
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (body instanceof String){
            return ResultInfo.error((String) body);
        }
        if (body instanceof ResultInfo){
            return body;
        }
        return ResultInfo.success(body);
    }
}
