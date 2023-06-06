import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useCookies } from "react-cookie";
import { Modal } from "../Modal";
import { CommentArea } from "./CommentArea";
import { Comment, FeedData, getAvatarURL, getComments, postComment } from "@/lib";

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

type CommentsProps = {
  feed: FeedData;
};

export function Comments({ feed }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cookies] = useCookies(["session"]);

  useEffect(() => {
    getComments(cookies.session, feed.id).then(setComments);
  }, [JSON.stringify(comments)]);

  const onSubmit = (comment: string) => {
    postComment(cookies.session, feed.id, comment).then((comment) => setComments([...comments, comment]));
  };

  return (
    <CommentContainer>
      {comments.length > 0 && (
        <Modal button={<Button>댓글 {comments.length}개 모두 보기</Button>}>
          <CommentList>
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard>
                  <CommentImage src={getAvatarURL(comment.username)} />
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
