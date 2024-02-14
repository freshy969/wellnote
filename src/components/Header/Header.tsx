import { Title, Container, Flex, Menu } from "@mantine/core";
import classes from "./Header.module.css";
import {
  IconSquareRounded,
  IconSquareRoundedFilled,
} from "@tabler/icons-react";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";

function Logo() {
  return (
    <>
      <Title
        style={{ cursor: "pointer" }}
        className={classes.title}
      >
        dolph
      </Title>
    </>
  );
}

function Header({ user }:any) {
  return (
    <>
      <header
        className={classes.header}
        style={{
          opacity: 1,
          cursor: "auto",
          pointerEvents: "auto",
        }}
      >
        <Container size="lg" className={classes.inner}>
          <Flex align={"center"}>
            <Logo />
          </Flex>
          <Flex align={"center"}>
            <ColorSchemeToggle />
            <Menu
              withArrow
              position="bottom-end"
              shadow="md"
              width={180}
              transitionProps={{ transition: "pop" }}
            >
              <Menu.Target>
                {user ? (
                  <IconSquareRoundedFilled
                    style={{ color: "green", cursor: "pointer" }}
                  />
                ) : (
                  <IconSquareRounded style={{ cursor: "pointer" }} />
                )}
              </Menu.Target>
              <Menu.Dropdown></Menu.Dropdown>
            </Menu>
          </Flex>
        </Container>
      </header>
    </>
  );
}

export { Logo, Header };
