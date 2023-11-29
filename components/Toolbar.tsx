"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  List,
  Italic,
  ListOrdered,
  Heading2,
  Code,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  editor: Editor | null;
}
export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <div className="mt-10 mb-2 border border-input">
      <Toggle
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        size="sm"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bold")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderList")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("code")}
        size="sm"
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="w-4 h-4" />
      </Toggle>
    </div>
  );
}
