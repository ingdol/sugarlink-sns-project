import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api";
import { IComment, NewCommentDTO } from "../types";
import { COMMENT_KEY } from "../key";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<IComment, Error, NewCommentDTO>({
    mutationFn: createComment,
    onSuccess: () => {
      console.log("댓글 생성 성공");
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY],
      });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
