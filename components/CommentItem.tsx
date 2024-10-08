'use client'
import { useRouter, usePathname } from "next/navigation";

interface CommentProps {
  id: string,
  username: string,
  content: string,
  children: CommentProps[],
  handleReplay: (commentId: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ id, username, content, children, handleReplay }) => {
  const router = useRouter();
  const url = usePathname()

  return (
    <div className='border-b-2 border-gray-300 pb-2 mb-2'>
      <p className='font-semibold'>{username}</p>
      <p onClick={() => {router.push(`${url}/comments/${id}`)}}>{content}</p>
      <button onClick={() => {handleReplay(id)}}>Ответить</button>
      {children && children.length > 0 && (
        <div className='ml-4'>
          {children.map((childComment: CommentProps) => (
            <CommentItem
              key={childComment.id} 
              id={childComment.id} 
              username={childComment.username} 
              content={childComment.content} 
              children={childComment.children} 
              handleReplay={handleReplay}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;