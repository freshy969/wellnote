import { useState } from "react";
import {
  IconArrowRight,
  IconFolder,
  IconGauge,
  IconHash,
  IconNote,
  IconNumber1,
  IconPlus,
  IconSettings,
  IconSquareRoundedNumber1,
  IconSquareRoundedNumber2,
  IconStar,
  IconTag,
} from "@tabler/icons-react";
import { Button, Flex, NavLink, Text, rem } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";

import { Card, Grid } from "@mantine/core";
import { useEffect } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { TextEditor } from "../components/Editor/TextEditor";
import { UserButton } from "../components/UserButton/UserButton";

export function Bro({ user }: any) {
  const [notes, setNotes] = useState<any>([]);
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user?.uid));
    }

    if (user?.uid) {
      fetchMyAPI();
    }
  }, [user, drawerOpen, updated]);

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
    <>{currentNotes?.length > 0 && <Grid mt={"md"} gutter={"xs"}>{currentNotes}</Grid>}</>
  );
}

export default function Home({ user }: any) {
  const [active, setActive] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const openDrawer = useBearStore((state: any) => state.openDrawer);
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
      label: "add tag",
      onClick: (index) => {
        // openDrawer("Add note", noteContent, "lg");
      },
      right: <></>,
    },

    {
      icon: IconSettings,
      label: "settings",
      onClick: (index) => {
        setActive(index);
      },
      right: <IconSquareRoundedNumber2 size="1rem" stroke={1.5} />,
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
    <NavLink
      variant={"subtle"}
      style={{ borderRadius: rem(5) }}
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={index === active ? item.right : null}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        item.onClick(index);
      }}
    />
  ));

  const tagItems = tags.map((item, index) => (
    <NavLink
      variant={"subtle"}
      py={rem(8)}
      style={{ borderRadius: rem(5) }}
      key={item.label}
      active={index === active}
      label={<Text size={rem(14)}>{item.label}</Text>}
      description={item?.description}
      rightSection={item.right}
      leftSection={
        index == 0 ? (
          <IconPlus size="1rem" stroke={1.5} />
        ) : (
          <IconHash size="1rem" stroke={1.5} />
        )
      }
      onClick={() => {
        item.onClick(index);
      }}
    />
  ));

  return (
    <Flex mt={"xs"} justify={"space-between"} gap={"lg"}>
      <Flex
        w={isSmallScreen ? "auto" : "20%"}
        gap={isSmallScreen ? "md" : 0}
        direction={"column"}
      >
        {isSmallScreen ? items : navItems}
      </Flex>
      <div style={{ width: "100%", marginTop: rem(15) }}>
        <Demo />
        <Bro user={user} />
      </div>
      <Flex
        w={isSmallScreen ? "auto" : "20%"}
        gap={isSmallScreen ? "md" : 0}
        direction={"column"}
      >
        {isSmallScreen ? items : tagItems}
      </Flex>
    </Flex>
  );
}

import { Breadcrumbs, Anchor } from "@mantine/core";

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
    <Flex align={"center"} justify={"space-between"}>
      <Breadcrumbs >{items}</Breadcrumbs>
      <Button variant={"default"} size={"compact-xs"}>
        Sync
      </Button>
    </Flex>
  );
}
