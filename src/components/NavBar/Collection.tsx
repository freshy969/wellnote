import { TextInput, Text, rem, Divider, Flex, Button } from "@mantine/core";

import { useState } from "react";
import { db } from "../../utils/dexie/config";
import { useLiveQuery } from "dexie-react-hooks";

export function CollectionModal() {
  const [newCollection, setNewCollection] = useState("");
  const [newEmoji, setNewEmoji] = useState("#️⃣");

  const collections = useLiveQuery(() =>
    db.collections.toArray()
  );

  const dude = collections?.map((collection) => (
    <Button variant={"default"} size={"xs"} mr={rem(10)} mb={rem(10)}>
      <Flex align={"center"} gap={rem(10)}>
        <div>{collection.emoji}</div>
        <div>{collection.name}</div>
      </Flex>
    </Button>
  ));

  return (
    <>
      <Text size="xs">
        Collections serve as tags or organized groups for related notes. Prior
        to creating a note, simply choose the relevant collection.
        Alternatively, you can add a note to any collection by tapping the three
        dots on the note.
      </Text>
      <Divider
        mt={"sm"}
        label={"Add or select one to edit"}
        labelPosition={"left"}
      />
      <div style={{ marginTop: rem(10) }}>
        <Flex w={"100%"} align={"center"} gap={rem(10)}>
          <TextInput
            defaultValue={newEmoji}
            onChange={(v) => {
                setNewEmoji(v.currentTarget.value);
              }}
            size="xs"
            w={"30%"}
            placeholder="Emoji"
          />
          <TextInput
            onChange={(v) => {
              setNewCollection(v.currentTarget.value);
            }}
            size="xs"
            w={"100%"}
            placeholder="Name"
            value={newCollection}
          />
          <div>
            <Button
              disabled={newCollection == ""}
              variant={"default"}
              size="xs"
              onClick={async () => {
                await db.collections.add({
                  name: newCollection,
                  emoji: newEmoji
                });
                setNewEmoji("#️⃣")
                setNewCollection("")
              }}
            >
              Add
            </Button>
          </div>
        </Flex>
      </div>
      <Divider
        mt={"sm"}
        label={"Existing collections"}
        labelPosition={"left"}
      />
      <div style={{ marginTop: rem(10) }}>{dude}</div>
    </>
  );
}
