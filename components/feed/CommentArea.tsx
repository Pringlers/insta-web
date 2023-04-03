import { useState } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0;

  border: none;
  outline: none;

  resize: none;

  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #333;
  }
`;

const PostButton = styled.button`
  width: 4rem;
  padding: 0;

  border: none;
  outline: none;
  cursor: pointer;

  font-weight: bold;
  font-size: 14px;

  color: rgb(105, 165, 245);
  background-color: transparent;

  &:disabled {
    cursor: not-allowed;
    color: rgba(105, 165, 245, 0.5);
  }
`;

export function CommentArea({ onSubmit }: { onSubmit: (comment: string) => void }) {
  const [content, setContent] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = () => {
    if (content?.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <Wrapper>
      <TextArea rows={1} placeholder="댓글 달기..." value={content ?? ""} onChange={handleChange} />
      <PostButton disabled={!content} onClick={handleSubmit}>
        게시
      </PostButton>
    </Wrapper>
  );
}
