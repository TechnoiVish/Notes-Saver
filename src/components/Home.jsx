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
     <input className='p-2 pl-4 rounded-lg  w-[66%] ' type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Enter title here' />
     <button onClick={createPaste} className='p-1.5  mt-2 w-[fit-content] focus:outline-none text-[#111111] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-2 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 '>
      {
    pasteId? "Update My Content": "Create My Content"}
     </button>
    </div>
    <div className='mt-8 p-5 border-2 rounded-lg '>
      <div className="flex gap-2">
        <span className='h-4 w-4 rounded-full bg-orange-500 block'></span>
        <span className='h-4 w-4 rounded-full bg-white block'></span>
        <span className='h-4 w-4 rounded-full bg-green-500 block'></span>
       
      </div>
      <textarea className='rounded-lg border-2 mt-4 w-full p-4 bg-transparent text-gray-400' value={value} placeholder='Enter content here' onChange={(e)=>setValue(e.target.value)}/>
    </div>
  </div>
  )
}

export default Home
