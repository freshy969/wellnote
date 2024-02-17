import {
  Button,
  Flex,
  Menu,
  Text,
  PasswordInput,
  TextInput,
  rem,
  Group,
  CopyButton,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { addPassword, updatePassword } from "../query/passwords";
import { useBearStore } from "../utils/state";
import {
  IconArrowBack,
  IconCheck,
  IconDots,
  IconMessages,
  IconSquareRoundedLetterP,
  IconSquareRoundedLetterU,
} from "@tabler/icons-react";

export function Password({ item }: any) {
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  return (
    <Flex justify={"space-between"} align={"center"}>
      <div
        onClick={() => {
          openDrawer("Password", <EditPassword item={item} />);
        }}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <Group>
          {/* <Button
            variant={"default"}
            size={"compact-sm"}
            color="gray"
            onClick={() => {
              openDrawer("Password", <EditPassword item={item} />);
            }}
          >
            <Text size={"xs"}>Open</Text>
          </Button> */}
          <Flex direction={"column"}>
            <Text size={"sm"} lineClamp={1}>
              {item.data().username}
            </Text>

            <Text size={"xs"} lineClamp={1}>
              {item.data().website}
            </Text>
          </Flex>
        </Group>
      </div>

      <div>
        <Flex gap={rem(8)} align={"center"}>
          <CopyButton value={item.data().username} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Username copied" : "Copy username"}
                withArrow
                position="left"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant={"subtle"}
                  onClick={copy}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconSquareRoundedLetterU style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>

          <CopyButton value={item.data().password} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Password copied" : "Copy password"}
                withArrow
                position="left"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant={"subtle"}
                  onClick={copy}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconSquareRoundedLetterP style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>

          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant={"subtle"}>
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
        </Flex>
      </div>
    </Flex>
  );
}

export function EditPassword({ item }: any) {
  const user = useBearStore((state: any) => state.user);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);
  const [password, setPassword] = useState<any>(item.data().password);
  const [website, setWebsite] = useState<any>(item.data().website);
  const [username, setUsername] = useState<any>(item.data().username);
  const [disabled, disable] = useState(true);

  useEffect(() => {
    const action =
      username != item.data().username ||
      password != item.data().password ||
      website != item.data().website;
    disable(!action);
  }, [username, password, website]);

  return (
    <>
      <TextInput
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
        type={"url"}
        radius={"md"}
        defaultValue={item.data().website}
      />
      <TextInput
        placeholder="Username/Email"
        type="text"
        mt={"sm"}
        onChange={(e) => setUsername(e.target.value)}
        radius={"md"}
        defaultValue={item.data().username}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        mt={"sm"}
        radius={"md"}
        placeholder="Password"
        defaultValue={item.data().password}
      />
      <div>
        <Button
          onClick={async () => {
            await updatePassword(
              item.id,
              website,
              username,
              password,
              user.uid
            );
            closeDrawer();
          }}
          variant={"default"}
          mt={"sm"}
          size="xs"
          radius={"md"}
          disabled={disabled}
        >
          Update
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
