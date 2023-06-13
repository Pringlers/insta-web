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

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const Role = styled.p`
  font-size: 14px;
  color: #333;
`;

type AccountProps = {
  username: string;
};

export function Account({ username }: AccountProps) {
  return (
    <Wrapper>
      <Avatar src={getAvatarURL(username)} />
      <Details>
        <Username>{username}</Username>
        <Role>정현고등학교 학생</Role>
      </Details>
    </Wrapper>
  );
}
