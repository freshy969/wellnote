import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import {
  IconDots,
  IconMaximize,
  IconMinimize,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { deleteNote, updateFieldIfNotExist } from "../query/notes";
import { useBearStore } from "../utils/state";
import { Editor } from "../components/Editor/MiniEditor";

function DrawerData() {
  const setDrawerFullScreen = useBearStore(
    (state: any) => state.setDrawerFullScreen
  );
  const drawerSize = useBearStore((state: any) => state.drawerSize);
  const store = useBearStore();

  return (
    <>
      <Flex align={"center"} justify={"start"}>
        <Button
          onClick={() => {
            const bro = drawerSize == "lg";
            setDrawerFullScreen(bro);
          }}
          radius={"sm"}
          variant={"light"}
          color={store.color}
          size={"xs"}
        >
          <Flex gap={rem(8)} align={"center"}>
            {drawerSize == "lg" ? (
              <IconMaximize size={15} />
            ) : (
              <IconMinimize size={15} />
            )}
            <Text size={"xs"}>
              {drawerSize == "lg" ? "Full screen" : "Normal"}
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Editor read={true} />
    </>
  );
}

export function Note({ doc }: any) {
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const setNote = useBearStore((state: any) => state.setNote);

  return (
    <Flex justify={"space-between"} align={"center"}>
      <div
        onClick={() => {
          setNote(doc);
          openDrawer("Note", <DrawerData />, "lg");
        }}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <div>
          <Text style={{ wordBreak: "break-word" }} size={"sm"} lineClamp={1}>
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
                  await updateFieldIfNotExist(doc.id);
                }}
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={"lime"}
                  />
                }
              >
                Favourite
              </Menu.Item>
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
