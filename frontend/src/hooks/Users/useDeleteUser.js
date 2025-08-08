export function useDeleteUser() {
  const deleteUser = async (userId) => {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al eliminar usuario");
    }

    return res.json();
  };

  return { deleteUser };
}
