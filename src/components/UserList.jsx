import React, { useState, useMemo } from "react";
import { Table } from "@radix-ui/themes";
import { useUserListContext } from "../context/UserListContext";
import SingleUserRow from "./SingleUserRow";

const UserList = () => {
  const { userList } = useUserListContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setIsAscending(!isAscending);
    } else {
      setSortKey(key);
      setIsAscending(true);
    }
    setCurrentPage(0);
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.username.toLowerCase().includes(searchQuery) ||
      user.carBrand.toLowerCase().includes(searchQuery) ||
      user.carModel.toLowerCase().includes(searchQuery)
    );
  }, [userList, searchQuery]);

  const sortedUsers = useMemo(() => {
    if (!sortKey) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return isAscending ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return isAscending ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortKey, isAscending]);

  const totalPages = Math.ceil(sortedUsers.length / limit);
  const startIndex = currentPage * limit;
  const endIndex = startIndex + limit;
  const currentPageData = sortedUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <h1>Search by name, surname, car brand or car model!</h1>
      <div className="flex flex-col h-screen">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="overflow-auto">
          <h1>For Sorting Click Column Headers</h1>
          <Table.Root>
            <Table.Header>
              <Table.Row>
        
                <Table.ColumnHeaderCell onClick={() => handleSortChange('name')}>Name(click to sort by)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell onClick={() => handleSortChange('username')}>Username(click to sort by)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell onClick={() => handleSortChange('dateOfBirth')}>Date of Birth(click to sort by)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell onClick={() => handleSortChange('carBrand')}>Brand(click to sort by)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell onClick={() => handleSortChange('carModel')}>Model(click to sort by)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Plate Number</Table.ColumnHeaderCell>
               
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
