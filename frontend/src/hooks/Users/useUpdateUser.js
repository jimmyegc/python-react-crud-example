export function useUpdateUser() {
  const updateUser = async (userId, updatedData) => {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al actualizar usuario");
    }

    return res.json();
  };

  return { updateUser };
}
