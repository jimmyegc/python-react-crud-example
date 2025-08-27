// import { useUsers } from "../../../hooks/queries/useUsers";
import { useUsers } from '../hooks/queries/useUsers'

export const UserList = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <ul>
      {users?.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
};

/*
import { useUsers } from "../hooks/queries/useUsers";
import { useCreateUser } from "../hooks/mutations/useCreateUser";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser";

export const UserList = () => {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <button
        onClick={() =>
          createUser.mutate({ name: "Nuevo", email: "nuevo@test.com", role: "user" })
        }
      >
        Crear usuario
      </button>

      <ul>
        {users?.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => deleteUser.mutate(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


*/