package com.RideMe.Driver.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(1)
@Component
public class LoggingAspect {
    Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut(value = "execution(* com.RideMe.Driver.Repository..*(..))")
    public void forRepoLog(){}
    @Pointcut(value = "execution(* com.RideMe.Driver.Service..*(..))")
    public void forServiceLog(){}
    @Pointcut(value = "execution(* com.RideMe.Driver.Controller..*(..))")
    public void forControllerLog(){}
    @Pointcut(value = "forRepoLog()||forServiceLog()||forControllerLog()")
    public void forAllApp(){}
    @Before(value = "forAllApp()")
    public void beforMethod(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        log.info("====> Method Name is >> {}",methodName);
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            log.info("===> argument >> {}",arg);
        }
    }
}
