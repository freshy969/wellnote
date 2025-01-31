import {
  ActionIcon,
  Checkbox,
  Flex,
  Group,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import {
  IconCategory,
  IconDots,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { deleteNote, updateFieldIfNotExist } from "../query/notes";
import { useBearStore } from "../utils/state";
import { Editor } from "../components/Editor/MiniEditor";
import { CollectionModal } from "./NavBar/Collection";
import { animated, useSpring } from "@react-spring/web";

function DrawerData() {
  return (
    <>
      <Editor read={true} />
    </>
  );
}

export function Note({ doc }: any) {
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const setNote = useBearStore((state: any) => state.setNote);
  const openModal = useBearStore((state: any) => state.openModal);
  const selectable = useBearStore((state: any) => state.selectable);

  const spring = useSpring({
    from: { x: -15 },
    to: { x: 0 },
  });

  const Component = (
    <div
      onClick={() => {
        setNote(doc);
        openDrawer("Note", <DrawerData />);
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
  );

  return (
    <Flex justify={"space-between"} align={"center"}>
      <Flex justify={"start"} align={"center"} gap={rem(10)}>
        <div>{selectable ? <Checkbox /> : null}</div>

        {selectable ? (
          <animated.div
            style={{
              ...spring,
            }}
          >
            {Component}
          </animated.div>
        ) : (
          Component
        )}
      </Flex>

        {
          selectable ?
          <></> :
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
                  openModal(
                    "Add collection",
                    <CollectionModal select={true} noteId={doc.id} />,
                    "lg"
                  );
                }}
                leftSection={
                  <IconCategory
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={"yellow"}
                  />
                }
              >
                Collection
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
        }

    </Flex>
  );
}
