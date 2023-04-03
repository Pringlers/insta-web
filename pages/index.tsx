import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { FileUpload } from "@/components/PostForm";
import { Feed } from "@/components/feed/Feed";
import { useCookies } from "react-cookie";

const Container = styled.div`
  max-width: 1000px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostList = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 30px;

  list-style: none;
`;

export default function Home() {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);
  const [posts, setPosts] = useState<Feed[]>([]);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8000/posts", {
      headers: {
        Authentication: cookies.token,
      },
    })
      .then((res) => res.json())
      .then((posts: Feed[]) =>
        posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      )
      .then(setPosts);
  }, [JSON.stringify(posts)]);

  return (
    <Container>
      <FileUpload />
      <PostList>
        {posts.map((feed) => (
          <li key={feed.id}>
            <Feed feed={feed} />
          </li>
        ))}
      </PostList>
    </Container>
  );
}
