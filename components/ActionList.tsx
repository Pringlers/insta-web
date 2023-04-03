import styled from "@emotion/styled";
import { IoHeartOutline, IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";

const FlexBox = styled.div`
  display: flex;
  gap: 14px;
  font-size: 28px;
`;

export function ActionList() {
  return (
    <FlexBox>
      <IoHeartOutline />
      <IoChatbubbleOutline />
      <IoPaperPlaneOutline />
    </FlexBox>
  );
}
