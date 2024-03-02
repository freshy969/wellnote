import {
  IconRefresh,
} from "@tabler/icons-react";
import { Button, Flex, Menu, Text, rem } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";

import { Card, Grid } from "@mantine/core";
import { getUniqueId, random } from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { useLiveQuery } from "dexie-react-hooks";

export function Bro() {

  const PAGE_SIZE = 12;
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const notes = useLiveQuery(() =>
    db.notes.offset(offset).limit(PAGE_SIZE).reverse().toArray()
  );

  const setNoteCount = useBearStore((state: any) => state.setNoteCount);
  // const setNote = useBearStore((state: any) => state.setNote);

  useEffect(()=>{

    // setNote("")
    setNoteCount()

  },[notes])

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

  return (
    <>
      {currentNotes?.length > 0 && (
        <Grid mt={"md"} gutter={"xs"}>
          {currentNotes}
        </Grid>
      )}
    </>
  );
}

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const message = useBearStore((state: any) => state.message);
  const setNote = useBearStore((state: any) => state.setNote);
  const setMessage = useBearStore((state: any) => state.setMessage);

  return (
    <Flex mt={"lg"} justify={"space-between"} gap={"xs"}>
      {isSmallScreen ? null : <NavbarSearch />}
      <div style={{ width: "100%" }}>
        <Card
          withBorder
          py={0}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100px",
            maxHeight: "200px",
            overflowY: "scroll",
          }}
        >
          <Editor read={false} />
          <Flex justify={"end"}>
            <Button
              onClick={async () => {
                await db.notes.add({
                  uniqueId: getUniqueId(),
                  content: message,
                  type: "any",
                  modifiedAt: Date.now(),
                });
                setNote("");
                setMessage("")
              }}
              mb={rem(8)}
              pr={0}
              size={"sm"}
              disabled={message === "<p></p>" || message === ""}
              variant={"transparent"}
            >
              Submit
            </Button>
          </Flex>
        </Card>
        <Demo />
        <Bro />
      </div>
    </Flex>
  );
}

import { Breadcrumbs, Anchor } from "@mantine/core";
import { Editor } from "../components/Editor/MiniEditor";
import { db } from "../utils/dexie/config";
import { NavbarSearch } from "../components/NavBar/NavSearch";
import { useEffect } from "react";

const items = [
  { title: "Wellnote", href: null },
  { title: "All notes", href: null },
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

function Demo() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Flex mt={"sm"} align={"center"} justify={"space-between"}>
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* <Button variant={"default"} size={"compact-xs"}> */}
      {isSmallScreen ? (
        <Menu position={"bottom-end"} shadow="md">
          <Menu.Target>
            <IconRefresh size="20" stroke={1.5} />
          </Menu.Target>

          <Menu.Dropdown p={"md"}>
            <NavbarSearch />
          </Menu.Dropdown>
        </Menu>
      ) : null}

      {/* </Button> */}
    </Flex>
  );
}
