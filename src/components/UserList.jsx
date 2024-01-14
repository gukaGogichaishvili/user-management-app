import React, { useState } from "react";
import { Table } from "@radix-ui/themes";
import { useUserListContext } from "../context/UserListContext";
import SingleUserRow from "./SingleUserRow";

const UserList = () => {
  const { userList } = useUserListContext();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const totalPages = Math.ceil(userList.length / limit);

  const startIndex = currentPage * limit;
  const endIndex = startIndex + limit;
  const currentPageData = userList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="overflow-auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date of Birth</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Plate Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentPageData.map((user) => (
                <SingleUserRow
                  key={user.pasport}
                  name={user.name}
                  pasport={user.pasport}
                  username={user.username}
                  dateOfBirth={user.dateOfBirth}
                  carBrand={user.carBrand}
                  carModel={user.carModel}
                  carplate={user.carplate}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        <div className="mt-auto p-4 bg-white flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`m-1 rounded-md ${currentPage === i ? "bg-blue-500" : "bg-gray-400"} text-white px-4 py-2`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
