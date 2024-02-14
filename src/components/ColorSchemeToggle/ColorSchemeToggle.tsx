"use client";

import { rem, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {colorScheme == "dark" ? (
        <IconSunFilled
          onClick={() => toggleColorScheme()}
          style={{ marginRight: rem(10), cursor: "pointer" }}
        />
      ) : (
        <IconMoonFilled
          onClick={() => toggleColorScheme()}
          style={{ marginRight: rem(10), cursor: "pointer" }}
        />
      )}
    </>
  );
}
