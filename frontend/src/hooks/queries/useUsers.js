import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/services/userService";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });
};
