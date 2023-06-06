import styled from "@emotion/styled";
import { GiMeal } from "react-icons/gi";

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

export function Meal({ meal }: { meal: string }) {
  return (
    <div>
      <Header>
        <GiMeal />
        <p>오늘의 급식</p>
      </Header>
      <p>{meal}</p>
    </div>
  );
}
