import { useMediaQuery } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodePullRequest,faCircleExclamation,faCircleCheck,faReply, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
const AppointmentSummary = ({
  onclick,
  onclicked,
  appointLength,
  completed,
  pending,
  cancelled,
  completedPercent,
  pendingPercent,
  cancelledPercent,
}) => {
  const isTablet = useMediaQuery("(max-width: 960px)");
  return (
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full mb-1 mt-4'>
            <div className='relative w-full flex flex-col justify-center items-center   p-3 rounded-xl  gap-4 transition-transform'  style={{ border: '1px solid #d1d1d1' }}>
            {/* Card Header */}
            <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg text-black font-semibold'>Completed</h1>
            </div>

            {/* Icon at the middle right side */}
            <div className='absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#f5f1da] flex justify-center items-center text-[#e3b04b] cursor-pointer p-6 rounded-full'>
            {/* <FaIcons.FaRegArrowAltCircleLeft className='w-8 h-8' /> */}
            <FontAwesomeIcon icon={faCircleCheck} className='w-8 h-8'/>
            
            </div>

            {/* Card Content */}
            <div className='w-full flex justify-between items-center mt-3'>
            <div className='flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl text-black font-bold'>{completed}</h1>
            </div>
            </div>
            </div>  

            {/* */}
            <div className='relative w-full flex flex-col justify-center items-center  p-3 rounded-xl  gap-4 transition-transform'  style={{ border: '1px solid #d1d1d1' }}>
            {/* Card Header */}
            <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg text-black font-semibold'>Pending</h1>
            </div>

            {/* Icon at the middle right side */}
            <div className='absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#f5f1da] flex justify-center items-center text-[#e3b04b]  cursor-pointer p-6 rounded-full'>
            <FontAwesomeIcon icon={faHourglassHalf} className='w-8 h-8'/>
            </div>

            {/* Card Content */}
            <div className='w-full flex justify-between items-center mt-3'>
            <div className='flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl text-black font-bold'>{pending}</h1>
            </div>
            </div>
            </div> 

            {/* */}
            <div className='relative w-full flex flex-col justify-center items-center  p-3 rounded-xl  gap-4 transition-transform'  style={{ border: '1px solid #d1d1d1' }}>
            {/* Card Header */}
            <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg text-black font-semibold'>Cancelled</h1>
            </div>

            {/* Icon at the middle right side */}
            <div className='absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#f5f1da] flex justify-center items-center text-[#e3b04b]  cursor-pointer p-6 rounded-full'>
            <FontAwesomeIcon icon={faXmarkCircle} className='w-8 h-8'/>
            
            </div>

            {/* Card Content */}
            <div className='w-full flex justify-between items-center mt-3'>
            <div className='flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl text-black font-bold'>{cancelled}</h1>
            </div>
            </div>
            </div>        
         </div>
  );
};

export default AppointmentSummary;
