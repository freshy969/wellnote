import {
  TextInput,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
  Tabs,
  Divider,
  Flex,
  ColorSwatch,
  Popover,
  ColorPicker,
  Select,
  Grid,
  Card,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconNote,
  IconStar,
  IconSettings,
  IconDatabase,
  Icon360,
} from "@tabler/icons-react";
import classes from "./NavSearch.module.css";
import mobileClasses from "./NavSearchMobile.module.css";

import { useBearStore } from "../../utils/state";
import { useEffect, useState } from "react";
import { CollectionModal } from "./Collection";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../utils/dexie/config";

function Settings() {
  const setColor = useBearStore((state: any) => state.setColor);
  const setDrawerSize = useBearStore((state: any) => state.setDrawerSize);
  const color = useBearStore((state: any) => state.color);

  return (
    <>
      <Tabs variant={"pills"} orientation="vertical" defaultValue="general">
        <Tabs.List>
          <Tabs.Tab
            // bg={"green"}

            color={color == "lime" ? "green" : color}
            value="general"
            py={rem(7)}
            leftSection={<Icon360 size={16} stroke={1.5} />}
          >
            <Text size="xs">General</Text>
          </Tabs.Tab>
          <Tabs.Tab
            color={color == "lime" ? "green" : color}
            py={rem(7)}
            value="database"
            leftSection={<IconDatabase size={16} stroke={1.5} />}
          >
            <Text size="xs">Database</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Divider ml={"sm"} orientation={"vertical"} />

        <Tabs.Panel ml={"sm"} p={"lg"} pt={0} pl={0} value="general">
          <Text
            td={"underline"}
            style={{ textUnderlineOffset: rem(5) }}
            unselectable={"on"}
            size={"sm"}
          >
            General
          </Text>
          <Flex justify={"space-between"} mt={"md"} align={"center"}>
            <Text size={"sm"}>App accent color</Text>
            <div>
              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ColorSwatch color={color} />
                </Popover.Target>
                <Popover.Dropdown
                  pt={0}
                  p={rem(5)}
                  bg="var(--mantine-color-body)"
                >
                  <ColorPicker
                    withPicker={false}
                    onColorSwatchClick={(color) => {
                      setColor(color);
                      window.localStorage.setItem("accentColor", color);
                    }}
                    format="hex"
                    swatches={[
                      "#2e2e2e",
                      "#868e96",
                      "#fa5252",
                      "#e64980",
                      "#be4bdb",
                      "#7950f2",
                      "#4c6ef5",
                      "#228be6",
                      "#15aabf",
                      "#12b886",
                      "#40c057",
                      "#82c91e",
                      "#fab005",
                      "#fd7e14",
                    ]}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </Flex>
          <Flex justify={"space-between"} mt={"md"} align={"center"}>
            <Text size={"sm"}>Drawer size</Text>
            <div>
              <Select
                size={"xs"}
                defaultValue={window.localStorage.getItem("drawerSize") || "lg"}
                placeholder={"Choose size"}
                data={[
                  { value: "lg", label: "Normal" },
                  { value: "100%", label: "Full screen" },
                ]}
                required
                allowDeselect={false}
                onChange={(value: any) => {
                  setDrawerSize(value);
                  window.localStorage.setItem("drawerSize", value);
                }}
              />
            </div>
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel ml={"sm"} p={"lg"} pt={0} pl={0} value="database">
          <Text
            td={"underline"}
            style={{ textUnderlineOffset: rem(5) }}
            unselectable={"on"}
            size={"sm"}
          >
            Database
          </Text>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export function NavbarSearch() {
  const setActiveTab = useBearStore((state: any) => state.setActiveTab);
  const activeTab = useBearStore((state: any) => state.activeTab);
  const setActiveTag = useBearStore((state: any) => state.setActiveTag);
  const activeTag = useBearStore((state: any) => state.activeTag);
  const openModal = useBearStore((state: any) => state.openModal);
  const setSearch = useBearStore((state: any) => state.setSearch);
  const store = useBearStore();

  const [settings, setSettings] = useState(<Settings />);

  useEffect(() => {
    setSettings(<Settings />);
  }, [store.color]);

  const links = [
    {
      icon: IconNote,
      label: "Notes",
      notifications: useBearStore((state) => state.noteCount),
      action: () => {
        setActiveTab("notes");
      },
    },
    {
      icon: IconStar,
      label: "Favourites",
      notifications: useBearStore((state) => state.favouriteCount),
      action: () => {
        setActiveTab("favourites");
      },
    },
    {
      icon: IconSettings,
      label: "Settings",
      notifications: null,
      action: () => {
        openModal("Settings", settings, "lg");
      },
    },
  ];

  const collections = useLiveQuery(() => db.collections.toArray());

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={link.action}
      key={link.label}
      className={classes.mainLink}
      {...(link.label.toLowerCase() == activeTab
        ? { c: store.color == "lime" ? "green" : store.color }
        : {})}
    >
      <div className={classes.mainLinkInner}>
        <link.icon
          {...(link.label.toLowerCase() == activeTab
            ? { color: store.color }
            : {})}
          size={20}
          className={classes.mainLinkIcon}
          stroke={1.5}
        />
        <span>{link.label}</span>
      </div>
      {link.notifications}
    </UnstyledButton>
  ));

  const collectionLinks = collections?.map((collection) => (
    <UnstyledButton
      className={classes.mainLink}
      onClick={() => {
        setActiveTag(collection.name);
      }}
      style={{ ...(collection.name == activeTag ? { color: store.color } : {}) }}
    >
      <Flex justify={"start"} gap={rem(10)} align={"center"}>
        <Text size="sm">{collection.emoji}</Text>
        <Text size="xs">{collection.name}</Text>
      </Flex>
    </UnstyledButton>
  ));

  return (
    <nav className={classes.navbar}>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        rightSectionWidth={70}
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group
          mb={"xs"}
          className={classes.collectionsHeader}
          justify="space-between"
        >
          <Text size="xs" fw={500} c="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon
              onClick={() => {
                openModal("Add collection", <CollectionModal />, "lg");
              }}
              variant="default"
              size={18}
            >
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Card p={"sm"} withBorder bg={"transparent"} m={"md"}>
          {collections && collections?.length > 0 ? (
            collectionLinks
          ) : (
            <UnstyledButton
              className={classes.mainLink}
              onClick={() => {
                openModal("Add collection", <CollectionModal />, "lg");
              }}
            >
              <Flex justify={"start"} gap={rem(10)} align={"center"}>
                <IconPlus
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Text size="xs">Add new</Text>
              </Flex>
            </UnstyledButton>
          )}
        </Card>
      </div>
    </nav>
  );
}

export function NavbarSearchMobile() {
  const setActiveTab = useBearStore((state: any) => state.setActiveTab);
  const activeTab = useBearStore((state: any) => state.activeTab);
  const openModal = useBearStore((state: any) => state.openModal);

  const links = [
    {
      icon: IconNote,
      label: "Notes",
      notifications: useBearStore((state) => state.noteCount),
      action: () => {
        setActiveTab("notes");
      },
    },
    {
      icon: IconStar,
      label: "Favourites",
      notifications: useBearStore((state) => state.favouriteCount),
      action: () => {
        setActiveTab("favourites");
      },
    },
    { icon: IconSettings, label: "Settings", notifications: null },
  ];

  const collections = [
    { emoji: "👍", label: "Sales" },
    { emoji: "🚚", label: "Deliveries" },
    { emoji: "💸", label: "Discounts" },
    { emoji: "💰", label: "Profits" },
    { emoji: "✨", label: "Reports" },
    { emoji: "🛒", label: "Orders" },
  ];

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={link.action}
      key={link.label}
      className={mobileClasses.mainLink}
      {...(link.label.toLowerCase() == activeTab ? { c: "lime" } : {})}
    >
      <div className={mobileClasses.mainLinkInner}>
        <link.icon
          size={20}
          className={mobileClasses.mainLinkIcon}
          stroke={1.5}
        />
        <span>{link.label}</span>
      </div>
      {link.notifications}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a href="#" key={collection.label} className={mobileClasses.collectionLink}>
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
  ));

  return (
    <nav className={mobileClasses.navbar}>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        rightSectionWidth={70}
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />

      <div className={mobileClasses.section}>
        <div className={mobileClasses.mainLinks}>{mainLinks}</div>
      </div>

      <div className={mobileClasses.section}>
        <Group
          mb={"xs"}
          className={mobileClasses.collectionsHeader}
          justify="space-between"
        >
          <Text size="xs" fw={500} c="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon
              onClick={() => {
                openModal(
                  "Manage collections",
                  <>
                    <Text size="xs">
                      Collections serve as tags or organized groups for related
                      notes. Prior to creating a note, simply choose the
                      relevant collection. Alternatively, you can add a note to
                      any collection by tapping the three dots on the note.
                    </Text>
                    <Grid mt={"xs"}>
                      <Grid.Col span={2}>{collectionLinks}</Grid.Col>
                      <Grid.Col span={"auto"}></Grid.Col>
                    </Grid>
                  </>,
                  "lg"
                );
              }}
              variant="default"
              size={18}
            >
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={mobileClasses.collections}>{collectionLinks}</div>
      </div>
    </nav>
  );
}
