import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from "@remix-run/react";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { useOptionalUser } from "./utils";
import { Navbar } from "./components/Navbar";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

// best effort, last ditch error boundary. This should only catch root errors
// all other errors should be caught by the index route which will include
// the footer and stuff, which is much better.
export function ErrorBoundary({ error }: { error: Error }) {
  // console.error(error)
  const location = useLocation();
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <title>Oh no...</title>
        <Links />
      </head>
      <body className="bg-white transition duration-500 dark:bg-gray-900">
        {/* <ErrorPage
          heroProps={{
            title: '500 - Oh no, something did not go well.',
            subtitle: `"${location.pathname}" is currently not working. So sorry.`,
            image: <Grimmacing className="rounded-lg" aspectRatio="3:4" />,
            action: <ArrowLink href="/">Go home</ArrowLink>,
          }}
        /> */}
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  // console.error('CatchBoundary', caught)s
  if (caught.status === 404) {
    return (
      <html lang="en" className="dark font-sans antialiased">
        <head>
          <title>Oh no...</title>
          <Links />
        </head>
        <body className="bg-white transition duration-500 dark:bg-gray-900">
          <div
          // heroProps={{
          //   title: "404 - Oh no, you found a page that's missing stuff.",
          //   subtitle: `"${location.pathname}" is not a page on kentcdodds.com. So sorry.`,
          //   image: (
          //     <MissingSomething className="rounded-lg" aspectRatio="3:4" />
          //   ),
          //   action: <ArrowLink href="/">Go home</ArrowLink>,
          // }}
          />
          <Scripts />
        </body>
      </html>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export const unstable_shouldReload = () => false;
