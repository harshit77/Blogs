"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "@/components/Toolbar";

const Tiptap = ({
  handleChange,
}: {
  handleChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "m-4 p-4 list-decimal",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "m-4 p-4 list-disc",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Please write your awesome content here ...",
        emptyEditorClass: "is-editor-empty text-xl ",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "rounded-md min-h-[150px] px-3 py-2 border-input min-h-[250px] rounded-md border border-input bg-background text-sm outline-none",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
