import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import tag from '../assets/tag.png';
import { Calendar, Copy, Eye, PencilLine, Share, Trash2 } from "lucide-react";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const filterData = pastes.filter(

    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())

  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className='mt-4'>
      <input className='p-2 rounded-lg min-w-full mt-4' type="search" placeholder='Search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="flex flex-col gap-5 mt-5">
        {
          filterData.length > 0 ? filterData.map(
            (paste) => {
              return (
                <div className='border flex items-end justify-between p-5 mt-4 rounded-lg max-lg:flex-wrap max-lg:gap-5' key={paste?._id}>
                  <div className='flex flex-col items-start ml-5 gap-4 max-lg:ml-0'>
                    <div className="flex gap-4">
                      <span><img src={tag} className='h-6' /></span>
                      <span className='text-cyan-200 '>

                        {paste.title}
                      </span>
                    </div>
                    <div className="border px-3 rounded-sm text-white bg-transparent w-[70%] text-left  h-12 overflow-hidden text-ellipsis whitespace-pre-line break-words relative max-lg:w-full"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>

                      {paste.content}
                    </div>
                  </div>



                  <div className='flex flex-col '>


                    <div className='flex flex-row gap-2 '>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-white'>Edit</span>
                        <button className='shadow-[inset_0_0_0_2px_#616467] text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 '>
                          <NavLink to={`/?pasteId=${paste?._id}`}>
                            <PencilLine
                              className="text-white group-hover:text-blue-500"
                              size={20}
                            />
                          </NavLink>
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-white'>View</span>
                        <button className='shadow-[inset_0_0_0_2px_#616467] text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200'>
                          <NavLink to={`/pastes/${paste?._id}`}><Eye className="text-white group-hover:text-orange-500"
                            size={20}
                          /></NavLink>
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-white'>Delete</span>
                        <button className='flex items-center justify-center shadow-[inset_0_0_0_2px_#616467] text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200' onClick={() => handleDelete(paste?._id)}>
                          <Trash2
                            className="text-white group-hover:text-pink-500 "
                            size={20}
                          />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-white'>Copy</span>
                        <button className='shadow-[inset_0_0_0_2px_#616467] text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200' onClick={() => { navigator.clipboard.writeText(paste?.content), toast.success("Copied to clipboard") }}>
                          <Copy
                            className="text-white group-hover:text-green-500"
                            size={20}
                          /></button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-white'>Share</span>
                        <button className='shadow-[inset_0_0_0_2px_#616467] text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200'>
                          <Share></Share>
                        </button>
                      </div>
                    </div>
                    <span className='text-white flex gap-2 mt-2'>
                      <Calendar className="text-white" size={20} />
                      {paste?.createdAt}
                    </span>

                  </div>
                </div>
              )
            }
          )
        :<div class="flex items-center justify-center h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg">
        <p class="text-xl font-bold text-white drop-shadow-lg">No content is added</p>
      </div>
      }
      </div>
    </div>
  )
}

export default Paste
