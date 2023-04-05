import styled from "@emotion/styled";

import Carousel from "../Carousel";
import { Caption } from "./Caption";
import { Header } from "./Header";
import { Comments } from "./Comments";

export type Feed = {
  id: number;
  username: string;
  caption: string;
  image_count: number;
  created_at: string;
};

const FeedWrapper = styled.div`
  width: 500px;
`;

const ImageWrapper = styled.div`
  padding: 0 8px;
`;

export function Feed({ feed }: { feed: Feed }) {
  const images = Array.from(
    { length: feed.image_count },
    (_, index) => `http://localhost:8000/images/${feed.id}/${index}`
  );

  return (
    <FeedWrapper>
      <Header username={feed.username} />
      <ImageWrapper>
        <Carousel images={images} />
      </ImageWrapper>
      <Caption username={feed.username} caption={feed.caption} />
      <Comments feed={feed} />
    </FeedWrapper>
  );
}
