import styled from "@emotion/styled";

const MessageContent = styled.p`
  padding: 10px;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 14px;
  color: white;
  background-color: rgb(66, 136, 247);
  border-radius: 15px;
`;

type MessageProps = {
  content: string;
};

export function SentMessage({ content }: MessageProps) {
  return <MessageContent>{content}</MessageContent>;
}
