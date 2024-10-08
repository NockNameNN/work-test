'use client'
import { useRouter, usePathname } from "next/navigation";

interface CommentProps {
  id: string,
  author: {
    username: string
  },
  content: string,
  children: CommentProps[],
  handleReplay: (commentId: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ id, author, content, children, handleReplay }) => {
  const router = useRouter();
  const url = usePathname()
  return (
    <div className='border-b-2 border-gray-300 pb-2 mb-2'>
      <p className='font-semibold'>{author.username}</p>
      <p onClick={() => {router.push(`${url}/comments/${id}`)}}>{content}</p>
      <button onClick={() => {handleReplay(id)}}>Ответить</button>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;