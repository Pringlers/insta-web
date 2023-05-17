import styled from "@emotion/styled";

import Carousel from "../Carousel";
import { Caption } from "./Caption";
import { Header } from "./Header";
import { Comments } from "./Comments";
import { FeedData } from "@/lib";

const FeedWrapper = styled.div`
  width: 500px;
`;

const ImageWrapper = styled.div`
  padding: 0 8px;
`;

export function Feed({ feed }: { feed: FeedData }) {
  const images = Array.from(
    { length: feed.image_count },
    (_, index) => `http://localhost:8000/feeds/${feed.id}/img/${index}`
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
