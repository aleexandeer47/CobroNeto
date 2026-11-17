import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">No encontramos esta página</h1>
      <p className="mt-3 text-muted">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <Link href="/" className="btn btn-primary mt-6">
        Ir a la calculadora
      </Link>
    </section>
  );
}
