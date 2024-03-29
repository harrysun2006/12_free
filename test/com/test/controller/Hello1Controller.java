package com.test.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class Hello1Controller implements Controller {

  public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException,
      IOException {

    String aMessage = "Hello World Hello MVC!";
    ModelAndView mv = new ModelAndView("hello1");
    mv.addObject("message", aMessage);
    return mv;
  }
}