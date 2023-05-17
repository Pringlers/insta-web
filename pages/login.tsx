import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "@emotion/styled";
import { useCookies } from "react-cookie";
import instagram from "@/public/instagram.png";
import { login } from "@/lib/account";

const Container = styled.div`
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const FormWrapper = styled.form`
  padding: 64px 48px;
  border: 1px solid rgb(200, 200, 200);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 36px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 48px;
`;

const Input = styled.input`
  padding: 8px 16px;
  margin-bottom: 16px;

  border: 2px solid rgb(220, 220, 220);
  border-radius: 4px;

  font-size: 14px;
  color: #3f3f3f;
  background-color: rgba(250, 250, 250);

  &::placeholder {
    color: #a6a6a6;
  }

  &:focus {
    outline: none;
    border: 2px solid rgb(180, 180, 180);
  }
`;

const Button = styled.button`
  padding: 8px 0;
  margin-top: 16px;
  margin-bottom: 16px;

  border: none;
  border-radius: 4px;

  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #3897f0;

  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgb(57, 117, 234);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: #3897f0;
  }
`;

const RegisterLink = styled.a`
  font-size: 14px;
  color: #3897f0;

  &:visited {
    color: #3897f0;
  }
`;

export default function Login() {
  const router = useRouter();

  const [cookies, setCookies] = useCookies(["session"]);

  const [username, setUsername] = useState<string>("");
  const onUsernameChange = (e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);

  const [password, setPassword] = useState<string>("");
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  useEffect(() => {
    if (cookies.session) {
      router.push("/");
      return;
    }
  });

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const session = await login({ username, password });
    if (!session) {
      alert("올바르지 않은 계정입니다.");
      return;
    }

    setCookies("session", session, { path: "/" });
    router.push("/");
  };

  return (
    <Container>
      <Image src={instagram} alt="screenshot" width={300} />
      <FormWrapper>
        <Title>정현스타그램</Title>
        <Subtitle>로그인하기</Subtitle>
        <Input value={username ?? ""} type="text" placeholder="이름" onChange={onUsernameChange} />
        <Input value={password ?? ""} type="password" placeholder="비밀번호" onChange={onPasswordChange} />
        <Button onClick={onSubmit}>로그인</Button>
        <RegisterLink href="/new">새로운 계정 만들기</RegisterLink>
      </FormWrapper>
    </Container>
  );
}
