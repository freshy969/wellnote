import { TextInput, Button, rem } from "@mantine/core";
import classes from "./Join.module.css";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper, Title, Text, Container, Group, Flex } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useBearStore } from "../utils/state";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../utils/firebase/config";

function Join() {
  const [email, setEmail] = useState("");

  const actionCodeSettings = {
    url: "https://dolph-69334.web.app/",
    // url: "http://localhost:5173",
    handleCodeInApp: true,
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((response) => {
        console.log(response)
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        If there's no account, a new one gets created.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form method="post">
          <TextInput
            labelProps={{ mb: rem(5) }}
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com"
            required
          />
          <Group justify="space-between" mt="lg">
            <Text size="xs" c="dimmed">
              Unless you explicitly log out, your session will persist. Your
              email is kept confidential and not shared elsewhere, ensuring the
              security of your data.
            </Text>
          </Group>
          <Button
            type={"submit"}
            fullWidth
            variant="outline"
            color="teal"
            mt="xl"
            onClick={onSubmit}
          >
            Get access link
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

const Countdown = () => {
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return <>{countdown}</>;
};

function Ready(props: { take: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.take) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  return (
    <Container size={420} my={40}>
      <>
        <Title ta="center" className={classes.title}>
          You're logged in!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          You're logged in
        </Text>
      </>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Flex justify={"center"}>
          <IconCircleCheck size={30} color={"green"} />
        </Flex>
        <Flex justify={"center"} mt={"lg"}>
          {props.take ? (
            <div>
              <Text size="xs">
                You are taken to home in <Countdown />
              </Text>
            </div>
          ) : (
            <Anchor size="xs" ta={"center"} onClick={() => navigate("/")}>
              Take me to {"/"}
            </Anchor>
          )}
        </Flex>
      </Paper>
    </Container>
  );
}

export default function Login() {
  const user = useBearStore((state: any) => state.user);
  if (user && user !== null && user !== undefined) {
    return <Ready take={true} />;
  }
  return <Join />;
}
