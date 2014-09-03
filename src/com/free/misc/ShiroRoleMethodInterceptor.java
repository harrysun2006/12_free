package com.free.misc;

import org.apache.shiro.aop.AnnotationResolver;
import org.apache.shiro.authz.aop.AuthorizingAnnotationMethodInterceptor;

import com.free.annotation.RequiresRoles;

public class ShiroRoleMethodInterceptor extends AuthorizingAnnotationMethodInterceptor {

  /**
   * Default no-argument constructor that ensures this interceptor looks for
   * {@link RequiresRoles RequiresRoles} annotations in a method declaration.
   */
  public ShiroRoleMethodInterceptor() {
    super(new ShiroRoleAnnotationHandler());
  }

  /**
   * @param resolver
   * @since 1.1
   */
  public ShiroRoleMethodInterceptor(AnnotationResolver resolver) {
    super(new ShiroRoleAnnotationHandler(), resolver);
  }
}