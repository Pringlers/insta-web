import { useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "../Modal";
import { CommentArea } from "./CommentArea";
import { Feed } from "./Feed";

type Comment = {
  id: number;
  feed_id: number;
  user: { name: string; avatar: string };
  content: string;
  created_at: string;
};

const CommentContainer = styled.div`
  padding: 0 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Button = styled.button`
  padding: 0;

  border: none;
  outline: none;
  cursor: pointer;

  font-size: 14px;
  color: #333;
  background-color: transparent;
`;

export function Comments({ feed }: { feed: Feed }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const onSubmit = (comment: string) => {
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        feed_id: feed.id,
        user: { name: "test", avatar: "" },
        content: comment,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <CommentContainer>
      <div>
        <Modal button={<Button>댓글 {comments.length}개 모두 보기</Button>}>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          ))}
        </Modal>
      </div>
      <CommentArea onSubmit={onSubmit} />
    </CommentContainer>
  );
}
