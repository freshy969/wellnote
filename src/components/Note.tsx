import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import {
  IconDots,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { useEffect, useState } from "react";
import classes from "./Note.module.css";
import { deleteNote } from "../query/notes";
import { useBearStore } from "../utils/state";

export function Note({ doc, setUpdated }: any) {
  const openDrawer = useBearStore((state: any) => state.openDrawer);

  return (
    <Flex justify={"space-between"} align={"center"}>
      <div
        onClick={() => {
          openDrawer("Note", <EditNote doc={doc} />, "lg");
        }}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <div>

        <Text style={{ wordBreak:"break-all"}} size={"sm"} lineClamp={1}>
          {doc.content.replace(/<[^>]*>/g, " ")}
        </Text>
        </div>
        <Text c={"dimmed"} size={"xs"} lineClamp={1}>
          Modified at{" "}
          {new Date(doc?.modifiedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
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
                onClick={async () => {
                  await deleteNote(doc.id);
                  // setUpdated(true);
                }}
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={"red"}
                  />
                }
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Flex>
  );
}

export function EditNote({ doc }: any) {
  const [lazyNote, setLazyNote] = useState<any>(null);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);

  useEffect(() => {
    const importLazyComponent = async () => {
      const note = await import("../components/Editor/TextEditor");
      setLazyNote(
        React.createElement(note.TextEditor, {
          update: true,
          id: doc.id,
          content: doc.content,
        })
      );
    };

    importLazyComponent();
  }, []);

  const [edit, setEdit] = useState(false);

  return edit ? (
    <>{lazyNote}</>
  ) : (
    <>
      <Card withBorder className={classes.card}>
        <Card.Section px={"md"} py={"xs"} withBorder>
          <Flex justify={"space-between"} align={"center"}>
            <Button radius={"md"} size={"compact-sm"} onClick={() => setEdit(true)} variant={"default"}>
              <Group align={"center"} gap={rem(3)}>
                <Text size={"xs"}>Edit</Text>
              </Group>
            </Button>
            <Button radius={"md"} size={"compact-sm"} onClick={()=> closeDrawer()} variant={"default"}>
              <Group align={"center"} gap={rem(4)}>
                <Text size={"xs"} >Close</Text>
              </Group>
            </Button>
          </Flex>
        </Card.Section>
        <Text dangerouslySetInnerHTML={{ __html: doc.content }}></Text>
      </Card>
    </>
  );
}
