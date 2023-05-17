import { NotificationData } from "@/lib";
import styled from "@emotion/styled";
import { FaBell } from "react-icons/fa";
import { Notification } from "./Notification";

const Container = styled.div`
  margin: 24px 0;
`;

const List = styled.ul`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  list-style: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

const Item = styled.li`
  width: 100%;
`;

type NotificationsProps = {
  notifications: NotificationData[];
};

export const Notifications = ({ notifications }: NotificationsProps) => (
  <Container>
    <Header>
      <FaBell />
      <p>알림 센터</p>
    </Header>
    <List>
      {notifications.map((notification, index) => (
        <Item key={index}>
          <Notification {...notification} />
        </Item>
      ))}
    </List>
  </Container>
);
