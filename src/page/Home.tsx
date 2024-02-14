import {
  Tabs,
  Button,
  rem,
  Title,
  Divider,
  Text,
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
  const [modalContent, setModalContent] = useState<any>("");
  const [modalTitle, setModalTitle] = useState<any>("");
  const [modalSize, setModalSize] = useState<any>("sm");

  useEffect(() => {
    const importLazyComponent = async () => {
      const component = await import("../components/Editor/TextEditor");
      setLazyComponent(React.createElement(component.TextEditor));
    };

    importLazyComponent();
  }, []);

  const passwordContent = (
    <>
      <TextInput placeholder="Website" type={"url"} radius={"md"} />
      <TextInput
        placeholder="Username/Email"
        type="text"
        mt={"sm"}
        radius={"md"}
      />
      <PasswordInput mt={"sm"} radius={"md"} placeholder="Password" />
      <div>
        <Button variant={"default"} mt={"sm"} radius={"md"}>
          Submit
        </Button>
      </div>
    </>
  );

  const noteContent = <>{LazyComponent ? LazyComponent : null}</>;

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={modalTitle}
        size={modalSize}
        position={"right"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {modalContent}
      </Drawer>
      <Tabs
        mt={"lg"}
        variant={isSmallScreen ? "outline" : "pills"}
        radius="md"
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        defaultValue="passwords"
      >
        <Tabs.List>
          <div
            style={
              isSmallScreen
                ? {
                    display: "inline-flex",
                    justifyItems: "center",
                    overflowY: "hidden",
                    overflowX: "scroll",
                    whiteSpace: "nowrap",
                  }
                : {}
            }
          >
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
          </div>
        </Tabs.List>

        <Tabs.Panel
          mt={isSmallScreen ? "sm" : 0}
          pl={isSmallScreen ? 0 : "lg"}
          value="passwords"
        >
          <Title>Passwords</Title>
          <Text size={"xs"} c={"dimmed"}>
            Simple password management
          </Text>
          <Button
            onClick={() => {
              setModalTitle("Add password");
              setModalSize("sm");
              setModalContent(passwordContent);
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

        <Tabs.Panel
          mt={isSmallScreen ? "sm" : 0}
          pl={isSmallScreen ? 0 : "lg"}
          value="notes"
        >
          <Title>Notes</Title>
          <Text size={"xs"} c={"dimmed"}>
            Easy notes
          </Text>
          <Button
            onClick={() => {
              setModalTitle("Add note");
              setModalSize("100%");
              setModalContent(noteContent);
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

        <Tabs.Panel
          mt={isSmallScreen ? "sm" : 0}
          pl={isSmallScreen ? 0 : "lg"}
          value="files"
        >
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
