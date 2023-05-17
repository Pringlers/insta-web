import { getAvatarURL } from "@/lib";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Username = styled.p`
  font-size: 18px;
`;

type AccountProps = {
  username: string;
};

export function Account({ username }: AccountProps) {
  return (
    <Wrapper>
      <Avatar src={getAvatarURL(username)} />
      <Username>{username}</Username>
    </Wrapper>
  );
}
