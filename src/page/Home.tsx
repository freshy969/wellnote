import { IconDots } from "@tabler/icons-react";
import {
  Button,
  Flex,
  Group,
  Menu,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Card, Grid } from "@mantine/core";
import {
  containsLinkInParagraph,
  getUniqueId,
  random,
} from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { useLiveQuery } from "dexie-react-hooks";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { db } from "../utils/dexie/config";
import { NavbarSearch } from "../components/NavBar/NavSearch";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import paper from "/src/paper.svg";

export function Bro({ type }: { type: string }) {
  const PAGE_SIZE = 12;
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const search = useBearStore((state: any) => state.search);
  const activeTagId = useBearStore((state: any) => state.activeTagId);
  const activeTab = useBearStore((state: any) => state.activeTab);

  const notes = useLiveQuery(
    () =>
      db.notes
        .filter((item) => !activeTagId || item.collectionId === activeTagId)
        .filter((note) => note.type === type)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .offset(offset)
        .limit(PAGE_SIZE)
        .reverse()
        .toArray(),
    [search, activeTagId, activeTab]
  );

  const setNoteCount = useBearStore((state: any) => state.setNoteCount);
  const setLinkCount = useBearStore((state: any) => state.setLinkCount);
  const setFavouriteCount = useBearStore(
    (state: any) => state.setFavouriteCount
  );

  useEffect(() => {
    async function dude() {
      const note = await db.notes
        .filter((item) => !activeTagId || item.collectionId === activeTagId)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((note) => note.type === "notes")
        .count();
      const links = await db.notes
        .filter((item) => !activeTagId || item.collectionId === activeTagId)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((note) => note.type === "links")
        .count();
      const favourite = await db.notes
        .filter((item) => !activeTagId || item.collectionId === activeTagId)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((note) => note.favourite === true)
        .count();
      setNoteCount(note);
      setLinkCount(links);
      setFavouriteCount(favourite);
    }
    dude();
  }, [notes, search, activeTab]);

  const currentNotes: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Card withBorder radius={"sm"} key={random()}>
          <Note doc={doc} />
        </Card>
      </Grid.Col>
    )
  );

  const springs = useSpring({
    from: { y: 10 },
    to: { y: 0 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
    >
      {currentNotes?.length > 0 && (
        <Grid mt={"md"} gutter={"xs"}>
          {currentNotes}
        </Grid>
      )}
    </animated.div>
  );
}

export function Favourites() {
  const PAGE_SIZE = 12;
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const activeTagId = useBearStore((state: any) => state.activeTagId);
  const search = useBearStore((state: any) => state.search);

  const notes = useLiveQuery(
    () =>
      db.notes
        .filter((note) => !activeTagId || note.collectionId === activeTagId)
        .filter((note) => note.favourite === true)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .offset(offset)
        .limit(PAGE_SIZE)
        .reverse()
        .toArray(),
    [activeTagId, search]
  );

  const setFavouriteCount = useBearStore(
    (state: any) => state.setFavouriteCount
  );

  useEffect(() => {
    async function dude() {
      const favourite = await db.notes
        .filter((note) => !activeTagId || note.collectionId === activeTagId)
        .filter((note) => note.favourite === true)
        .filter(
          (item) =>
            !search || item.content.toLowerCase().includes(search.toLowerCase())
        )
        .count();

      setFavouriteCount(favourite);
    }
    dude();
  }, [notes, search]);

  const currentNotes: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Card withBorder radius={"sm"} key={random()}>
          <Note doc={doc} />
        </Card>
      </Grid.Col>
    )
  );

  const springs = useSpring({
    from: { y: 10 },
    to: { y: 0 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
    >
      {currentNotes?.length > 0 && (
        <Grid mt={"md"} gutter={"xs"}>
          {currentNotes}
        </Grid>
      )}
    </animated.div>
  );
}

function GetTime() {
  const [time, setTime] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTime = new Date(now.getTime());

      const hours = localTime.getHours() % 12 || 12;
      const minutes = localTime.getMinutes().toString().padStart(2, "0");
      const amPm = localTime.getHours() >= 12 ? "PM" : "AM";

      setTime(`${hours}:${minutes} ${amPm}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Title
      style={{
        color:
          "light-dark(var(--mantine-color-black), var(--mantine-color-white))",
        fontSize: isSmallScreen ? rem(20) : rem(30),
        fontWeight: 900,
        letterSpacing: rem(-1),
      }}
    >
      {time}
    </Title>
  );
}

function DateDisplay() {
  // Get current date
  const currentDate = new Date();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");


  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Format the date
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return (
    <Title
      style={{
        color:
          "light-dark(var(--mantine-color-black), var(--mantine-color-white))",
        fontSize: isSmallScreen ? rem(20) :rem(25),
        fontWeight: 900,
        letterSpacing: rem(-1),
      }}
    >
      {formattedDate}
    </Title>
  );
}

import "./styles.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const message = useBearStore((state: any) => state.message);
  const setMessage = useBearStore((state: any) => state.setMessage);
  const activeTab = useBearStore<string>((state: any) => state.activeTab);
  const resetTab = useBearStore((state: any) => state.resetTab);
  const store = useBearStore();

  const view: any = {
    home: <></>,
    notes: <Bro type="notes" />,
    links: <Bro type="links" />,
    favourites: <Favourites />,
  }[activeTab];

  const springs = useSpring({
    from: { y: -10 },
    to: { y: 0 },
  });

  const editor = useEditor({
    extensions: [
      StarterKit as any,
      Placeholder.configure({
        placeholder: "Write something",
        considerAnyAsEmpty: true,
      }),
    ],
    onUpdate: (instance) => {
      setMessage(instance.editor.getHTML());
    },
    autofocus: true,
  });

  return (
    <>
      <Flex mt={"lg"} justify={"space-between"} gap={"xs"}>
        {isSmallScreen ? null : <NavbarSearch />}
        {!store.search || activeTab == "home" ? (
          <div style={{ width: "100%" }}>
            {activeTab != "home" ? (
              <Card
                withBorder
                py={0}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "150px",
                  maxHeight: "650px",
                  overflowY: "scroll",
                }}
              >
                <animated.div
                  style={{
                    ...springs,
                  }}
                >
                  <EditorContent editor={editor} />
                </animated.div>
                <Flex justify={"end"}>
                  <Button
                    onClick={async () => {
                      await db.notes.add({
                        uniqueId: getUniqueId(),
                        favourite: false,
                        content: message,
                        type: containsLinkInParagraph(message)
                          ? "links"
                          : "notes",
                        modifiedAt: Date.now(),
                      });
                      editor?.commands.clearContent();
                      setMessage("");
                      containsLinkInParagraph(message)
                        ? resetTab("links")
                        : resetTab("notes");
                    }}
                    mb={rem(8)}
                    size={"xs"}
                    disabled={message === "<p></p>" || message === ""}
                    variant={"default"}
                  >
                    Submit
                  </Button>
                </Flex>
              </Card>
            ) : (
              <animated.div
                style={{
                  ...springs,
                }}
              >
                <Card
                  h={isSmallScreen ? 180 : 300}
                  p={0}
                  withBorder
                  radius={"md"}
                >
                  <Flex align={"center"} justify={"space-between"}>
                    <div style={{ marginLeft: isSmallScreen ? 20 : 30 }}>
                      <GetTime />
                      <DateDisplay />
                    </div>
                    <img
                      width={isSmallScreen ? 180 : "300"}
                      style={{ objectFit: "fill" }}
                      src={paper}
                    />
                  </Flex>
                </Card>
              </animated.div>
            )}

            {activeTab != "home" ? <Demo /> : null}
            {view}
            {activeTab == "links" ? (
              <Text c={"dimmed"} mt={"sm"} size="xs">
                Links are automatically moved to "Links" tab
              </Text>
            ) : null}
          </div>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <Text size="xs">
                You are searching in {store.activeTab}{" "}
                {store.activeTag ? `within "${store.activeTag}"` : null}
              </Text>
              {view}
            </div>
          </>
        )}
      </Flex>
    </>
  );
}

function Demo() {
  const store = useBearStore();
  const setSelectable = useBearStore((state: any) => state.setSelectable);
  const selectable = useBearStore((state: any) => state.selectable);
  const activeTabs: any = {
    notes: "All notes",
    links: "Links",
    favourites: "Favourites",
  };

  const items = [
    { title: "Wellnote", href: null },
    { title: activeTabs[store.activeTab], href: null },
    { title: store.activeTag, href: null },
  ].map((item, index) =>
    item.href ? (
      <Anchor c={"dimmed"} href={item.href} key={index}>
        {item.title}
      </Anchor>
    ) : (
      <Text c={"dimmed"} key={index}>
        {item.title}
      </Text>
    )
  );

  return (
    <Flex mt={"sm"} align={"center"} justify={"space-between"}>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div>
        <Group>
          <Button
            variant={"subtle"}
            radius={"lg"}
            color={store.color}
            // className={classes.mainLinkMini}
            onClick={() => {
              setSelectable(!selectable);
            }}
            size="xs"
          >
            {selectable ? "Cancel" : "Select"}
          </Button>
          <Menu position={"bottom-end"} shadow="md">
            <Menu.Target>
              <IconDots size="20" stroke={1.5} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item disabled={!selectable}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Flex>
  );
}
