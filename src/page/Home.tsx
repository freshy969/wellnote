import { Tabs, rem, Title } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";
// import TextEditor from "../components/Editor/TextEditor";
import { useEffect, useState } from "react";

export default function Home() {
  const iconStyle = { width: rem(12), height: rem(12) };

  const [LazyComponent, setLazyComponent] = useState<any>(null);

  useEffect(() => {
    const importLazyComponent = async () => {
      const component = await import("../components/Editor/TextEditor");
      setLazyComponent(React.createElement(component.TextEditor));
    };

    importLazyComponent();
  }, []);

  return (
    <Tabs
      mt={"lg"}
      variant="pills"
      radius="md"
      orientation="vertical"
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

      <Tabs.Panel pl={"lg"} value="passwords">
        <Title>Passwords</Title>
      </Tabs.Panel>

      <Tabs.Panel pl={"lg"} value="notes">
        <Title>Notes</Title>
        {LazyComponent ? LazyComponent : null}
      </Tabs.Panel>

      <Tabs.Panel pl={"lg"} value="files">
        <Title>Files</Title>
      </Tabs.Panel>
    </Tabs>
  );
}
