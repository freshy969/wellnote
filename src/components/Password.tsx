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
  Divider,
  Grid,
  Popover,
  Slider,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { addPassword, deletePassword, updatePassword } from "../query/passwords";
import { useBearStore } from "../utils/state";
import {
  IconCheck,
  IconDots,
  IconSquareRoundedLetterP,
  IconSquareRoundedLetterU,
  IconTrash,
} from "@tabler/icons-react";
import { companyIcon, random } from "../utils/generic/helper";
import React from "react";

export function Password({ item, setUpdated }: any) {
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const icon = companyIcon(item.data().website)
  return (
    <Flex justify={"space-between"} align={"center"}>
      <div
        onClick={() => {
          openDrawer("Password", <EditPassword item={item} />);
        }}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <Group>
          {React.createElement(icon, { size: 30})}
          <Flex direction={"column"}>
            <Text size={"sm"} lineClamp={1}>
              {item.data().username}
            </Text>

            <Text size={"xs"} lineClamp={1}>
              {item.data().website.toLowerCase()}
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
                onClick={async () => {
                  await deletePassword(item.id)
                  setUpdated(true)
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
      <Text mb={"sm"} c={"dimmed"}>
        View or update your saved password
      </Text>
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
  const [passLength, setPassLength] = useState(20);
  return (
    <>
      <Text mb={"sm"} c={"dimmed"}>
        Add a new password
      </Text>
      <TextInput
        label={"Website URL"}
        labelProps={{
          mb: rem(5),
        }}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
        type={"url"}
        radius={"md"}
      />
      <TextInput
        label={"Email or username"}
        labelProps={{
          mb: rem(5),
        }}
        placeholder="Email/Username"
        type="text"
        mt={"sm"}
        onChange={(e) => setUsername(e.target.value)}
        radius={"md"}
      />
      <Grid align={"end"}>
        <Grid.Col span={8}>
          <PasswordInput
            label={"Password"}
            labelProps={{
              mb: rem(5),
            }}
            onChange={(e) => setPassword(e.target.value)}
            mt={"sm"}
            radius={"md"}
            placeholder="Password"
            value={password}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Popover
            width={300}
            trapFocus
            position={"top-end"}
            withArrow
            shadow="md"
            onOpen={() => {
              setPassword(random(passLength));
            }}
          >
            <Popover.Target>
              <Button fullWidth radius={"md"}>
                <Group gap={rem(4)}>
                  <Text size={"xs"}>
                  Generate
                  </Text>
                </Group>
              </Button>
            </Popover.Target>
            <Popover.Dropdown p={"xs"}>
              <Slider
              min={5}
                defaultValue={passLength}
                onChange={(v) => {
                  setPassLength(v);
                  setPassword(random(v));
                }}
                max={50}
                labelAlwaysOn
              />
            </Popover.Dropdown>
          </Popover>
        </Grid.Col>
      </Grid>
      <Divider mt={"sm"} />
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
          disabled={!website || !username || !password}
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
