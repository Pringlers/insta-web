export type Account = { username: string; password: string };

export async function login({ username, password }: Account): Promise<string | null> {
  const response = await fetch("http://jhstudent.kro.kr/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.ok ? response.json() : null;
}

export async function createUser({ username, password }: Account): Promise<boolean> {
  const response = await fetch("http://jhstudent.kro.kr/api/users", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.ok;
}
