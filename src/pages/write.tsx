import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Write = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();
  const [journalEntry, setJournalEntry] = useState("");

  const {mutate: createEntry} = api.journalling.createEntry.useMutation({
    onSuccess(data){
      replace(`/entries/${data.id}`)
    }
  })
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    console.log("Loading...");
    return <Loading />;
  }

  const handleFormSubmit = (e: React.FocusEvent<HTMLFormElement>)=>{
    e.preventDefault();
    createEntry({ content: journalEntry})
  }
  return (
    <>
      <Head>
        <title>Write</title>
      </Head>
      <section className="mt-32 flex flex-col justify-center gap-10">
        <h1 className="text-center font-poppins text-4xl font-bold text-neutral-50">
          Write
        </h1>
        <form className="flex w-full flex-col justify-center gap-5" onSubmit={(e) =>handleFormSubmit(e)}>
          <textarea
            cols={30}
            rows={10}
            className="mx-auto rounded-sm border border-slate-800 bg-gray-100 p-5 font-montserrat tracking-wide md:w-1/2"
            placeholder="Write down your thoughts"
            value={journalEntry}
            onChange={(value) => setJournalEntry(value.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mx-auto w-2/3 whitespace-pre-line rounded-sm bg-gradient-to-br from-green-700 to-gray-800 py-3 font-poppins text-xl font-bold text-gray-50 md:w-1/2"
          >
            Finish
          </button>
        </form>
      </section>
    </>
  );
};

export default Write;
