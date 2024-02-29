import {
  Tabs,
  Button,
  rem,
  Title,
  Text,
  Card,
  Flex,
  ScrollArea,
  Grid,
} from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import React from "react";
import { useEffect, useState } from "react";
import { readNotes } from "../query/notes";
import { random } from "../utils/generic/helper";
import { useBearStore } from "../utils/state";
import { Note } from "../components/Note";
import { TextEditor } from "../components/Editor/TextEditor";

export default function Home({ user }: any) {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [notes, setNotes] = useState<any>([]);
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const openDrawer = useBearStore((state: any) => state.openDrawer);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setNotes(await readNotes(user?.uid));
    }

    if (user?.uid) {
      fetchMyAPI();
    }
  }, [user, drawerOpen, updated]);

  const currentNotes: any = [];

  notes?.forEach((doc: any) =>
    currentNotes.push(
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Card withBorder radius={"md"} key={random()}>
          <Note doc={doc} setUpdated={setUpdated} />
        </Card>
      </Grid.Col>
    )
  );

  const noteContent = <TextEditor />

  return (
    <>
      <Tabs mt={"lg"} variant={"pills"} radius="md" defaultValue="notes">
        <Tabs.List>
          <div
            style={{
              display: "inline-flex",
              justifyItems: "center",
              overflowY: "hidden",
              overflowX: "scroll",
              whiteSpace: "nowrap",
            }}
          >
            <Tabs.Tab
              value="notes"
              leftSection={<IconMessageCircle style={iconStyle} />}
            >
              Notes
            </Tabs.Tab>
          </div>
        </Tabs.List>

        <Tabs.Panel mt={"sm"} value="notes">
          <Flex justify={"space-between"} align={"center"}>
            <div>
              <Title>Notes</Title>
            </div>
            <div>
              <Button
                onClick={() => {
                  openDrawer("Add note", noteContent, "lg");
                }}
                variant={"default"}
                // mt={"sm"}
                radius={"md"}
                size="xs"
              >
                Add new
              </Button>
            </div>
          </Flex>

          {currentNotes?.length > 0 && (
            // <ScrollArea mt={rem(5)} key={random()} h={"100%"}>
              <Grid mt={"md"} gutter={"xs"}>{currentNotes}</Grid>
            // </ScrollArea>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
