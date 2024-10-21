import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Or 'Light' instead of 'Prism'
import { Copy } from "lucide-react";
import toast from 'react-hot-toast';
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="mt-8 p-5 border-2 rounded-lg bg-[#111111]">
      <div className="flex justify-between px-2 py-1 rounded-lg" >
        <div className="flex gap-2 ">
          <span className="h-4 w-4 rounded-full bg-orange-500 block"></span>
          <span className="h-4 w-4 rounded-full bg-white block"></span>
          <span className="h-4 w-4 rounded-full bg-green-500 block"></span>
        </div>
        <Copy
          className="text-white group-hover:text-green-500 cursor-pointer"
          size={20}
          onClick={() => { navigator.clipboard.writeText(paste?.content), toast.success("Copied to clipboard") }}
        />
      </div>

      <div className="mt-5 flex flex-row gap-7 place-content-between">
        <input
          disabled
          className="text-gray-300 bg-transparent p-1 pl-4 rounded-2xl mt-2 w-[66%]"
          type="text"
          value={paste.title}
          placeholder="Enter Title Here"
        />
      </div>

      <div className="mt-8 text-left text-gray-400 leading-7">
        {/* <SyntaxHighlighter
          language="javascript" // You can set this dynamically based on your paste content's language
          
          showLineNumbers={true} // Optional: show line numbers
          wrapLines={true} // Optional: wraps long lines to the next line
        > */}
        {paste.content}
        {/* </SyntaxHighlighter> */}
      </div>
    </div>
  );
};

export default ViewPaste;
