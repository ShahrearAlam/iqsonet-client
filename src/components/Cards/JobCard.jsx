/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RoundeBtn from "../Sheard/RoundeBtn"
import moment from "moment"

export default function JobCard({ data, hiring, id }) {
    const { theme } = useSelector((state) => state.theme)
    const navaigate = useNavigate()
    const path = hiring === true ? `/hiringDetails/${id}` : `/candidateAppliedDetails/${id}`
    return (
        <div className=" bg-base-100  w-full rounded-lg shadow-lg shadow-[#c7c7c70b] p-5">
            <div className="flex justify-between items-start">
                <img src={data?.organization?.logo} alt="companyLogo" className=' h-12 w-12 rounded-lg' />
                <RoundeBtn onClick={() => navaigate(path)} type={'button'} text={'view'} textColor='text-primary' color='bg-transparent' border='border-primary' hover={`${theme ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"}`} ></RoundeBtn>
            </div>
            <h1 className=" mt-2 font-medium">{data?.title}</h1>
            <div className=" mt-5">
                <h1 className=" text-[14px] font-medium opacity-95">{data?.organization?.name}</h1>
                {
                    hiring === true ? <p className=" text-xs opacity-70">Posted date: <span>{moment(data?.updatedAt).format('D MMMM, YYYY')} </span></p> : <p className=" text-xs opacity-70">Applied date: <span>{moment(data?.createdAt).format('D MMMM, YYYY')} </span></p>
                }

                <div className=" sm:flex  justify-between text-sm mt-2  ">
                    {
                        hiring === false ? <div className={`${theme ? "bg-[#282828ad]" : "bg-gray-50"}  px-6  pl-2 py-2 rounded-md`}>
                            <p className="font-medium flex items-center gap-2 text-[14px] text-primary mb-1">Location</p>
                            <p className=" text-xs">{data?.location}</p>
                        </div> : <div className={`${theme ? "bg-[#282828ad]" : "bg-gray-50"}  px-6  pl-2 py-2 rounded-md flex items-center gap-1`}>
                            <p className=" flex items-center gap-2 text-[14px] ">Total Applicant : </p>
                            <p className=" font-medium text-center">{data?.totalApplicants}</p>
                        </div>
                    }
                    <div className={`py-2 px-6 rounded-md  ${theme ? "bg-[#282828ad] text-gray-300" : "bg-gray-50 text-gray-600"}  flex items-center justify-center font-medium`}>{data?.jobType}</div>
                </div>
            </div>
        </div>
    )
}
