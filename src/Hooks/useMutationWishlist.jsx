import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useMutationWishlist(fn) {
  let queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getwishlist'] });
    },
  });
}