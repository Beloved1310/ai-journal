import { PencilIcon } from "@heroicons/react/24/solid";

const NoEntries = () => (
  <div className="3/4 mx-auto flex flex-row items-center justify-center gap-8 rounded-sm border border-gray-400 bg-slate-800/30 p-10 font-montserrat text-lg md:w-1/2">
    <PencilIcon width={40}/>
    <p> You don't have any entries</p>
  </div>
);

export default NoEntries