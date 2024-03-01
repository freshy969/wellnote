import { useState } from "react";
import {
  IconArrowRight,
  IconFolder,
  IconGauge,
  IconNote,
  IconRefresh,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import { Button, Flex, NavLink, Text } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";

import { Card, Grid } from "@mantine/core";
import { useEffect } from "react";
import { getUniqueId, random } from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { TextEditor } from "../components/Editor/TextEditor";
import { useLiveQuery } from "dexie-react-hooks";

export function Bro({ user }: any) {
  
  // const [notes, setNotes] = useState<any>([]);
  // const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  // const message = useBearStore((state: any) => state.message);
  const [updated, setUpdated] = useState(false);
  const notes = useLiveQuery(() => db.notes.reverse().toArray());

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     setNotes(await db.notes.toArray());
  //   }
  //   fetchMyAPI();
  // }, []);

  const currentNotes: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Card withBorder radius={"md"} key={random()}>
          <Note doc={doc} setUpdated={setUpdated} />
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

export default function Home({ user }: any) {

  const [active, setActive] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const message = useBearStore((state: any) => state.message);
  const noteContent = <TextEditor />;

  const data = [
    {
      icon: IconNote,
      label: "New note",
      onClick: (index) => {
        openDrawer("Add note", noteContent, "lg");
      },
      right: <></>,
    },
    {
      icon: IconGauge,
      label: "All notes",
      onClick: (index) => {
        setActive(index);
      },
      right: <IconArrowRight size="1rem" stroke={1.5} />,
    },

    {
      icon: IconFolder,
      label: "Folders",
      onClick: (index) => {
        setActive(index);
      },
      right: <IconArrowRight size="1rem" stroke={1.5} />,
    },

    {
      icon: IconStar,
      label: "Favourites",
      onClick: (index) => {
        setActive(index);
      },
      right: <IconArrowRight size="1rem" stroke={1.5} />,
    },

    {
      icon: IconSettings,
      label: "Settings",
      onClick: (index) => {
        setActive(index);
      },
      right: <IconArrowRight size="1rem" stroke={1.5} />,
    },
  ];

  const tags = [
    {
      label: "Add tag",
      onClick: (index) => {
        // openDrawer("Add note", noteContent, "lg");
      },
      right: <></>,
    },
    {
      label: "#settings",
      onClick: (index) => {
        // openDrawer("Add note", noteContent, "lg");
      },
      right: <></>,
    },
  ];

  const items = data.map((item, index) => (
    <Button
      radius={"sm"}
      key={item.label}
      onClick={() => setActive(index)}
      variant="default"
    >
      <item.icon size="1rem" stroke={1.5} />
    </Button>
  ));

  const navItems = data.map((item, index) => (
    <Anchor
      variant={"subtle"}
      // style={{ borderRadius: rem(5) }}
      key={item.label}
      size={"sm"}
      // active={index === active}
      // label={item.label}
      // description={item.description}
      // rightSection={index === active ? item.right : null}
      // leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        item.onClick(index);
      }}
    >
      {item.label}
      </Anchor>
  ));

  const tagItems = tags.map((item, index) => (
    <Anchor
      w={"100%"}
      truncate={"end"}
      variant={"subtle"}
      size={"sm"}
      // style={{ borderRadius: rem(5) }}
      key={item.label}
      // active={index === active}
      // label={item.label}
      // description={item?.description}
      // rightSection={item.right}
      ta={"end"}
      // rightSection={
      //   index == 0 ? (
      //     <IconPlus size="1rem" stroke={1.5} />
      //   ) : (
      //     <IconHash size="1rem" stroke={1.5} />
      //   )
      // }
      onClick={() => {
        item.onClick(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Flex mt={"xs"} justify={"space-between"} gap={"xs"}>
      <Flex
        w={isSmallScreen ? "auto" : "15%"}
        gap={isSmallScreen ? "md" : 0}
        direction={"column"}
      >
        {isSmallScreen ? items : navItems}
      </Flex>
      <div style={{ width: "100%" }}>
        <Card
          withBorder
          py={0}
          style={{
            minHeight: "100px",
            maxHeight: "200px",
            overflowY: "scroll",
          }}
        >
          <Editor />
          <Flex justify={"end"}>
            <Button
              onClick={async () => {
                await db.notes.add({
                  uniqueId: getUniqueId(),
                  content: message,
                  type: "any",
                  modifiedAt: Date.now(),
                });
              }}
              mb={"sm"}
              size={"compact-sm"}
              variant={"default"}
              radius={"sm"}
            >
              Submit
            </Button>
          </Flex>
        </Card>
        <Demo />
        <Bro user={user} />
      </div>
      <Flex
        style={{ maxWidth: "15%", minWidth: "10%" }}
        // w={isSmallScreen ? "auto" : "20%"}
        gap={isSmallScreen ? "md" : 0}
        direction={"column"}
      >
        {isSmallScreen ? items : tagItems}
      </Flex>
    </Flex>
  );
}

import { Breadcrumbs, Anchor } from "@mantine/core";
import { Editor } from "../components/Editor/MiniEditor";
import { db } from "../utils/dexie/config";

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
  return (
    <Flex mt={"sm"} align={"center"} justify={"space-between"}>
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* <Button variant={"default"} size={"compact-xs"}> */}
      <IconRefresh size="20" stroke={1.5} />
      {/* </Button> */}
    </Flex>
  );
}
