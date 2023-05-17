import styled from "@emotion/styled";
import { NotificationData } from "@/lib";

const Container = styled.div`
  padding: 14px 16px;
  background-color: #eee;
  border-radius: 14px;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Content = styled.p`
  word-wrap: break-word;
`;

export function Notification({ title, content }: NotificationData) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
}
