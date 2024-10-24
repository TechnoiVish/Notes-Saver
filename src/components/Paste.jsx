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
      <input className='p-2 rounded-lg min-w-full mt-4 focus:outline-none drop-shadow-md ' type="search" placeholder='Search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="flex flex-col gap-5 mt-5  ">
        {
          filterData.length > 0 ? filterData.map(
            (paste) => {
              return (
                <div className='border shadow-md flex items-end justify-between p-5 mt-4 rounded-lg max-lg:flex-wrap max-lg:gap-5' key={paste?._id}>
                  <div className='flex flex-col items-start ml-5 gap-4 max-lg:ml-0'>
                    <div className="flex gap-4">
                      <span><img src={tag} className='h-6' /></span>
                      <span className='text-neutral-500  '>

                        {paste.title}
                      </span>
                    </div>
                    <div className="border px-3 rounded-sm text-neutral-700 bg-transparent w-[80%] max-sm:w-[100%]   text-left  h-12 overflow-hidden text-ellipsis whitespace-pre-line break-words relative max-lg:w-full"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>

                      {paste.content}
                    </div>
                  </div>



                  <div className='flex flex-col '>


                    <div className='flex flex-row gap-2 max-sm:flex-wrap'>
                      <div className='flex flex-col gap-2 '>
                        <span className=' text-neutral-500 text-sm '>Edit</span>
                        <button className='shadow-md text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:text-white dark:text-neutral-200 transition duration-200 '>
                          <NavLink to={`/?pasteId=${paste?._id}`}>
                            <PencilLine
                              className="text-gray-400 group-hover:text-white"
                              size={20}
                            />
                          </NavLink>
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-neutral-500 text-sm '>View</span>
                        <button className='shadow-md text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:text-white dark:text-neutral-200 transition duration-200'>
                          <NavLink to={`/pastes/${paste?._id}`}><Eye className="text-gray-400 group-hover:text-orange-500"
                            size={20}
                          /></NavLink>
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-neutral-500 text-sm '>Delete</span>
                        <button className='shadow-md text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:text-white dark:text-neutral-200 transition duration-200' onClick={() => handleDelete(paste?._id)}>
                          <Trash2
                            className="text-gray-400 group-hover:text-pink-500 "
                            size={20}
                          />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-neutral-500 text-sm '>Copy</span>
                        <button className='shadow-md text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:text-white dark:text-neutral-200 transition duration-200' onClick={() => { navigator.clipboard.writeText(paste?.content), toast.success("Copied to clipboard") }}>
                          <Copy
                            className="text-gray-400 group-hover:text-green-500"
                            size={20}
                          /></button>
                      </div>
                      <div className='flex flex-col gap-2 '>
                        <span className='text-neutral-500 text-sm'>Share</span>
                        <button className='shadow-md text-white px-2 py-1 rounded-lg text-xs tracking-widest uppercase font-bold bg-transparent hover:text-white dark:text-neutral-200 transition duration-200' onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: paste.title,
                      text: paste.content,
                      url: window.location.href
                    }).catch((error) => console.log('Error sharing', error));
                  } else {
                    alert('Sharing is not supported in your browser');
                  }
                }}>
                  <Share className='text-gray-400' height={20} />
                </button>
                      </div>
                    </div>
                    <span className='text-neutral-500 flex gap-2 mt-2 text-sm'>
                      <Calendar className="text-gray-400 " size={20} />
                      {paste?.createdAt}
                    </span>

                  </div>
                </div>
              )
            }
          )
          :<div className='flex flex-col justify-center items-center'>

        <p class="text-xl font-semibold  text-neutral-400">you don't have any notes.</p>
        <img src="https://motallebi-noteapp.netlify.app/static/media/notNotes.f6b9abf9662f83e71ae5d62919352c3a.svg " className='h-[250px] w-[250px] max-w-full m-10 bg-no-repeat bg-cover ' alt="" />
       {/* <div class="bg-[url('')] h-[250px] w-[250px] max-w-full m-10 bg-no-repeat bg-cover "> */}
          {/* </div> */}
      </div>
      }
      </div>
    </div>
  )
}

export default Paste
