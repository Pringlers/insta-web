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
      title: "30105 김민석",
      content: "뭐해? 자니??? 보고 싶어...",
    },
    {
      title: "윤희조 선생님",
      content: "창의 융합 신청이 오늘까지니 빠르게 신청해 주세요.",
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
        <Notifications notifications={notifications} />
        <Meal meal={meal} />
      </UserContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  const meal = await getMeal();
  return { props: { meal } };
}
