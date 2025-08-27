import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../api/services/userService";
import { User } from "../../types/user";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, user }: { id: string | number; user: Partial<User> }) =>
      userService.updateUser(id, user),
    onSuccess: (_, variables) => {
      // Invalida lista y detalle de ese usuario
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
};
