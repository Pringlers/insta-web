import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useCookies } from "react-cookie";
import { Account } from "@/components/Account";
import { Feeds } from "@/components/feed/Feeds";
import { Notifications } from "@/components/notification/Notifications";
import { UploadFeed } from "@/components/UploadFeed";
import { FeedData, UserData, getFeeds, getMeal, getSelfUser } from "@/lib";
import { Meal } from "@/components/Meal";

const Layout = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: white;

  margin: 60px 0;
`;

const FeedsContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserContainer = styled.div`
  width: 360px;

  display: flex;
  flex-direction: column;
`;

export default function Home({ meal }: { meal: string }) {
  const router = useRouter();
  const [cookies] = useCookies(["session"]);

  const [user, setUser] = useState<UserData | null>(null);
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    if (!cookies.session) {
      router.push("/login");
      return;
    }

    getSelfUser(cookies.session).then(setUser);

    getFeeds(cookies.session)
      .then((feeds) => feeds.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      .then(setFeeds);
  }, [JSON.stringify(feeds), JSON.stringify(user)]);

  const notifications = [
    {
      title: "정현고등학교",
      content: "6월 26일 (월) 1학기 2차 지필평가가 예정되어 있습니다.",
    },
    {
      title: "대학 진학 도우미",
      content: "6월 14일 (수) 오후 1시에 을지대학교 소개가 예정되어 있습니다.",
    },
    {
      title: "코딩공작소",
      content: "6월 14일 (수) 지난 주에 발표를 못한 학생은 발표 준비를 해주시기 바랍니다.",
    },
  ];

  return (
    <Layout>
      <FeedsContainer>
        <UploadFeed />
        <Feeds feeds={feeds} />
      </FeedsContainer>
      <UserContainer>
        {user && <Account username={user.username} />}
        <Meal meal={meal} />
        <Notifications notifications={notifications} />
      </UserContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  const meal = await getMeal();
  return { props: { meal } };
}
