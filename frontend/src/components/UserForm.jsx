import { Button } from '../components/ui'

export const UserForm = ({ formData, setFormData, onSubmit, onCancel }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="block font-semibold text-secondary mb-2">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"         // <-- agregado
          value={formData.name}
          onChange={handleChange}
          placeholder="Escribe tu nombre"
          className="w-[95%] p-3 border-2 border-[#b0b0c2] rounded-md text-base outline-none transition-all duration-300 focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"        // <-- agregado
          value={formData.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          className="w-[95%] p-3 border-2 border-[#b0b0c2] rounded-md text-base outline-none transition-all duration-300 focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"     // <-- agregado
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          className="w-[95%] p-3 border-2 border-[#b0b0c2] rounded-md text-base outline-none transition-all duration-300 focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      <div className="form-actions">
        <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className="ml-2">Guardar</Button>
        {/* <button
          type="button"
          className="button-outline"
          
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button> */}
      </div>
    </form>
  );
};