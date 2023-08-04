import { DashboardList } from "@/app/types"
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import moment from "moment";
import Modal from "./Modal";




interface RowProps{
  data:DashboardList
  onClick?: () => void;
  
}


const Row = ({data,onClick}:RowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const handleEdit = (data:DashboardList) => {
    //const loaderID = toast.loading("Updating..."+data.id);
    setModalVisible(true)
  }


  return (
    <>
    
   
    <tr
      className="hover:bg-gray-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        
        <div className="text-sm">
          <div className="font-medium text-gray-700">{data.id}</div>
      
        </div>
      </th>
     
      <td className="px-6 py-4">{data.name}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-black">
            {data.email}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">{moment(data.createdAt).format("MMM Do YY")}</td>

      
      <td className="px-6 py-4">
        <div
          className={`flex justify-end relative gap-4 ${
            isVisible ? "visible" : "invisible"
          }`}
        >
          <div>
            <BiEdit
              className="h-5 w-5 cursor-pointer"
              onClick={()=>handleEdit(data)}

             
            />
          </div>
       
            <RiDeleteBinLine className="h-5 w-5 cursor-pointer" onClick={onClick}/>
          
        </div>
      </td>
    </tr>

      
    {
        modalVisible && <Modal edit={true} data={data} setModalVisible={setModalVisible} />
      }
    </>
  )
}

export default Row