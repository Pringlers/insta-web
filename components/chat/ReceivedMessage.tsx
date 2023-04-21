import styled from "@emotion/styled";

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const UserAvatar = styled.img`
  width: 25px;
  height: 25px;

  border-radius: 50%;
`;

const MessageContent = styled.p`
  padding: 10px;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 14px;
  background-color: white;
  border-radius: 15px;
`;

type MessageProps = {
  avatar: string;
  content: string;
};

export function ReceivedMessage({ avatar, content }: MessageProps) {
  return (
    <MessageWrapper>
      <UserAvatar src={avatar} alt="user avatar" />
      <MessageContent>{content}</MessageContent>
    </MessageWrapper>
  );
}
