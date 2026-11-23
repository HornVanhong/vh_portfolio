import { notFound } from "next/navigation";

/** Unknown paths render the styled 404 inside the language layout. */
export default function CatchAll() {
  notFound();
}
