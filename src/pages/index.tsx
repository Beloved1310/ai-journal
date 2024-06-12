import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>JRNL</title>
        <meta name="description" content="An Ai journalling App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex h-screen items-center bg-cover bg-center"
        style={{ backgroundImage: `url(/background.jpeg)` }}
      >
        <div className="mt-74 m-auto flex flex-col justify-center gap-5 text-center align-middle">
          <h1 className="font-poppins bg-gradient-to-br from-white to-slate-600 box-decoration-slice bg-clip-text p-2 text-7xl font-extrabold text-transparent text-white">
            journal
          </h1>
          <h2 className="font-montserrat text-5xl text-neutral-100">
            {" "}
            Your AI Journal
          </h2>
          {isClient && (
            <button
              onClick={sessionData ? () => void signOut() : () => void signIn()}
              className="mx-auto rounded-sm bg-gradient-to-br from-indigo-500 to-indigo-600 px-20 py-2 font-poppins text-2xl font-bold text-neutral-50 shadow-sm"
            >
              {sessionData ? "Sign Out" : "Sign In"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
