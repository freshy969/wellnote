import {
  TextInput,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconNote,
  IconStar,
  IconSettings,
} from "@tabler/icons-react";
import classes from "./NavSearch.module.css";
import mobileClasses from "./NavSearchMobile.module.css";

import { useBearStore } from "../../utils/state";

export function NavbarSearch() {
  const setActiveTab = useBearStore((state: any) => state.setActiveTab);
  const activeTab = useBearStore((state: any) => state.activeTab);

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
      className={classes.mainLink}
      { ...link.label.toLowerCase() == activeTab ? { c : "lime"} : {}}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
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
            <ActionIcon variant="default" size={18}>
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </div>
    </nav>
  );
}





export function NavbarSearchMobile() {
  const setActiveTab = useBearStore((state: any) => state.setActiveTab);
  const activeTab = useBearStore((state: any) => state.activeTab);

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
      { ...link.label.toLowerCase() == activeTab ? { c : "lime"} : {}}
    >
      <div className={mobileClasses.mainLinkInner}>
        <link.icon size={20} className={mobileClasses.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={mobileClasses.collectionLink}
    >
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
            <ActionIcon variant="default" size={18}>
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

