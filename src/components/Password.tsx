import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { addPassword } from "../query/passwords";
import { useBearStore } from "../utils/state";

export function Password({ close }:any) {
  const user = useBearStore((state: any) => state.user);
  const [password, setPassword] = useState<any>("");
  const [website, setWebsite] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  return (
    <>
      <TextInput
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
        type={"url"}
        radius={"md"}
      />
      <TextInput
        placeholder="Username/Email"
        type="text"
        mt={"sm"}
        onChange={(e) => setUsername(e.target.value)}
        radius={"md"}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        mt={"sm"}
        radius={"md"}
        placeholder="Password"
      />
      <div>
        <Button
          onClick={async () => {
            await addPassword(website, username, password, user.uid);
            close();
          }}
          variant={"default"}
          mt={"sm"}
          size="xs"
          radius={"md"}
        >
          Submit
        </Button>

        <Button
          variant={"default"}
          mt={"sm"}
          ml={"xs"}
          onClick={close}
          size="xs"
          radius={"md"}
        >
          Close
        </Button>
      </div>
    </>
  );
}
