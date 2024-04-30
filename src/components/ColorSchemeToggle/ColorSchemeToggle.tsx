"use client";

import { rem, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {colorScheme == "dark" ? (
        <IconSunFilled
          onClick={() => toggleColorScheme()}
          style={{ marginRight: isSmallScreen ? rem(10) : 0, cursor: "pointer" }}
        />
      ) : (
        <IconMoonFilled
          onClick={() => toggleColorScheme()}
          style={{ marginRight: isSmallScreen ? rem(10) : 0, cursor: "pointer" }}
        />
      )}
    </>
  );
}
