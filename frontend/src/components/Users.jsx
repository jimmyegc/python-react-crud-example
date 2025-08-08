import { useEffect, useState } from 'react'

import { useUsers } from '../hooks/Users/useUsers'
import { useCreateUser } from '../hooks/Users/useCreateUser'
import { useUpdateUser } from '../hooks/Users/useUpdateUser'
import { useDeleteUser } from '../hooks/Users/useDeleteUser'
import { useUser } from '../hooks/Users/useUser'

export const Users = () => {  
  const [userId, setUserId] = useState(null)
  const { users, loading, error, setUsers } = useUsers();
  const { createUser } = useCreateUser();
  const { user } = useUser(userId);
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const [operation, setOperation] = useState()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState(user?.password)
    
  const handleSubmit = (e) => {
    e.preventDefault()    
    if(operation === 'create') {
      handleAdd();
    } else if(operation=== 'update') {
      handleUpdate()
    }
  }

  const handleAdd = async () => {
    const newUser = { name, email, password };
    const created = await createUser(newUser);
    setUsers([...users, { ...newUser, _id: created.id }]);
    setOperation(null)
  };

  const handleEdit = async(id) =>{    
    setUserId(id);
    setOperation('update')
  }

  const handleUpdate = async() => {
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

  useEffect(()=> {
    if(user) {      
      setName(user.name)
      setEmail(user.email)
      setPassword(user.password)      
    }
  }, [user])

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (<div className='container'>
    <div>Users</div>
    <button onClick={() => setOperation('create')}>New User</button>
    
    {operation != null && (
      <form onSubmit={handleSubmit}>
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
            onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        <input type="submit" value="Enviar" />
      </form>
    )}
    

    <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => handleEdit(u._id)}>Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
  </div>)
}
