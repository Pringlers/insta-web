import styled from "@emotion/styled";

const Text = styled.p`
  padding: 8px;
  font-size: 14px;
`;

const Username = styled.span`
  font-weight: bold;
`;

export function Caption({ username, caption }: { username: string; caption: string }) {
  return (
    <Text>
      <Username>{username}</Username> {caption}
    </Text>
  );
}
