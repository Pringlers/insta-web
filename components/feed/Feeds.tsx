import styled from "@emotion/styled";
import { FeedData } from "@/lib";
import { Feed } from "./Feed";

const List = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 30px;

  list-style: none;
`;

type FeedsProps = {
  feeds: FeedData[];
};

export function Feeds({ feeds }: FeedsProps) {
  return (
    <List>
      {feeds.map((feed) => (
        <li key={feed.id}>
          <Feed feed={feed} />
        </li>
      ))}
    </List>
  );
}
