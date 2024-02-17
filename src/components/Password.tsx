import {
  Button,
  Card,
  Flex,
  Menu,
  Text,
  PasswordInput,
  TextInput,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { addPassword } from "../query/passwords";
import { useBearStore } from "../utils/state";
import {
  IconArrowBack,
  IconCopy,
  IconDots,
  IconMessages,
} from "@tabler/icons-react";
import { random } from "../utils/generic/helper";

export function Password({ item }:any) {
  return (
    <>
      <Card withBorder mt={"xs"} radius={"md"} key={random()} onClick={() => {}}>
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
              <Button
                ml={"xs"}
                variant={"default"}
                size={"compact-sm"}
                color="gray"
              >
                <IconCopy
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </Button>
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
