'use client'
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux-toolkit/hooks';
import { check } from '@/http/userAPI';
import { login } from '@/redux-toolkit/slices/userSlice';

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      if (data) {
        dispatch(login({user_id: data.user_id}))
      }
    }).
    finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      {loading ? <div>Загрузка</div> : children}
    </>
  );
};

export default UserProvider;
