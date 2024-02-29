import {
  Text,
  Container,
} from "@mantine/core";
import classes from "./FooterLinks.module.css";

export function FooterLinks() {
  return (
    <footer className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
          <Text size="xs" c="dimmed" >
            😎
          </Text>
      </Container>
    </footer>
  );
}
