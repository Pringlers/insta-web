export type FeedData = {
  id: number;
  username: string;
  caption: string;
  image_count: number;
  created_at: string;
};

export function getFeeds(session: string): Promise<FeedData[]> {
  return fetch("http://localhost:8000/feeds", {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}
