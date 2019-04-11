---
title: kill信号java捕捉
date: 2019-03-04 08:36:02
tags: review
categories: ["linux","java","kill"]
---


## kill常用


 * HUP     1    终端断线
 * INT     2    中断（同 Ctrl + C） 一般触发关闭钩子
 * QUIT    3    退出（同 Ctrl + \） java会将堆栈信息输出到标准输出
 * TERM   15    终止 一般触发关闭钩子
 * KILL    9    强制终止  kill -9 不会被忽略，无条件终止进程，该信号不会被进程所接受，信号会被直接发送到init 进程
 * CONT   18    继续（与STOP相反， fg/bg命令）
 * STOP   19    暂停（同 Ctrl + Z）


 >例如：kill -3 pid


```
package cn.ac.cenc.access.util.signal;

import sun.misc.Signal;
import sun.misc.SignalHandler;

import java.util.concurrent.TimeUnit;

/**
 * 描述:
 * 测试kill -n  信号的捕获与处理
 * kill -n
 * n为以下数字 1 ，2 ，3 ，15 ，9 ：
 *
 * ********
 * HUP     1    终端断线
 * INT     2    中断（同 Ctrl + C） 一般触发关闭钩子
 * QUIT    3    退出（同 Ctrl + \） java会将堆栈信息输出到标准输出
 * TERM   15    终止 一般触发关闭钩子
 * KILL    9    强制终止  kill -9 不会被忽略，无条件终止进程，该信号不会被进程所接受，信号会被直接发送到init 进程
 * CONT   18    继续（与STOP相反， fg/bg命令）
 * STOP   19    暂停（同 Ctrl + Z）
 *
 *
 * *********
 * @author huangzhe
 * @create 2019-04-11 15:16
 */
public class SignalTest implements SignalHandler {


    @Override
    public void handle(Signal signal) {
        System.out.println(signal.getName());
        System.out.println(signal.getNumber());
        //接受完信号可以选择关闭
        System.exit(0);
    }


    public static void main(String[] args) {
        Signal.handle(new Signal("INT"),new SignalTest());
        Signal.handle(new Signal("TERM"),new SignalTest());
         //被系统或者vm使用了
//        Signal.handle(new Signal("QUIT"),new SignalTest());
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
            System.out.println("关闭被回调了");
        }));

        while (true){
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}


```