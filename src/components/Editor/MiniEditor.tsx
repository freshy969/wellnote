import { Button, rem } from "@mantine/core";
import "./styles.scss";

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useBearStore } from "../../utils/state";
import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

export const Editor = ({ read }: any) => {
  
  const setMessage = useBearStore((state) => state.setMessage);
  const note = useBearStore((state) => state.note);

  const editor = useEditor({
    extensions: [
      StarterKit as any,
      Placeholder.configure({
        placeholder: "Write something",
        considerAnyAsEmpty: true,
      }),
    ],
    content: note && read == true ? note.content : "",
    onUpdate: (instance) => {
      setMessage(instance.editor.getHTML());
    },
    autofocus: true,
  });

  useEffect(() => {
    if (editor) {
      editor
        .chain()
        .setContent(note && read ? `${note.content}` : "")
        .run();
    }
  }, [note, editor]);

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button
            variant={editor.isActive("codeBlock") ? "filled" : "default"}
            size={"compact-xs"}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            code
          </Button>
          <Button
            variant={editor.isActive("bold") ? "filled" : "default"}
            size={"compact-xs"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            bold
          </Button>
          <Button
            variant={editor.isActive("italic") ? "filled" : "default"}
            size={"compact-xs"}
            ml={rem(1)}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            italic
          </Button>
          <Button
            variant={editor.isActive("strike") ? "filled" : "default"}
            size={"compact-xs"}
            ml={rem(1)}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            strike
          </Button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
}
