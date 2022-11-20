package com.ssafy.fly.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Configuration
@Aspect
public class LogConfig {
    private final Logger logger = LogManager.getLogger(LogConfig.class);

    // com.ssafy.fly.controller 이하 패키지의 모든 클래스 이하 모든 메서드에 적용
    @Pointcut("execution(* com.ssafy.fly.controller..*.*(..))")
    private void pointCut() {}

    // 메서드 호출 전에 적용
    @Before("pointCut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        logger.info("=============== REQUEST ===============");
        logger.info("[CLIENT's TOKEN] {}", request.getHeader("Authorization"));
        logger.info("  [REQUEST PATH] {} - {}", request.getMethod(), request.getRequestURI());
        logger.info("[REQUEST PARAMS] {}", this.params(joinPoint));
    }

    // 메서드 리턴 후에 적용
    @AfterReturning(value = "pointCut()", returning = "response")
    public void afterReturnLog(JoinPoint joinPoint, Object response) {
        logger.info("=============== RESPONSE ===============");
        logger.info("[RESPONSE] {}", response);
    }

    @AfterThrowing(value = "pointCut()", throwing = "exception")
    public void afterThrowingLog(JoinPoint joinPoint, Throwable exception) {
        logger.info("=============== EXCEPTION ===============");
        logger.error("[ERR MESSAGE] - {}", exception.getMessage());
    }

    private Map<String, Object> params(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        return params;
    }
}
