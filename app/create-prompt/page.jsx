"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import Form from '../../components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok && isReady) {  // Vérifiez si le routeur est prêt avant de rediriger
        await mutate('/api/prompt'); // Revalidez les données du feed
        router.push('/');           // Navigation sécurisée
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return <p>Loading...</p>; // Affiche un message de chargement tant que le routeur n'est pas prêt
  }

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
