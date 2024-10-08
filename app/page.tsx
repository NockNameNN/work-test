'use client'
import { useEffect, useState } from 'react';
import { getArticles } from '@/http/articleAPI';
import CreateArticleForm from '@/components/CreateArticleForm';
import { useRouter } from 'next/navigation';

interface Author {
  id: number;
  username: string;
  email: string;
}

interface Article {
  id: number;
  author: Author;
  title: string;
  slug: string;
  content: string;
  created: string;
  updated: string;
  image: string;
}

export default function Home () {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getArticles()
      .then(data => setArticles(data))
      .catch(error => console.error('Ошибка при загрузке статей: ', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      <button
        className='my-5 border-2 p-2'
        onClick={() => {setIsOpenModal(!isOpenModal)}}>
          Создать статью
      </button>
      {isOpenModal && <CreateArticleForm />}
      <h1 className="text-2xl font-bold mb-6">Статьи</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        articles.length > 0 ? (
          articles.map((article) => (
            <div 
              key={article.id} 
              className="mb-8 p-4 border rounded-lg shadow-lg cursor-pointer"
              onClick={() => {router.push(`${article.id}`)}}
            >
              <img src={article.image} alt={article.title} className="w-full h-64 object-cover mb-4 rounded-lg"/>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600">Автор: {article.author.username}</p>
              <p className="text-gray-500 text-sm mb-4">Создано: {new Date(article.created).toLocaleDateString()}</p>
              <p className="text-gray-700">{article.content}</p>
            </div>
          ))
        ) : (
          <p>Статей не найдено.</p>
        )
      )}
    </div>
  );
};
