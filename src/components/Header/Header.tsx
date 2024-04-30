import { Title, Container, Flex, Menu, Group, Image } from "@mantine/core";
import { IconSquareRounded } from "@tabler/icons-react";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import classes from "./Header.module.css";
import loginIcon from "../../wellnote.svg";
import { NavbarSearchMobile } from "../NavBar/NavSearch";
import { useMediaQuery } from "@mantine/hooks";

function Logo({ opacity }: any) {
  return (
    <>
      <Group gap={"xs"} align={"center"}>
        <Image w={"40px"} opacity={opacity ? opacity : 1} src={loginIcon} />
        <Title
          opacity={opacity ? opacity : 1}
          style={{ cursor: "pointer" }}
          className={classes.title}
          onClick={() => {
            if (window.location.pathname != "/") {
              window.location.replace("/");
            }
          }}
        >
          Wellnote
        </Title>
      </Group>
    </>
  );
}

function Header() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
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
            {isSmallScreen ? (
              <Menu
                withArrow
                position="bottom-end"
                shadow="md"
                transitionProps={{ transition: "pop" }}
              >
                <Menu.Target>
                  <IconSquareRounded style={{ cursor: "pointer" }} />
                </Menu.Target>
                <Menu.Dropdown>
                  <NavbarSearchMobile />
                </Menu.Dropdown>
              </Menu>
            ) : (
              <></>
            )}
          </Flex>
        </Container>
      </header>
    </>
  );
}

export { Logo, Header };
