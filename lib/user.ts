export type UserData = {
  id: number;
  username: string;
};

export function getSelfUser(session: string): Promise<UserData | null> {
  return fetch("http://localhost:8000/users/@me", {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}

export function getAvatarURL(username: string): string {
  return `http://localhost:8000/users/avatar/${username}`;
}
