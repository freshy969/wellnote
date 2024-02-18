import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Title,
  Divider,
} from "@mantine/core";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import classes from "./FooterLinks.module.css";

function Logo() {
  return (
    <>
      <Title style={{ cursor: "pointer" }} className={classes.title}>
        dolph
      </Title>
    </>
  );
}

export function FooterLinks() {
  return (
    <footer className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text size="xs" c="dimmed" className={classes.description}>
            A minimal, simple password and notes manager
          </Text>
        </div>
        {/* <div className={classes.groups}>{groups}</div> */}
      </Container>
      <Divider mt={rem(40)} mb={"xl"} />
      <Container size={"lg"} className={classes.afterFooter}>
        <Text c="dimmed" size="xs">
          Open source project
        </Text>

        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithubFilled
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
