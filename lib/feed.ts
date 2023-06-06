export type FeedData = {
  id: string;
  username: string;
  caption: string;
  image_count: number;
  created_at: string;
};

export function getFeeds(session: string): Promise<FeedData[]> {
  return fetch("http://jhstudent.kro.kr/api/feeds", {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}

export function getFeedImage(feed: string, index: number): string {
  return `http://jhstudent.kro.kr/api/feeds/${feed}/img/${index}`;
}
