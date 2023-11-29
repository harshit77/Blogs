"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Tiptap from "./TipTap";
import { useRouter } from "next/navigation";
import { HTMLContent } from "@tiptap/react";

export default function PostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTipTapChange = (richContent: HTMLContent) =>
    setFormData((prev) => ({
      ...prev,
      ["content"]: richContent,
    }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      toast({
        title: "Greetings",
        description: "Record Created Successfully",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
        Create a new post
      </h1>
      <div className="space-y-4">
        <Input
          name="title"
          className="text-xl tracking-tight"
          placeholder="Enter title "
          onChange={handleChange}
        />
        <Tiptap handleChange={handleTipTapChange} />
      </div>
      <Button variant="secondary" type="submit">
        Create a Post
      </Button>
    </form>
  );
}
