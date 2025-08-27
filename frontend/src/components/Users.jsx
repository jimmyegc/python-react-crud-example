import { useEffect, useState } from 'react'

import { useUsers } from '../hooks/queries/useUsers'
import { useCreateUser } from '../hooks/Users/useCreateUser'
import { useUpdateUser } from '../hooks/Users/useUpdateUser'
import { useDeleteUser } from '../hooks/Users/useDeleteUser'
import { useUser } from '../hooks/Users/useUser'
import { UserTable } from '../components/UserTable'
import { UserForm } from "../components/UserForm";

import { Button, Modal } from '../components/ui'
import { userService } from '../api/services/userService'
import { useToast } from "../components/ui/Toast/ToastContext";


export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const { data: users, isLoading, error, refetch: fetchUsers } = useUsers();
  const { addToast } = useToast();

  //const [userId, setUserId] = useState(null)
  //const { user } = useUser(userId);
  //const [name, setName] = useState(user?.name)
  //const [email, setEmail] = useState(user?.email)
  //const [password, setPassword] = useState(user?.password)

  const handleAddUser = async () => {
    setEditingUser(null);          // No hay usuario seleccionado
    setFormData({ name: "", email: "", password: "" });
    setIsModalOpen(true);
    /*const newUser = { name, email, password };
    const created = await createUser(newUser);
    setUsers([...users, { ...newUser, _id: created.id }]);
    */
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: ""
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    await userService.deleteUser(id)
    addToast("Usuario eliminado", "error");
    fetchUsers();
  }

  /*  
    //const { users, loading, error, setUsers } = useUsers();
    //const { data: users, isLoading, error } = useUsers();
  
    const { createUser } = useCreateUser();
    
    const { updateUser } = useUpdateUser();
    const { deleteUser } = useDeleteUser();
  
    

  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (operation === 'create') {
        handleAdd();
      } else if (operation === 'update') {
        handleUpdate()
      }
    }
  
    
  
    const handleEdit = async (id) => {
      setUserId(id);
      setOperation('update')
  
    }
  
    const handleUpdate = async () => {
      const updatedUser = { name, email, password }
      updateUser(userId, updatedUser)
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, ...updatedUser } : user
        )
      );
      setOperation(null)
    }
  
    const handleDelete = async (id) => {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    }
  
    const handleClear = () => {
      setOperation(null)
      setName('')
      setEmail('')
      setPassword('')
    }
  
    useEffect(() => {
      if (user) {
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
      }
    }, [user])
  
    
   */

  const handleSubmit = async () => {
    if (editingUser) {
      // Editar
      await userService.updateUser(editingUser._id, formData);
      addToast("Usuario actualizado correctamente", "info");
    } else {
      // Crear
      await userService.createUser(formData);
      addToast("Usuario agregado correctamente", "success");
    }

    setIsModalOpen(false); // cerrar modal
    fetchUsers();          // refrescar lista
  };

  if (isLoading) return <div className="loader"></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container'>
      <h2 className='text-2xl'>Catálogo de Usuarios</h2>
      <hr className="border-0 h-[2px] bg-gradient-to-r from-[#EC5C2C] to-[#F18C6B] my-6 rounded-sm max-w-full opacity-80" />

      <Button variant='primary' onClick={handleAddUser}>Agregar</Button>

      {/* <div className='container'>
        
        
        {operation != null ? (
          
        ) : (
          users.length === 0 ? (<div><span>Aún no existen usuarios, presiona el botón para agregar uno.</span></div>) : (
            
          )
        )}
      </div> */}


      <div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingUser ? "Editar Usuario" : "Agregar Usuario"}
        >
          <UserForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
          {/* <form onSubmit={() => alert('submit')}>
            <div>
              <label htmlFor="name">
                Nombre
                <input type="text" id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Correo electrónico
                <input type="email" id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Contraseña
                <input type="password" id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <button
              className='button-outline'
              onClick={() => alert('clear')}>Cancelar</button>
            <button
              className='button'
              type="submit"
            >
              Guardar
            </button>
          </form> */}
        </Modal>
      </div>
      <br />

      <UserTable
        users={users}
        handleEdit={(user) => handleEditUser(user)}
        handleDelete={(id) => handleDeleteUser(id)}
      />

      {/*       <ul className='user-list'>
        {users.map((u) => (
          <li key={u._id}>
            <div>
              {u._id}<br />
              <span className='username'>{u.name}</span><br />
              <span className='user-email'>{u.email}</span><br />
            </div>
            <button className='btn-action' onClick={() => handleEdit(u._id)}>Edit</button>
            <button className='btn-action' onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul> */}

    </div>
  )
}
