import {
  Button,
  Card,
  Flex,
  Menu,
  Text,
  PasswordInput,
  TextInput,
  rem,
  Popover,
} from "@mantine/core";
import { useState } from "react";
import { addPassword } from "../query/passwords";
import { useBearStore } from "../utils/state";
import {
  IconArrowBack,
  IconCheck,
  IconCopy,
  IconDots,
  IconMessages,
} from "@tabler/icons-react";
import { random } from "../utils/generic/helper";

export function Password({ item }: any) {
  const handleClick = async (item: any) => {
    try {
      await navigator.clipboard.writeText(item.password);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };
  return (
    <>
      <Card
        withBorder
        mt={"xs"}
        radius={"md"}
        key={random()}
        onClick={() => {}}
      >
        <Flex justify={"space-between"} align={"center"}>
          <div style={{ cursor: "pointer", width: "100%" }}>
            <Flex direction={"column"}>
              <Text size={"xs"} lineClamp={1}>
                {item.username}
              </Text>
              <Text size={"xs"} lineClamp={1}>
                {item.website}
              </Text>
            </Flex>
          </div>

          <div>
            <Flex align={"center"}>
              <Popover withArrow shadow="md">
                <Popover.Target>
                  <Button
                    ml={"xs"}
                    variant={"default"}
                    size={"compact-sm"}
                    color="gray"
                    onClick={() => handleClick(item)}
                  >
                    <IconCopy
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </Button>
                </Popover.Target>
                <Popover.Dropdown p={rem(7)}>
                  <Flex align={"center"} gap={rem(5)}>
                    <IconCheck color={"lime"} size={15} />
                    <Text c={"green"} size="xs">
                      Copied
                    </Text>
                  </Flex>
                </Popover.Dropdown>
              </Popover>
              <Button
                ml={"xs"}
                variant={"default"}
                size={"compact-sm"}
                color="gray"
              >
                <Text size={"xs"}>Open</Text>
              </Button>
              <Menu
                transitionProps={{ transition: "pop" }}
                withArrow
                position="bottom-end"
                withinPortal
              >
                <Menu.Target>
                  <Button
                    ml={"xs"}
                    variant={"default"}
                    size={"compact-sm"}
                    color="gray"
                  >
                    <IconDots
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </Button>
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
            </Flex>
          </div>
        </Flex>
      </Card>
    </>
  );
}

export function NewPassword() {
  const user = useBearStore((state: any) => state.user);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);
  const [password, setPassword] = useState<any>("");
  const [website, setWebsite] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  return (
    <>
      <TextInput
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
        type={"url"}
        radius={"md"}
      />
      <TextInput
        placeholder="Username/Email"
        type="text"
        mt={"sm"}
        onChange={(e) => setUsername(e.target.value)}
        radius={"md"}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        mt={"sm"}
        radius={"md"}
        placeholder="Password"
      />
      <div>
        <Button
          onClick={async () => {
            await addPassword(website, username, password, user.uid);
            closeDrawer();
          }}
          variant={"default"}
          mt={"sm"}
          size="xs"
          radius={"md"}
        >
          Submit
        </Button>

        <Button
          variant={"default"}
          mt={"sm"}
          ml={"xs"}
          onClick={closeDrawer}
          size="xs"
          radius={"md"}
        >
          Close
        </Button>
      </div>
    </>
  );
}
