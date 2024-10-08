'use client'

import { useState } from 'react';
import { changePassword } from '@/http/userAPI';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await changePassword(oldPassword, newPassword, confirmedPassword);
      if (response.Success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data || 'Ошибка изменения пароля');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Изменение пароля</h1>
      {error && <div className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

      {success && <div className="text-green-500">Пароль успешно изменён!</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Старый пароль:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="input text-black"
          />
        </div>
        <div>
          <label className="block">Новый пароль:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input text-black"
          />
        </div>
        <div>
          <label className="block">Подтверждение нового пароля:</label>
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            className="input text-black"
          />
        </div>
        <button type="submit" className="btn">
          Изменить пароль
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
