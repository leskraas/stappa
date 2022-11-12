import { Outlet, useCatch } from "@remix-run/react";

export default function Index() {
  return (
    <main className="">
      <Outlet />
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>En uventet feil oppstod: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      Feil, caught.status: {caught.status}, caught.data:{caught.data},
      caught.statustext:{caught.statusText}
    </div>
  );

  // throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
