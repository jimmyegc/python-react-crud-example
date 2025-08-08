
const API = import.meta.env.VITE_REACT_APP_API

export function useCreateUser() {
  const createUser = async (userData) => {
    const res = await fetch(`${ API }/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al crear usuario");
    }

    return res.json();
  };

  return { createUser };
}