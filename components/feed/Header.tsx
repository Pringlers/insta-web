import styled from "@emotion/styled";
import { RiDeleteBin6Line as RecycleBin } from "react-icons/ri";
import { getAvatarURL } from "@/lib";

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

const DeleteButton = styled.button`
  color: red;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export function Header({ username }: { username: string }) {
  return (
    <HeaderWrapper>
      <UserWrapper>
        <UserAvatar src={getAvatarURL(username)} />
        <Username>{username}</Username>
      </UserWrapper>
      <DeleteButton>
        <RecycleBin size={20} />
      </DeleteButton>
    </HeaderWrapper>
  );
}
