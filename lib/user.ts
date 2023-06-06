export type UserData = {
  id: number;
  username: string;
};

export function getSelfUser(session: string): Promise<UserData | null> {
  return fetch("http://jhstudent.kro.kr/api/users/@me", {
    headers: {
      Authentication: session,
    },
  }).then((res) => res.json());
}

export function getAvatarURL(username: string): string {
  return `http://jhstudent.kro.kr/api/users/avatar/${username}`;
}
