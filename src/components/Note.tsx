import {
  ActionIcon,
  Flex,
  Group,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { deleteNote } from "../query/notes";
import { useBearStore } from "../utils/state";
import { Editor } from "../components/Editor/MiniEditor"

export function Note({ doc }: any) {

  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const setNote = useBearStore((state: any) => state.setNote);

  return (
    <Flex justify={"space-between"} align={"center"}>
      <div
        onClick={() => {
          setNote(doc);
          openDrawer("Note", <Editor read={true} />, "lg");
        }}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <div>
          <Text style={{ wordBreak: "break-all" }} size={"sm"} lineClamp={1}>
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
