import {
  Tabs,
  Button,
  rem,
  Title,
  Table,
  Text,
  Drawer,
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
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";
import { readPasswords } from "../query/passwords";
import { Password } from "../components/Password";

export default function Home({ user }: any) {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [opened, { open, close }] = useDisclosure(false);
  const [lazyNote, setLazyNote] = useState<any>(null);
  const [lazyPassword, setLazyPassword] = useState<any>(null);
  const [modalContent, setModalContent] = useState<any>("");
  const [modalTitle, setModalTitle] = useState<any>("");
  const [modalSize, setModalSize] = useState<any>("sm");
  const [notes, setNotes] = useState<any>([]);
  const [passwords, setPasswords] = useState<any>([]);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user?.uid));
      setPasswords(await readPasswords(user?.uid));
    }

    if (user?.uid) {
      fetchMyAPI();
    }
  }, [user, opened]);

  useEffect(() => {
    const importLazyComponent = async () => {
      const note = await import("../components/Editor/TextEditor");
      const password = await import("../components/Password");
      setLazyNote(React.createElement(note.TextEditor, { close }));
      setLazyPassword(React.createElement(password.NewPassword, { close }));
    };

    importLazyComponent();
  }, []);

  const currentNotes: any = [];
  const currentPasswords: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Table.Tr
        key={random()}
        onClick={() => {
          setModalTitle("Note");
          setModalSize("xl");
          setModalContent(
            <Text
              dangerouslySetInnerHTML={{ __html: doc.data().content }}
            ></Text>
          );
          open();
        }}
      >
        <Table.Td pl={"sm"} style={{ cursor: "pointer" }}>
          <Text lineClamp={1}>
            {doc.data().content.replace(/<[^>]*>/g, " ")}
          </Text>
        </Table.Td>

        <Table.Td>
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
        </Table.Td>
      </Table.Tr>
    )
  );

  passwords?.forEach((doc: any) =>
    currentPasswords.push(
      <Password item={doc.data()} />
    )
  );

  const noteContent = <>{lazyNote ? lazyNote : null}</>;
  const passwordContent = <>{lazyPassword ? lazyPassword : null}</>;

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={modalTitle}
        size={modalSize}
        position={"right"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {modalContent}
      </Drawer>
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
                  setModalTitle("Add password");
                  setModalSize("sm");
                  setModalContent(passwordContent);
                  open();
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
            <ScrollArea h={"100%"}>{currentPasswords}</ScrollArea>
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
                  setModalTitle("Add note");
                  setModalSize("xl");
                  setModalContent(noteContent);
                  open();
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
            <Card withBorder radius={"md"} mt={"sm"} p={0}>
              <Table.ScrollContainer minWidth={"100%"}>
                <Table verticalSpacing={"sm"}>
                  <Table.Tbody>{currentNotes}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Card>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
