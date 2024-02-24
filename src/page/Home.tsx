import {
  Tabs,
  Button,
  rem,
  Title,
  Text,
  Card,
  Flex,
  ScrollArea,
  TextInput,
  Stack,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconUpload,
  IconSend2,
} from "@tabler/icons-react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";
import { readPasswords } from "../query/passwords";
import { Password } from "../components/Password";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";

export default function Home({ user }: any) {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [lazyNote, setLazyNote] = useState<any>(null);
  const [lazyPassword, setLazyPassword] = useState<any>(null);
  const [notes, setNotes] = useState<any>([]);
  const [passwords, setPasswords] = useState<any>([]);
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user?.uid));
      setPasswords(await readPasswords(user?.uid));
    }

    if (user?.uid) {
      fetchMyAPI();
    }
  }, [user, drawerOpen, updated]);

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
        <Note doc={doc} setUpdated={setUpdated} />
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
        <Password item={doc} setUpdated={setUpdated} />
      </Card>
    )
  );

  const noteContent = <>{lazyNote ? lazyNote : null}</>;
  const passwordContent = <>{lazyPassword ? lazyPassword : null}</>;

  const [message, setMessage] = useState([]);
  const [q, setQ] = useState(false);
  const messagesRef = useRef(null);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      setMessage([...message, event.target.value]);
      setQ(true);
    }
  };

  const scrollMessagesToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom when component mounts or when message array changes
    scrollMessagesToBottom();
  }, [message]);

  return (
    <>
      <Tabs mt={"lg"} variant={"pills"} radius="md" defaultValue="upload">
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
              value="upload"
              leftSection={<IconUpload style={iconStyle} />}
            >
              Smart Upload
            </Tabs.Tab>
            <Tabs.Tab
              ml={"xs"}
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

        <Tabs.Panel h={"65vh"} mt={"sm"} value="upload">
          <Stack
            gap={"xs"}
            h={"100%"}
            bg="var(--mantine-color-body)"
            justify="flex-end"
          >
            <div
              ref={messagesRef}
              style={{ maxHeight: "65vh", overflowY: "auto" }}
            >
              {q
                ? message.map((e, index) => (
                    <>
                      <Flex key={index} mt={"xs"} justify={"end"}>
                        <Button
                          px={"sm"}
                          size={"md"}
                          style={{
                            padding: rem(5),
                            borderRadius: "20px 20px 0px 20px",
                          }}
                        >
                          <Text>{e}</Text>
                        </Button>
                      </Flex>

                      <Flex key={index} mt={"xs"} justify={"start"}>
                        <Button
                          px={"sm"}
                          size={"md"}
                          variant={"default"}
                          style={{
                            padding: rem(5),
                            borderRadius: "20px 20px 20px 0px",
                          }}
                        >
                          <Text>Uploading</Text>
                        </Button>
                      </Flex>
                    </>
                  ))
                : null}
            </div>

            <TextInput
              radius={"md"}
              onKeyDown={(e) => handleKeyPress(e)}
              rightSection={<IconSend2 onClick={(e) => handleKeyPress(e)} />}
              size={"lg"}
              autoFocus
            />
          </Stack>
        </Tabs.Panel>

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
