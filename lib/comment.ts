export type Comment = {
  id: number;
  feed_id: number;
  username: string;
  content: string;
  created_at: string;
};

export function getComments(session: string, feed: string): Promise<any> {
  return fetch(`http://jhstudent.kro.kr/api/feeds/${feed}/comments`, {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}

export function postComment(session: string, feed: string, content: string): Promise<any> {
  return fetch(`http://jhstudent.kro.kr/api/feeds/${feed}/comments`, {
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
