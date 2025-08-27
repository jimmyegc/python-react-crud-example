import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../api/services/userService";
import { User } from "../../types/user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: Partial<User>) => userService.createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
