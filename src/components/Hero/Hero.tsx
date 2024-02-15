import {
  Title,
  Button,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  return (
    <div className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          A <span className={classes.highlight}>minimal,</span> simple <br />{" "}
          password and notes manager
        </Title>
        <Text c="dimmed" mt="md">
          Safely store passwords and notes with ease. Simple interface, strong
          security. Access anywhere. Effortless management for a seamless online
          experience. Try it now!
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Cloud based</b> – no worry about multi-device sync
          </List.Item>
          <List.Item>
            <b>Free and open source</b> – public and validated by you
          </List.Item>
          <List.Item>
            <b>Super little pricing</b> – resonable pricing
          </List.Item>
        </List>

        <div style={{ marginTop: rem(30) }}>
          <Button
            radius="xl"
            size="md"
            onClick={() => navigate("/join")}
            className={classes.control}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
