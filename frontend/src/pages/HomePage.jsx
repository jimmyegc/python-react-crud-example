import { Card, Input, Button } from "../components/ui"
import { FaEdit, FaTrash } from "react-icons/fa";

export const HomePage = () => {
  return (<>
    <div>HomePage</div>
    <div className="app">
      <Button variant="default" onClick={() => alert("Default")}>
        Default
      </Button>

      <Button variant="primary" onClick={() => alert("Primary")}>
        Primary
      </Button>

      <Button variant="outline" onClick={() => alert("Outline")}>
        Outline
      </Button>

      <Button variant="primary" icon={FaEdit} onClick={() => alert("Edit")}>
        Editar
      </Button>

      <Button variant="primary" icon={FaTrash} disabled>
        Eliminar
      </Button>
      <div style={{ padding: '24px' }}>
        <Card>
          <h2>Formulario de prueba</h2>
          <Input label="Nombre" placeholder="Tu nombre" />
          <Button onClick={() => alert('Enviar')}>Enviar</Button>
        </Card>
      </div>
      <button className="btn btn-primary">Contáctanos</button>
      <button className="btn btn-secondary">Ver servicios</button>
      <br />

      <main className="bg-gray min-h-screen flex flex-col items-center justify-center text-center font-sans">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Bienvenido a <span className="text-primary">nmda</span>
        </h1>
        <p className="text-lg text-secondary/80 mb-6">
          Desarrollo de software a la medida 🚀
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">Contáctanos</button>
          <button className="btn-secondary">Ver servicios</button>
        </div>
        <div className="card mt-8 w-80">
          <p>Este es un ejemplo de card con el tema de nmda.</p>
        </div>
      </main>

    </div>
  </>

  )
}
