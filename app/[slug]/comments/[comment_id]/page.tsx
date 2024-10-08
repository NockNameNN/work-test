'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCommentById, updateComment, deleteComment } from '@/http/commentAPI';
import { useAppSelector } from '@/redux-toolkit/hooks';
import { selectUserId } from '@/redux-toolkit/slices/userSlice';

const CommentPage = () => {
  const router = useRouter();
  const {slug: articleId, comment_id: id} = useParams<{ slug: string; comment_id: string }>();
  const [comment, setComment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userID = useAppSelector(selectUserId);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getCommentById(articleId, id);
        setComment(data);
        setNewContent(data.content);
      } catch {
        setError('Ошибка загрузки комментария');
      }
    };
    fetchComment();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await updateComment(articleId, id, newContent);
      setSuccess(true);
      setComment({ ...comment, content: newContent });
      setIsEditing(false);
    } catch {
      setError('Ошибка при изменении комментария');
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteComment(articleId, id);
      router.push(`/`);
    } catch {
      setError('Ошибка при удалении комментария');
    }
  };

  if (error) return <p>{error}</p>;
  if (!comment) return <p>Загрузка комментария...</p>;

  const isAuthor = comment.author.id === userID;

  return (
    <div>
      <h2>Комментарий от {comment.author.username}</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border p-2 w-full text-black"
          />
          <button type="submit" className="p-2 mt-2 border">Сохранить</button>
          <button onClick={() => setIsEditing(false)} className="p-2 mt-2 ml-2 border">Отмена</button>
        </form>
      ) : (
        <p>{comment.content}</p>
      )}
      {isAuthor && !isEditing && (
        <>
          <button onClick={handleEdit} className="p-2 mt-4 border">Редактировать</button>
          <button onClick={handleDelete} className="p-2 mt-4 ml-2 border">Удалить</button>
        </>
      )}
      {success && <p className="text-green-500">Комментарий обновлён!</p>}
    </div>
  );
};

export default CommentPage;
