import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import HardBreak from "@tiptap/extension-hard-break";
import { Button } from "@mantine/core";
import { addNote, updateNote } from "../../query/notes";
import { useBearStore } from "../../utils/state";

export function TextEditor({ update, id, content }: any) {
  console.log(content);
  const user = useBearStore((state: any) => state.user);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      HardBreak,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content || <></>,
  });

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            {/* <RichTextEditor.ClearFormatting /> */}
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
          {/* 
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup> */}
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
      <div>
        {!update ? (
          <Button
            onClick={async () => {
              await addNote(editor?.getHTML(), user.uid);

              closeDrawer();
            }}
            variant={"default"}
            mt={"sm"}
            size="xs"
            radius={"md"}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await updateNote(id, editor?.getHTML(), user.uid);
              closeDrawer();
            }}
            variant={"default"}
            mt={"sm"}
            size="xs"
            radius={"md"}
          >
            Update
          </Button>
        )}
        <Button
          variant={"default"}
          mt={"sm"}
          ml={"xs"}
          onClick={closeDrawer}
          size="xs"
          radius={"md"}
        >
          Close
        </Button>
      </div>
    </>
  );
}
