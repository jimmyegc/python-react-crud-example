import "./UserTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from '../components/ui'
export const UserTable = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="user-table-container">
      <h2 className="text-xl mb-2">Usuarios</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id.slice(-6)}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Button
                  icon={FaEdit}
                  onClick={() => handleEdit(u)}
                >Editar
                </Button>
                {" "}
                <Button
                  icon={FaTrash}
                  onClick={() => handleDelete(u._id)}
                >
                  Eliminar
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

