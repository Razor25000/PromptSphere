"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

import Form from '../../components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [redirectToHome, setRedirectToHome] = useState(false);

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

      if (response.ok) {
        await mutate('/api/prompt');  // Trigger a revalidation
        setRedirectToHome(true);  // Set the redirect flag
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectToHome) {
      window.location.href = '/';  // Perform the redirection client-side
    }
  }, [redirectToHome]);

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
