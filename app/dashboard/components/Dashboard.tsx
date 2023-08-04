"use client"
import React, { useState, useEffect } from 'react'
import Card from './Card'
import Row from './Row'
import Button from '@/app/components/Button'
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { DashboardList } from '@/app/types'

const Dashboard = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");


  /*Fetch emails */
  const fetchEmails = () => {
    const toastId = toast.loading("Fetching data...");
    axios
      .get("/api/adduser")
      .then((data) => {

        setUsers(data.data);

        toast.dismiss(toastId);
      })
      .catch((error) => toast.error("Unable to fetch data."));
  };

  /*Delete functionality */
  const handleDelete = (userInfo: DashboardList) => {
    const deleteID = toast.loading("Removing...");

    axios
      .delete(`/api/adduser/${userInfo.id}`)
      .then(() => {
        toast.dismiss(deleteID);
        fetchEmails();
      })
      .catch(() => toast.error("Something Went wrong "));

  }


  /*Add user modal */
  const addUser = () => {
    setModalVisible(true)
  }



  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div>

      <div className="mt-[6rem] mb-6 w-1/2 m-auto">
        <input
          type="text"
          className="border-2 p-3 outline-none tracking-wide rounded md:text-sm w-full"
          placeholder="Search email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="grid gap-8 px-4 mt-5 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card label={"Review rate"} percent={12.27} />
        <Card label={"Review score"} percent={5.5} />
        <Card label={"Total reviews"} percent={58.27} />
        <Card label={"Send now"} percent={2} />
      </div>


      <div className="overflow-x-scroll md:overflow-auto rounded-lg border border-gray-200 shadow m-5">
        {/*Follow up Title */}
        <div className="bg-white flex items-center font-medium px-6 py-4 justify-between">
          <h2 className="  text-gray-900">Follow up</h2>
          <span className="flex gap-2">
            <Button type='button' onClick={addUser}>Add User</Button>

          </span>
        </div>

        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                _id
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Date
              </th>

              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {
              users

                .filter((user: DashboardList) =>
                  user.email
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toString().toLowerCase())
                )

                .map((userInfo: any) => (
                  <Row
                    key={userInfo.id}
                    data={userInfo}
                    onClick={() => handleDelete(userInfo)}


                  />
                ))
            }





          </tbody>
        </table>
      </div>

      {
        modalVisible && <Modal setModalVisible={setModalVisible} />
      }
    </div>
  )
}

export default Dashboard