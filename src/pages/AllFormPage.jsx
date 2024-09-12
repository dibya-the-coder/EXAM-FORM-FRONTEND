import { useEffect, useState } from "react"
import { GET } from "../config/axiosRequestService"
import AllDataComponent from "../component/AllDataCompenent"
import { useFormContext } from "../context/FormContext";

const AllFormPage = () => {
  const { currentUser } = useFormContext();
  const [data, setData]= useState([])
    useEffect(()=>{
        async function fetch () {
            const response = await GET(`/exam/get-all/${currentUser.email}`);
            console.log('response :', response);
            setData(response.payload)
        }
        fetch()
    },[currentUser.email])
  return (
    <div>
      {
        data.length===0? <p className="text-center my-40 text-3xl font-bold capitalize">No Data To Show</p>:
        data.map((item, index)=> (
          <AllDataComponent isEven={index%2==1?false:true} key={item._id} data={item}/>
        ))
      }
    </div>
  )
}

export default AllFormPage
