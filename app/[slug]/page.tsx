'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getArticleById, updateArticle, deleteArticle, getCommentsByArticleId, createComment } from '@/http/articleAPI'; 
import { useAppSelector } from '@/redux-toolkit/hooks';
import { selectUserId } from '@/redux-toolkit/slices/userSlice';
import CommentItem from '@/components/CommentItem';
import Image from 'next/image';

const Article = () => {
  const id = usePathname();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [comment, setComment] = useState<string>('');
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userID = useAppSelector(selectUserId);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await getArticleById(id);
          const commentsData = await getCommentsByArticleId(id);
          setComments(commentsData);

          setArticle(data);
          setTitle(data.title);
          setContent(data.content);
          setImage(data.image || null); 
        } catch {
          setError('Ошибка загрузки статьи');
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await updateArticle(id, title, content, image);
      setArticle({ ...article, title, content, image });
      setIsEditing(false);
    } catch {
      setError('Ошибка при изменении статьи');
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteArticle(id);
      router.push('/');
    } catch {
      setError('Ошибка при удалении статьи');
    }
  };

  const handleReply = (commentId: string) => {
    setParentCommentId(commentId);
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await createComment(id, comment, parentCommentId)
    setComment('');
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) return <p>Загрузка статьи...</p>;

  const isAuthor = article.author.id === userID;

  return (
    <div>
      <h1 className='text-[25px] font-bold'>{article.title}</h1>
      <p>Автор: {article.author.username}</p>
      <Image src={article.image} alt={article.title} width={500} height={500}/>
      <p>{article.content}</p>
      
      {isAuthor && !isEditing && (
        <>
          <button onClick={handleEdit} className='border-2 p-2 mt-5'>Отредактировать статью</button>
          <button onClick={handleDelete} className='border-2 p-2 mt-5 ml-2'>Удалить статью</button>
        </>
      )}

      {isAuthor && isEditing && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Заголовок</label>
            <input
              type="text"
              className='text-black'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Содержание</label>
            <textarea
              className='text-black'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Изображение</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button type="submit" className='border-2 p-2 mt-2'>Сохранить изменения</button>
          <button onClick={handleEdit}  className='border-2 p-2 mt-2 ml-10'>Отмена</button>
        </form>
      )}

<h2 className='mt-10 text-xl font-bold'>Комментарии</h2>
      <form action="submit">
        <textarea
          maxLength={150}
          className='text-black w-64'
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={handleCreateComment}>Оставить комментарий</button>
        {parentCommentId && <button onClick={() => {setParentCommentId(null)}}>Убрать привязку к комментарию</button>}        
      </form>
      {comments.length === 0 && <p>Нет комментариев.</p>}
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id} 
          username={comment.username} 
          content={comment.content} 
          children={comment.children} 
          handleReplay={handleReply}
        />
      ))}
    </div>
  );
};

export default Article;
