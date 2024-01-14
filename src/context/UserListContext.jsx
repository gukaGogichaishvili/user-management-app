import React, { createContext, useCallback, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserListContext = createContext();

export const UserListProvider = ({ children }) => {
  const [userList, setUserList] = useLocalStorage("userList", []);
  const [updateHistory, setUpdateHistory] = useLocalStorage(
    "updateHistory",
    [],
  );

  const addUser = (newUser) => {
    setUserList((prevUserList) => {
      const updatedUserList = Array.isArray(prevUserList)
        ? prevUserList
        : JSON.parse(prevUserList);
      const existingUserIndex = updatedUserList.findIndex(
        (user) => user.pasport === newUser.pasport,
      );
      if (existingUserIndex !== -1) {
        console.log("User with this ID already exists");
        return updatedUserList;
      } else {
        return [...updatedUserList, newUser];
      }
    });
  };

  const removeUser = (userId) => {
  setUpdateHistory((prevHistory) => {
    const updatedUserHistory = Array.isArray(prevHistory)
      ? prevHistory
      : JSON.parse(prevHistory);
    return updatedUserHistory.filter(
      (historyEntry) => historyEntry.userId !== userId,
    );
  });

  setUserList((prevUserList) => {
    const updatedUserList = Array.isArray(prevUserList)
      ? prevUserList
      : JSON.parse(prevUserList);
    return updatedUserList.filter((user) => user.pasport !== userId);
  });
}


  

  const logUpdate = (action, userId, prevData, newData) => {
    setUpdateHistory((currentHistory) => [
      ...currentHistory,
      { timestamp: new Date(), action, userId, prevData, newData },
    ]);
  };

  const updateUser = (updatedUser) => {
    setUserList((prevUserList) => {
      const updatedUserList = Array.isArray(prevUserList)
        ? prevUserList
        : JSON.parse(prevUserList);
      const existingUserIndex = updatedUserList.findIndex(
        (user) => user.pasport === updatedUser.pasport,
      );
      logUpdate(
        "update",
        updatedUser.pasport,
        updatedUserList[existingUserIndex],
        updatedUser,
      );
      updatedUserList[existingUserIndex] = {
        ...updatedUserList[existingUserIndex],
        ...updatedUser,
      };
      return updatedUserList; 
    });
  };

  return (
    <UserListContext.Provider
      value={{ userList, addUser, removeUser, updateUser, updateHistory }}
    >
      {children}
    </UserListContext.Provider>
  );
};

export const useUserListContext = () => {
  return useContext(UserListContext);
};
