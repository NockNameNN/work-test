import { login, logout } from '../slices/userSlice';
import { AppDispatch } from '../store';

export const loginUser = (credentials: { user_id: string }) => (dispatch: AppDispatch) => {
  dispatch(login({ user_id: credentials.user_id }));
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  localStorage.removeItem('token');
};
