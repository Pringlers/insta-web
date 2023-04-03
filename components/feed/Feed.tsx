import Carousel from "../Carousel";
import { Caption } from "./Caption";
import { Header } from "./Header";
import { Comments } from "./Comments";

export type Feed = {
  id: number;
  user: { name: string; avatar: string };
  caption: string;
  images: string[];
  created_at: string;
};

export function Feed({ feed }: { feed: Feed }) {
  return (
    <div style={{ width: 500 }}>
      <Header user={feed.user} />
      <Carousel images={feed.images} />
      <Caption username={feed.user.name} caption={feed.caption} />
      <Comments feed={feed} />
    </div>
  );
}
