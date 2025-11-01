import { Card, Input, Button } from "../components/ui"
import { FaEdit, FaTrash } from "react-icons/fa";

export const HomePage = () => {
  return (
    <div className="app bg-light-card dark:bg-dark-card">

      <div className="min-h-screen flex flex-col items-center justify-center gap-4  text-nmda-secondary transition-colors">
      <h1 className="text-3xl font-bold">Tailwind Colors Test</h1>
      <div className="p-4 rounded-lg bg-nmda-primary text-white">Primary</div>
      <div className="p-4 rounded-lg bg-nmda-secondary text-white">Secondary</div>
      <div className="p-4 rounded-lg bg-nmda-accent text-white">Accent</div>

      <button
        className="mt-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        Toggle Dark Mode
      </button>
    </div>

      <div className="min-h-screen bg-nmda-gray dark:bg-nmda-darkBg flex flex-col items-center justify-center gap-4 transition-colors">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>

      <button
        className="mt-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        Toggle Theme
      </button>
    </div>

<div className="bg-[--color-bg] text-[--color-text] border border-[--color-border]">

  <div className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg p-6 shadow-md">
    <h2 className="text-lg font-semibold">Hola NMDA 👋</h2>
  </div>
</div>

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
      
      <div className="p-6 space-y-6">
      <Card title="Bienvenido a mi UI Library">
        <p>Esto es una base para tus futuros componentes con temas dinámicos 🎨</p>
        <Button variant="primary">Botón principal</Button>
        <Button variant="outline" className="ml-2">Botón outline</Button>
      </Card>
    </div>

      <main className="bg-card dark:bg-card min-h-screen flex flex-col items-center justify-center text-center font-sans">
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
  )
}
