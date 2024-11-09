/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Button from "../../Sheard/Button";


const ReportPostModal = ({ modalData }) => {

  const { register, handleSubmit } = useForm();
  const { closeReportModal, handleReportSubmit } = modalData;


  return (
    <div
      onClick={closeReportModal}
      className={`h-screen fixed w-screen top-0 left-0  bg-black bg-opacity-80 z-[1000000] flex items-center justify-center  `}
    >
      <div
        className="add-post-editor w-full sm:max-w-[28rem] mx-5 sm:mx-0  bg-base-100 rounded-lg shadow-lg text-xl  p-10 pb-8 relative h-fit scrollbox overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <div>
          <div>
            <h1 className=" text-center font-medium text-sky-700">
              Report Post
            </h1>
            <div>
              <div className=" h-[1px] w-3/5  mx-auto  bg-sky-600  mb-8"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleReportSubmit)}>
            <div className=" w-full mb-5 xl:mb-0">
              <label
                htmlFor="reportType"
                className="block mb-1 text-[13px] text-primary"
              >
                Please Select a problem <span className="text-red-500">*</span>
              </label>
              <select
                id="reportType"
                className="p-2.5 border border-[#3abff8] rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs bg-base-100"
                {...register("reportType")}
                required
              >
                <option value="nudity">Select Problem *</option>
                <option value="nudity">Nudity</option>
                <option value="violence">Violence</option>
                <option value="suicide_or_self_injury">Suicide or self-injury</option>
                <option value="false_information">False information</option>
                <option value="spam">Spam</option>
                <option value="unauthorized_sale">Unauthorized sales</option>
                <option value="hate_speech">Hate speech</option>
                <option value="terrorism">Terrorism</option>
                <option value="something_else">Something else</option>
              </select>
            </div>

            <div className="w-full xl:flex lg:row gap-4 mt-5">
              <div className=" w-full">
                <label
                  htmlFor="reportBody"
                  className="block mb-1 text-[13px] text-primary"
                >
                  Report Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reportBody"
                  placeholder="Enter Report Details  . . ."
                  className="input input-bordered input-info p-2.5 border rounded w-full placeholder:text-[13px] focus:border-purple-400 focus:outline-none text-xs h-32"
                  {...register("reportBody")}
                  required
                ></textarea>
              </div>
            </div>
            <div className=" flex items-center justify-center mt-4">
              <Button type="submit" text='Report Post' color='bg-[#0792f2]' border='border-[#0792f2]' hover="hover:text-[#0792f2]  hover:bg-transparent" />
            </div>
          </form>
        </div>

        <RxCross1
          onClick={closeReportModal}
          className=" absolute right-5 top-5 cursor-pointer hover:text-red-500 "
        />
      </div>
    </div>
  );
};

export default ReportPostModal;