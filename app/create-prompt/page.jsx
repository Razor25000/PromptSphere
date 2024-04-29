"use client";
// use client
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"; // Correction du chemin d'importation pour useRouter
import { useSWRConfig } from 'swr'; // Importation pour la revalidation des données

import Form from "../../components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();  // Utilisation de mutate pour la revalidation

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, // Assurez-vous d'inclure les headers
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        await mutate('/api/prompt'); // Revalidez les données du feed après la création réussie
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
