import {
  Tabs,
  Button,
  rem,
  Title,
  Divider,
  Text,
  SimpleGrid,
  Card,
  TextInput,
  Drawer,
  PasswordInput,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [opened, { open, close }] = useDisclosure(false);
  const [LazyComponent, setLazyComponent] = useState<any>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    const importLazyComponent = async () => {
      const component = await import("../components/Editor/TextEditor");
      setLazyComponent(React.createElement(component.TextEditor));
    };

    importLazyComponent();
  }, []);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={"Add password"}
        position={"right"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <TextInput placeholder="Website" type={"url"} radius={"md"} />
        <TextInput
          placeholder="Username/Email"
          type="text"
          mt={"sm"}
          radius={"md"}
        />
        <PasswordInput mt={"sm"} radius={"md"} placeholder="Password" />
        <Button w={"20%"} variant={"default"} mt={"sm"} radius={"md"}>
          Submit
        </Button>
      </Drawer>
      <Tabs
        mt={"lg"}
        variant="pills"
        radius="md"
        orientation={isSmallScreen ? "horizontal" :"vertical"}
        defaultValue="passwords"
      >
        <Tabs.List>
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
        </Tabs.List>

        <Tabs.Panel mt={isSmallScreen ? "sm" : 0} pl={isSmallScreen ? 0 : "lg"} value="passwords">
          <Title>Passwords</Title>
          <Text size={"xs"} c={"dimmed"}>
            Simple password management
          </Text>
          <Button
            onClick={() => {
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

        <Tabs.Panel mt={isSmallScreen ? "sm" : 0} pl={isSmallScreen ? 0 : "lg"}  value="notes">
          <Title>Notes</Title>
          <Text size={"xs"} c={"dimmed"}>
            Easy notes
          </Text>
          <Button variant={"default"} mt={"sm"} radius={"md"} size="xs">
            Add new
          </Button>
          <Divider mt={"sm"} />
          {LazyComponent ? LazyComponent : null}
        </Tabs.Panel>

        <Tabs.Panel mt={isSmallScreen ? "sm" : 0} pl={isSmallScreen ? 0 : "lg"}  value="files">
          <Title>Files</Title>
          <Text size={"xs"} c={"dimmed"}>
            Secure file storage
          </Text>
          <Button variant={"default"} mt={"sm"} radius={"md"} size="xs">
            Upload new
          </Button>
          <Divider mt={"sm"} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
