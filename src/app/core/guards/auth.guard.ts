import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const expectedRoles = route.data?.['roles'] as string[] | undefined;
  const currentUser = authService.getCurrentUser();
  
  console.log('[Guard]', { isLoggedIn, currentUser, expectedRoles });


  if (!isLoggedIn || !currentUser) {
    router.navigate(['/user/login']);
    return false;
  }

  if (expectedRoles && !expectedRoles.includes(currentUser.role)) {
    router.navigate(['/user/login']);
    return false;
  }

  return true;
};
