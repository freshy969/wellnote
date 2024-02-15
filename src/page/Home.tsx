import {
  Tabs,
  Button,
  rem,
  Title,
  Table,
  Divider,
  Text,
  TextInput,
  Drawer,
  PasswordInput,
  Card,
  ActionIcon,
  Group,
  Menu,
  Flex,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconMessages,
  IconDots,
  IconArrowBack,
} from "@tabler/icons-react";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";

export default function Home({ user }: any) {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [opened, { open, close }] = useDisclosure(false);
  const [LazyComponent, setLazyComponent] = useState<any>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [modalContent, setModalContent] = useState<any>("");
  const [modalTitle, setModalTitle] = useState<any>("");
  const [modalSize, setModalSize] = useState<any>("sm");
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user.uid));
    }

    fetchMyAPI();
  }, [user, opened]);

  useEffect(() => {
    const importLazyComponent = async () => {
      const component = await import("../components/Editor/TextEditor");
      setLazyComponent(React.createElement(component.TextEditor));
    };

    importLazyComponent();
  }, []);

  const currentNotes: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Table.Tr
        key={random()}
        onClick={() => {
          setModalTitle("Note");
          setModalSize("100%");
          setModalContent(
            <Text
              p={"md"}
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

  const passwordContent = (
    <>
      <TextInput placeholder="Website" type={"url"} radius={"md"} />
      <TextInput
        placeholder="Username/Email"
        type="text"
        mt={"sm"}
        radius={"md"}
      />
      <PasswordInput mt={"sm"} radius={"md"} placeholder="Password" />
      <div>
        <Button variant={"default"} mt={"sm"} radius={"md"}>
          Submit
        </Button>
      </div>
    </>
  );

  const noteContent = <>{LazyComponent ? LazyComponent : null}</>;

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
      <Tabs
        mt={"lg"}
        variant={isSmallScreen ? "outline" : "pills"}
        radius="md"
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        defaultValue="passwords"
      >
        <Tabs.List>
          {isSmallScreen ? (
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
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Notes
              </Tabs.Tab>
              <Tabs.Tab
                value="files"
                leftSection={<IconSettings style={iconStyle} />}
              >
                Files
              </Tabs.Tab>
            </div>
          ) : (
            <>
              <Tabs.Tab
                value="passwords"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Passwords
              </Tabs.Tab>
              <Tabs.Tab
                value="notes"
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Notes
              </Tabs.Tab>
              <Tabs.Tab
                value="files"
                leftSection={<IconSettings style={iconStyle} />}
              >
                Files
              </Tabs.Tab>
            </>
          )}
        </Tabs.List>

        <Tabs.Panel
          mt={isSmallScreen ? "sm" : 0}
          pl={isSmallScreen ? 0 : "lg"}
          value="passwords"
        >
          <Title>Passwords</Title>
          <Text size={"xs"} c={"dimmed"}>
            Simple password management
          </Text>
          <Button
            onClick={() => {
              setModalTitle("Add password");
              setModalSize("sm");
              setModalContent(passwordContent);
              open();
            }}
            variant={"default"}
            mt={"sm"}
            radius={"md"}
            size="xs"
          >
            Add new
          </Button>
          <Divider mt={"sm"} />
        </Tabs.Panel>

        <Tabs.Panel
          mt={isSmallScreen ? "sm" : 0}
          pl={isSmallScreen ? 0 : "lg"}
          value="notes"
        >
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
                  setModalSize("100%");
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

          <Card withBorder radius={"md"} mt={"sm"} p={0}>
            <Table.ScrollContainer minWidth={"100%"}>
              <Table verticalSpacing={"sm"}>
                <Table.Tbody>{currentNotes}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
