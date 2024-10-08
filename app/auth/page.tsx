'use client'
import { useState, FormEvent } from 'react';
import { login, registration } from '@/http/userAPI';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (isLogin) {
        await login(username, password);
        alert('Успешная авторизация')
      } else {
        await registration(username, firstName, lastName, email, password);
        alert('Успешная регистрация, авторизуйтесь')
      }

    } catch (error: any) {
      alert(`Ошибка`);
      console.error(e);
    }
  };

  return (
    <div className="flex container mx-auto p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? 'Логин' : 'Регистрация'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {!isLogin && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </>
          )}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isLogin ? 'Логин' : 'Регистрация'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-blue-500 hover:underline text-sm mt-4"
        >
          {isLogin ? 'Нет аккаунта? Зарегистрируйся!' : 'Есть аккаунт? Войди!'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
