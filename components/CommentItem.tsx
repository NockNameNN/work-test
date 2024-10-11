'use client'
import { deleteComment, updateComment } from "@/http/commentAPI";
import { useAppSelector } from "@/redux-toolkit/hooks";
import { selectUserId } from "@/redux-toolkit/slices/userSlice";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CommentProps {
  id: string,
  author: {
    username: string,
    id: string,
  },
  content: string,
  children: CommentProps[],
  handleReplay: (commentId: string) => void;
  loadArticle: (id: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ id, author, content, children, handleReplay, loadArticle }) => {
  const articleId = usePathname();
  const userID = useAppSelector(selectUserId);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loadArticle(articleId);

    try {
      await updateComment(articleId, id, newContent);
      setIsEditing(false);
    } catch {
      setError('Ошибка при изменении комментария');
    }
  };

  const handleDelete = async () => {
    setError(null);
    loadArticle(articleId);
    try {
      await deleteComment(articleId, id);
    } catch {
      setError('Ошибка при удалении комментария');
    }
  };

  const isAuthor = userID === author.id;

  return (
    <div className='border-b-2 border-gray-300 pb-2 mb-2'>
      {error && <p>{error}</p>}
      <p className='font-semibold'>{author.username}</p>
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
        <p>{content}</p>
      )}
      <button onClick={() => {handleReplay(id)}}>Ответить</button>
      {isAuthor && 
        <>
          <button onClick={handleEdit}>Редактировать</button>
          <button onClick={handleDelete}>Удалить</button>
        </>
      }
      {children && children.length > 0 && (
        <div className='ml-4'>
          {children.map((childComment: CommentProps) => (
            <CommentItem
              key={childComment.id} 
              id={childComment.id} 
              author={childComment.author}
              content={childComment.content} 
              // eslint-disable-next-line react/no-children-prop
              children={childComment.children} 
              handleReplay={handleReplay}
              loadArticle={loadArticle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;