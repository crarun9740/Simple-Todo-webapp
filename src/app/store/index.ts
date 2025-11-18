import { todoReducer } from './todo/todo.reducer';
import { authReducer } from './auth/auth.reducer';
import { TodoEffects } from './todo/todo.effects';
import { AuthEffects } from './auth/auth.effects';

/**
 * App Store Configuration
 * Defines all reducers and effects for the app store
 */

export const reducers = {
  todo: todoReducer,
  auth: authReducer,
};

export const effects = [TodoEffects, AuthEffects];
