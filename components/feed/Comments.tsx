import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "../Modal";
import { CommentArea } from "./CommentArea";
import { Feed } from "./Feed";
import { useCookies } from "react-cookie";

type Comment = {
  id: number;
  feed_id: number;
  username: string;
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
  const [cookies] = useCookies(["session"]);

  useEffect(() => {
    fetch(`http://localhost:8000/feeds/${feed.id}/comments`, {
      headers: {
        Authentication: cookies.session,
      },
    })
      .then((res) => res.json())
      .then(setComments);
  }, [JSON.stringify(comments)]);

  const onSubmit = (comment: string) => {
    fetch(`http://localhost:8000/feeds/${feed.id}/comments`, {
      method: "POST",
      headers: {
        Authentication: cookies.session,
      },
      body: JSON.stringify({ content: comment }),
    })
      .then((res) => res.json())
      .then((comment) => setComments([...comments, comment]));
  };

  return (
    <CommentContainer>
      {comments.length > 0 && (
        <Modal button={<Button>댓글 {comments.length}개 모두 보기</Button>}>
          <CommentList>
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard>
                  <CommentImage src={`http://localhost:8000/avatar/${comment.username}`} />
                  <CommentContentWrapper>
                    <p>
                      <b>{comment.username}</b>
                    </p>
                    <p>{comment.content}</p>
                  </CommentContentWrapper>
                </CommentCard>
              </li>
            ))}
          </CommentList>
        </Modal>
      )}
      <CommentArea onSubmit={onSubmit} />
    </CommentContainer>
  );
}

const CommentList = styled.ul`
  padding: 0;

  width: 40vw;
  height: 50vh;

  display: flex;
  flex-direction: column;
  gap: 16px;

  list-style: none;
`;

const CommentCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  font-size: 12px;
`;

const CommentImage = styled.img`
  width: 32px;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
