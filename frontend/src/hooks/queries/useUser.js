import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/services/userService";
import { User } from "../../types/user";

export const useUser = (id: string | number) => {
  return useQuery < User > ({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // solo corre si hay id
  });
};
