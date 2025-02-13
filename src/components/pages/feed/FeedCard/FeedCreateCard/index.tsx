"use client";

import FeedForm from "@/components/pages/feed/FeedForm";
import { NewFeedDTO } from "@/services/feed";
import { useCreateFeed } from "@/services/feed/hooks";
import { handleImageUpload } from "@/services/storage/utils";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useFeedStore } from "@/stores/feed/useFeedStore";
import React from "react";

export default function FeedCreateCard() {
  const { content, imageFile, imagePreview, resetForm } = useFeedStore();
  const { user } = useAuthStore();
  const { mutateAsync: createFeedMutate, isPending: isCreating } =
    useCreateFeed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !content) return;

    try {
      const uploadedImageUrl = imageFile
        ? await handleImageUpload(imageFile)
        : imagePreview;
      if (user) {
        const newFeedData: NewFeedDTO = {
          user_id: user.id,
          feed_content: content,
          feed_image: uploadedImageUrl,
        };
        await createFeedMutate(newFeedData);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating Feed:", (error as Error).message);
    }
  };

  return <FeedForm isLoading={isCreating} onSubmit={handleSubmit} />;
}
