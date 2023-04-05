import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  padding: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;
`;

const Username = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

export function Header({ username }: { username: string }) {
  const avatar = `http://localhost:8000/avatar/${username}`;

  return (
    <HeaderWrapper>
      <UserWrapper>
        <UserAvatar src={avatar} alt="user avatar" />
        <Username>{username}</Username>
      </UserWrapper>
      <div style={{ width: 12, height: 12, backgroundColor: "red" }}></div>
    </HeaderWrapper>
  );
}
