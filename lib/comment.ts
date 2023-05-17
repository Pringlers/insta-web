export type Comment = {
  id: number;
  feed_id: number;
  username: string;
  content: string;
  created_at: string;
};

export function getComments(session: string, feed: number): Promise<any> {
  return fetch(`http://localhost:8000/feeds/${feed}/comments`, {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}

export function postComment(session: string, feed: number, content: string): Promise<any> {
  return fetch(`http://localhost:8000/feeds/${feed}/comments`, {
    method: "POST",
    headers: {
      Authentication: session,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  }).then((res) => res.json());
}
