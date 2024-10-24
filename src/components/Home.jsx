import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { format } from 'date-fns'
const Home = () => {
  const [title,setTitle]=useState('');
  const [value,setValue]=useState('');
  const [searchParams,setSearchParams]=useSearchParams('');
  const pasteId=searchParams.get("pasteId");
  const dispatch=useDispatch();
const allPastes=useSelector((state)=>state.paste.pastes);

useEffect(()=>{
  if(pasteId){
    const paste=allPastes.find((p)=>p._id===pasteId);
    setTitle(paste.title)
    setValue(paste.content)
  }
  },[pasteId])
  function createPaste(){
const paste={
  title:title,
  content:value,
  _id:pasteId || Date.now().toString(36),
  createdAt:formatDate(),
}

function formatDate() {
  return format ( new Date(), 'do MMMM Y');
}


  if(pasteId){
    // update
    dispatch(updateToPastes(paste));
  }
  else{
    // create
    dispatch(addToPastes(paste));
  }

  // after creation and updation 

  setTitle('');
  setValue('');
  setSearchParams({});

  }
  return (
  <div className='mt-20 '>
      <div className='flex flex-row gap-7 justify-center items-center'>
     <input className=' text-sm p-2 pl-4 rounded-lg  w-[66%] drop-shadow-md focus:outline-none max-sm:text-xs' type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Enter title here' />

     <button  disabled={!title || !value} onClick={createPaste} className='text-white max-sm:text-xs bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 cursor-pointer '>
      {
    pasteId? "Update Content": "➕ Add Content"}
     </button>
    </div>
    <div className='mt-8 p-5 border-2 rounded-lg shadow-md '>
      <div className="flex gap-2">
        <span className='h-4 w-4 rounded-full bg-orange-500 block drop-shadow-md'></span>
        <span className='h-4 w-4 rounded-full bg-white block drop-shadow-md'></span>
        <span className='h-4 w-4 rounded-full bg-green-500 block drop-shadow-md'></span>
       
      </div>
      <textarea className='max-sm:text-xs rounded-lg border-2 mt-4 w-full p-4 bg-transparent focus:outline-none text-neutral-600' spellCheck="true" value={value} placeholder='Enter content here' onChange={(e)=>setValue(e.target.value)}/>
    </div>
  </div>
  )
}

export default Home
