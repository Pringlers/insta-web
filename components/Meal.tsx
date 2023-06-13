import styled from "@emotion/styled";
import { GiMeal } from "react-icons/gi";

const Container = styled.div`
  margin: 24px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

const Content = styled.p`
  white-space: pre;
`;

export function Meal({ meal }: { meal: string }) {
  return (
    <Container>
      <Header>
        <GiMeal />
        <p>오늘의 급식</p>
      </Header>
      <Content>{meal}</Content>
    </Container>
  );
}
