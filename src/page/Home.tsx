import { IconDots } from "@tabler/icons-react";
import { Button, Flex, Menu, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Card, Grid } from "@mantine/core";
import { getUniqueId, random } from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { useLiveQuery } from "dexie-react-hooks";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { Editor } from "../components/Editor/MiniEditor";
import { db } from "../utils/dexie/config";
import {
  NavbarSearch,
  NavbarSearchMobile,
} from "../components/NavBar/NavSearch";
import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

export function Bro() {
  const PAGE_SIZE = 12;
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const search = useBearStore((state: any) => state.search);
  const activeTagId = useBearStore((state: any) => state.activeTagId);

  const notes = useLiveQuery(() =>
    db.notes
      .filter((item) => !search || item.content.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => !activeTagId || item.collectionId === activeTagId)
      .offset(offset)
      .limit(PAGE_SIZE)
      .reverse()
      .toArray(),
    [search, activeTagId]
  );

  const setNoteCount = useBearStore((state: any) => state.setNoteCount);
  const setFavouriteCount = useBearStore(
    (state: any) => state.setFavouriteCount
  );

  useEffect(() => {
    async function dude() {
      if (search) {
        const note = await db.notes
          .filter((item) =>
            item.content.toLowerCase().includes(search.toLowerCase())
          )
          .count();
        const favourite = await db.notes
          .filter((item) =>
            item.content.toLowerCase().includes(search.toLowerCase())
          )
          .filter((note) => note.favourite === true)
          .count();
        setNoteCount(note);
        setFavouriteCount(favourite);
      } else {
        const note = await db.notes.count();
        const favourite = await db.notes
          .filter((note) => note.favourite === true)
          .count();
        setNoteCount(note);
        setFavouriteCount(favourite);
      }
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

export function Favourites() {
  const PAGE_SIZE = 12;
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const activeTagId = useBearStore((state: any) => state.activeTagId);

  const notes = useLiveQuery(() =>
    db.notes
      .filter((note) => !activeTagId || note.collectionId === activeTagId)
      .filter((note) => note.favourite === true)
      .offset(offset)
      .limit(PAGE_SIZE)
      .reverse()
      .toArray(),
    [activeTagId]
  );

  const setNoteCount = useBearStore((state: any) => state.setNoteCount);
  const search = useBearStore((state: any) => state.search);
  const setFavouriteCount = useBearStore(
    (state: any) => state.setFavouriteCount
  );

  useEffect(() => {
    async function dude() {
      if (search) {
        const note = await db.notes
          .filter((item) =>
            item.content.toLowerCase().includes(search.toLowerCase())
          )
          .count();
        const favourite = await db.notes
          .filter((item) =>
            item.content.toLowerCase().includes(search.toLowerCase())
          )
          .filter((note) => note.favourite === true)
          .count();
        setNoteCount(note);
        setFavouriteCount(favourite);
      } else {
        const note = await db.notes.count();
        const favourite = await db.notes
          .filter((note) => note.favourite === true)
          .count();
        setNoteCount(note);
        setFavouriteCount(favourite);
      }
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

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const message = useBearStore((state: any) => state.message);
  const setNote = useBearStore((state: any) => state.setNote);
  const setMessage = useBearStore((state: any) => state.setMessage);
  const activeTab = useBearStore<string>((state: any) => state.activeTab);
  const store = useBearStore();

  const view: any = {
    notes: <Bro />,
    favourites: <Favourites />,
  }[activeTab];

  const springs = useSpring({
    from: { y: -10 },
    to: { y: 0 },
  });

  return (
    <Flex mt={"lg"} justify={"space-between"} gap={"xs"}>
      {isSmallScreen ? null : <NavbarSearch />}
      {!store.search ? (
        <div style={{ width: "100%" }}>
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
              <Editor read={false} />
            </animated.div>
            <Flex justify={"end"}>
              <Button
                onClick={async () => {
                  await db.notes.add({
                    uniqueId: getUniqueId(),
                    favourite: false,
                    content: message,
                    type: "any",
                    modifiedAt: Date.now(),
                  });
                  setMessage("");
                  setNote("");
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
          <Demo />
          {view}
        </div>
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <Text size="xs">You are searching in all notes</Text>
            {view}
          </div>
        </>
      )}
    </Flex>
  );
}

function Demo() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const store = useBearStore();

  const activeTabs: any = {
    notes: "All notes",
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
      {isSmallScreen ? (
        <Menu position={"bottom-end"} shadow="md">
          <Menu.Target>
            <IconDots size="20" stroke={1.5} />
          </Menu.Target>
          <Menu.Dropdown>
            <NavbarSearchMobile />
          </Menu.Dropdown>
        </Menu>
      ) : null}
    </Flex>
  );
}
