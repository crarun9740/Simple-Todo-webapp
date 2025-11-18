import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

/**
 * Auth Effects
 * Handles side effects for authentication
 */
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(() => {
        try {
          this.authService.login();
          return AuthActions.loginSuccess();
        } catch (error) {
          return AuthActions.loginFailure();
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.authService.logout();
        return AuthActions.logoutSuccess();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
