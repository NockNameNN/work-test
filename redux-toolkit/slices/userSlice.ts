import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  id: string;
  isAuthenticated: boolean;
}

export const selectUserId = (state: RootState) => state.user.id;

const initialState: UserState = {
  id: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user_id: string }>) {
      state.isAuthenticated = true;
      state.id = action.payload.user_id;
    },
    logout(state) {
      state.id = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
