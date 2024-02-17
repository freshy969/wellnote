import { ActionIcon, Card, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React from "react";
import { useEffect, useState } from "react";
import classes from "./Note.module.css";

export function EditNote({ doc }: any) {
  const [lazyNote, setLazyNote] = useState<any>(null);

  useEffect(() => {
    const importLazyComponent = async () => {
      const note = await import("../components/Editor/TextEditor");
      setLazyNote(
        React.createElement(note.TextEditor, {
          update: true,
          id: doc.id,
          content: doc.data().content,
        })
      );
    };

    importLazyComponent();
  }, []);

  const [edit, setEdit] = useState(false);

  return edit ? (
    <>{lazyNote}</>
  ) : (
    <>
      <Card withBorder className={classes.card}>
        <Card.Section pl={"md"} py={"xs"} withBorder>
          <ActionIcon variant={"default"} onClick={() => setEdit(true)}>
            <IconPencil size={15} />
          </ActionIcon>
        </Card.Section>
        <Text dangerouslySetInnerHTML={{ __html: doc.data().content }}></Text>
      </Card>
    </>
  );
}
