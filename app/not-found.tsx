import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-deluge-100 dark:bg-deluge-975 px-8 text-center">
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      
      <h1 className="text-9xl font-bold text-accent mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
        404
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-light mb-8">
        Página no encontrada
      </h2>
      
      <p className="text-lg text-muted-foreground mb-12 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      
      <Link 
        href="/"
        className="flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al inicio
      </Link>
    </main>
  )
}
