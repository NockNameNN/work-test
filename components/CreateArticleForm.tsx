'use client'
import { useState } from 'react';
import { createArticle } from '@/http/articleAPI'; // импортируйте ваш файл API

const CreateArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createArticle(title, content, image);
      setSuccess(true);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (e) {
      setError('Ошибка при добавлении статьи');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded bg-slate-300 text-black">
      <h1 className="text-2xl font-bold mb-4">Добавить статью</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Статья успешно добавлена!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-black">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-black">
            Содержание
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-black">
            Изображение
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Добавить статью
        </button>
      </form>
    </div>
  );
};

export default CreateArticleForm;
