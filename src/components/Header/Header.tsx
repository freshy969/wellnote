import { Title, Container, Flex, Menu } from "@mantine/core";
import {
  IconSquareRounded,
  IconSquareRoundedFilled,
} from "@tabler/icons-react";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/config";
import { useBearStore } from "../../utils/state";

function Logo() {
  const navigate = useNavigate();
  return (
    <>
      <Title
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
        className={classes.title}
      >
        dolph
      </Title>
    </>
  );
}

function Header({ user }: any) {
  const navigate = useNavigate();
  const { reset } = useBearStore();
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
              <Menu.Dropdown>
                {!user ? (
                  <Menu.Item
                    onClick={() => {
                      navigate("/join");
                    }}
                  >
                    Join
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    onClick={() => {
                      signOut(auth);
                      reset();
                    }}
                  >
                    Sign out
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Container>
      </header>
    </>
  );
}

export { Logo, Header };
