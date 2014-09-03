package com.free.misc;

import java.lang.annotation.Annotation;
import java.util.Arrays;

import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.aop.AuthorizingAnnotationHandler;

import com.free.annotation.RequiresRoles;
import com.free.zf.dto.Access.Role;

public class ShiroRoleAnnotationHandler extends AuthorizingAnnotationHandler {

  /**
   * Default no-argument constructor that ensures this handler looks for
   * {@link com.free.annotation.RequiresRoles RequiresRoles} annotations.
   */
  public ShiroRoleAnnotationHandler() {
    super(RequiresRoles.class);
  }

  /**
   * Ensures that the calling <code>Subject</code> has the Annotation's
   * specified roles, and if not, throws an <code>AuthorizingException</code>
   * indicating that access is denied.
   * 
   * @param a
   *          the RequiresRoles annotation to use to check for one or more roles
   * @throws org.apache.shiro.authz.AuthorizationException
   *           if the calling <code>Subject</code> does not have the role(s)
   *           necessary to proceed.
   */
  public void assertAuthorized(Annotation a) throws AuthorizationException {
    if (!(a instanceof RequiresRoles))
      return;

    RequiresRoles rrAnnotation = (RequiresRoles) a;
    Role[] roles = rrAnnotation.value();
    int i;

    if (roles.length == 1) {
      getSubject().checkRole(roles[0].name());
      return;
    }
    if (Logical.AND.equals(rrAnnotation.logical())) {
      String[] rs = new String[roles.length];
      for (i = 0; i < roles.length; i++)
        rs[i] = roles[i].name();
      getSubject().checkRoles(Arrays.asList(rs));
      return;
    }
    if (Logical.OR.equals(rrAnnotation.logical())) {
      // Avoid processing exceptions unnecessarily - "delay" throwing the
      // exception by calling hasRole first
      boolean hasAtLeastOneRole = false;
      for (Role role : roles)
        if (getSubject().hasRole(role.name()))
          hasAtLeastOneRole = true;
      // Cause the exception if none of the role match, note that the
      // exception
      // message will be a bit misleading
      if (!hasAtLeastOneRole)
        getSubject().checkRole(roles[0].name());
    }
  }

}
