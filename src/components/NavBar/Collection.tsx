import { TextInput, Text, rem, Divider, Flex, Button } from "@mantine/core";

import { useState } from "react";
import { db } from "../../utils/dexie/config";
import { useLiveQuery } from "dexie-react-hooks";
import { useBearStore } from "../../utils/state";

export function CollectionModal({ select, noteId }: { select: boolean, noteId: any }) {
  const [newCollection, setNewCollection] = useState("");
  const [newEmoji, setNewEmoji] = useState("#️⃣");
  const closeModal = useBearStore((state: any) => state.closeModal);
  const setActiveTag = useBearStore((state: any) => state.setActiveTag);
  const setActiveTagId = useBearStore((state: any) => state.setActiveTagId);
  const activeTag = useBearStore((state: any) => state.activeTag);
  const store = useBearStore();

  const collections = useLiveQuery(() => db.collections.toArray());

  const dude = collections?.map((collection) => (
    <Button
      onClick={
        select
          ? async () => {
              await db.notes.update(noteId, { collectionId: collection.id! });
              setActiveTag(collection.name), 
              setActiveTagId(collection.id), 
              closeModal();
            }
          : () => {}
      }
      variant={"default"}
      size={"xs"}
      mr={rem(10)}
      mb={rem(10)}
      style={{
        ...(collection.name == activeTag ? { color: store.color } : {}),
      }}
    >
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
                  emoji: newEmoji,
                });
                setNewEmoji("#️⃣");
                setNewCollection("");
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
