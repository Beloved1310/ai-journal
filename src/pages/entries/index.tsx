import Loading from "@/components/Loading";
import NoEntries from "@/components/NoEntries";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Entries = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);
  if (sessionStatus === "loading") {
    console.log("Loading...");
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Entries</title>
      </Head>
      <section className="mt-32 flex flex-col justify-center gap-10">
        <h1 className="font-poppins fon-bold text-center text-4xl text-neutral-50">
          Entries
        </h1>
        <NoEntries />
      </section>
    </>
  );
};
export default Entries;
