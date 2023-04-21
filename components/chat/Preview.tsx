import styled from "@emotion/styled";

import { ReceivedMessage } from "./ReceivedMessage";
import { SentMessage } from "./SentMessage";

const Header = styled.div`
  position: absolute;
  width: 100%;
  height: var(--header-height);
  color: white;
  background-color: #222;
`;

const MessageList = styled.ul`
  margin: 0;
  padding: 24px;
  padding-top: calc(var(--header-height) + 24px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  background-color: #eee;
`;

type MessageProps = { self: boolean };

const Message = styled.li`
  max-width: 100%;
  display: flex;
  justify-content: ${(props: MessageProps) => (props.self ? "flex-end" : "flex-start")};
`;

const MessageContent = styled.div`
  max-width: 60%;
`;

function Wrapper({ self, children }: MessageProps & { children: React.ReactNode }) {
  return (
    <Message self={self}>
      <MessageContent>{children}</MessageContent>
    </Message>
  );
}

export function Preview() {
  const messages = [
    // {
    //   user: 1,
    //   avatar: "https://github.com/vercel.png",
    //   content:
    //     "…‘Beauty is in the eye of the beholder.’ 사랑하는 사람은 뭐든지 다 예뻐 보인다는 말인데, 마케팅에서 성공한 디자인은 다 예뻐 보이는 법이지요. —폴 랜드(Paul Rand)",
    // },
    // {
    //   user: 2,
    //   avatar: "https://github.com/vercel.png",
    //   content:
    //     "Number of pages: 300, Number of photographs: 450, Photographer: Andrew Zuckerman, Introduction: Jony Ive, Book language: English, Book insert: Translated into selected languages, Two sizes: 260x324mm and 330x413mm, ISBN numbers: 978-0-9975138-1-3 and 978-0-9975138-0-6, Release date: November 2016",
    // },
    {
      user: 1,
      avatar: "https://github.com/vercel.png",
      content:
        "“Designed by Apple In California” chronicles 20 years of Apple design through 450 photographs of our products and the processes used to make them. A visual history spanning iMac to Apple Pencil, complete with descriptions of innovative materials and techniques, it captures every detail with honesty and intention. Printed on specially milled German paper with gilded matt silver edges, using eight colour separations and low-ghost inks, this hardback volume took more than eight years to create and has been crafted with as much care and attention as the products featured within. It is both a testament and a tribute to the meticulous design, engineering and manufacturing methods that are singularly Apple.",
    },
    {
      user: 2,
      avatar: "https://github.com/vercel.png",
      content:
        "Be modern, collectors, museums. If you have old paintings, do not despair. Keep your memories but divert them so that they correspond to your times. Why reject the old if you can modernize it with a few brush strokes? That’ll throw a bit of the new onto your old culture. Be up to date and distinguished at the same time. Painting is over. You might as well finish it off. Detourn. Long live painting. —Asger Jorn",
    },
    {
      user: 1,
      avatar: "https://github.com/vercel.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  return (
    <div style={{ width: "80%", position: "relative" }}>
      <Header>Chat information goes here</Header>
      <MessageList>
        {messages.map((e, i) => (
          <Wrapper key={i} self={e.user === 2}>
            {e.user === 1 ? (
              <ReceivedMessage avatar={e.avatar} content={e.content} />
            ) : (
              <SentMessage content={e.content} />
            )}
          </Wrapper>
        ))}
      </MessageList>
    </div>
  );
}
