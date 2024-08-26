import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useMutationcart(fn) {
  let queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getcart'] });
    },
  });
}