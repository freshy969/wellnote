import {
  Tabs,
  Button,
  rem,
  Title,
  Text,
  Card,
  ActionIcon,
  Group,
  Menu,
  Flex,
  ScrollArea,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconMessages,
  IconDots,
  IconArrowBack,
} from "@tabler/icons-react";
import React from "react";
import { useEffect, useState } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";
import { readPasswords } from "../query/passwords";
import { Password } from "../components/Password";
import { useBearStore } from "../utils/state";
import { EditNote } from "../components/Note";

export default function Home({ user }: any) {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [lazyNote, setLazyNote] = useState<any>(null);
  const [lazyPassword, setLazyPassword] = useState<any>(null);
  const [notes, setNotes] = useState<any>([]);
  const [passwords, setPasswords] = useState<any>([]);
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const openDrawer = useBearStore((state: any) => state.openDrawer);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user?.uid));
      setPasswords(await readPasswords(user?.uid));
    }

    if (user?.uid) {
      fetchMyAPI();
    }
  }, [user, drawerOpen]);

  useEffect(() => {
    const importLazyComponent = async () => {
      const note = await import("../components/Editor/TextEditor");
      const password = await import("../components/Password");
      setLazyNote(React.createElement(note.TextEditor));
      setLazyPassword(React.createElement(password.NewPassword));
    };

    importLazyComponent();
  }, []);

  const currentNotes: any = [];
  const currentPasswords: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Card withBorder mt={"xs"} radius={"md"} key={random()}>
        <Flex justify={"space-between"} align={"center"}>
          <div
            onClick={() => {
              openDrawer(
                "Note",
                <EditNote doc={doc} />,
                "lg"
              );
            }}
            style={{ cursor: "pointer", width: "100%" }}
          >
            <Text size={"sm"} lineClamp={1}>
              {doc.data().content.replace(/<[^>]*>/g, " ")}
            </Text>
          </div>

          <div>
            <Group gap={0} justify="flex-end">
              <Menu
                transitionProps={{ transition: "pop" }}
                withArrow
                position="bottom-end"
                withinPortal
              >
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconMessages
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Send message
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconArrowBack
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Reschedule
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </div>
        </Flex>
      </Card>
    )
  );

  passwords?.forEach((doc: any) =>
    currentPasswords.push(
      <Card
        withBorder
        mt={"xs"}
        radius={"md"}
        key={random()}
        onClick={() => {}}
      >
        <Password item={doc} />
      </Card>
    )
  );

  const noteContent = <>{lazyNote ? lazyNote : null}</>;
  const passwordContent = <>{lazyPassword ? lazyPassword : null}</>;

  return (
    <>
      <Tabs mt={"lg"} variant={"pills"} radius="md" defaultValue="passwords">
        <Tabs.List>
          <div
            style={{
              display: "inline-flex",
              justifyItems: "center",
              overflowY: "hidden",
              overflowX: "scroll",
              whiteSpace: "nowrap",
            }}
          >
            <Tabs.Tab
              value="passwords"
              leftSection={<IconPhoto style={iconStyle} />}
            >
              Passwords
            </Tabs.Tab>
            <Tabs.Tab
              value="notes"
              ml={"xs"}
              leftSection={<IconMessageCircle style={iconStyle} />}
            >
              Notes
            </Tabs.Tab>
          </div>
        </Tabs.List>

        <Tabs.Panel mt={"sm"} value="passwords">
          <Flex justify={"space-between"} align={"center"}>
            <div>
              <Title>Passwords</Title>
              <Text c={"dimmed"} size={"xs"}>
                Click to copy
              </Text>
            </div>
            <div>
              <Button
                onClick={() => {
                  openDrawer("Add password", passwordContent);
                }}
                variant={"default"}
                // mt={"sm"}
                radius={"md"}
                size="xs"
              >
                Add new
              </Button>
            </div>
          </Flex>

          {currentPasswords?.length > 0 && (
            <ScrollArea key={random()} h={"100%"}>
              {currentPasswords}
            </ScrollArea>
          )}
        </Tabs.Panel>

        <Tabs.Panel mt={"sm"} value="notes">
          <Flex justify={"space-between"} align={"center"}>
            <div>
              <Title>Notes</Title>
              <Text c={"dimmed"} size={"xs"}>
                Add more notes
              </Text>
            </div>
            <div>
              <Button
                onClick={() => {
                  openDrawer("Add note", noteContent, "lg");
                }}
                variant={"default"}
                // mt={"sm"}
                radius={"md"}
                size="xs"
              >
                Add new
              </Button>
            </div>
          </Flex>

          {currentNotes?.length > 0 && (
            <ScrollArea key={random()} h={"100%"}>
              {currentNotes}
            </ScrollArea>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
