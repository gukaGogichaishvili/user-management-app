import React, {  useState } from "react";
import ViewHistoryBtn from "./ViewHistoryBtn";
import { Table } from "@radix-ui/themes";
import { Button } from "antd";
import UserForm from "./UserForm";
import { useUserListContext } from "../context/UserListContext";

const SingleUserRow = ({
  pasport,
  name,
  username,
  dateOfBirth,
  carBrand,
  carModel,
  carplate,
}) => {
  
  
  const { removeUser, updateUser, userList } = useUserListContext();
  const [editingUserId, setEditingUserId] = useState(null);

  const openUpdateForm = (userId) => {
    const userFromTable = userList.find((user) => user.pasport === userId);
    if (userFromTable) {
      setEditingUserId(userId);
    }
  };


  

  return (
    <React.Fragment>
      <Table.Row>
        <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
        <Table.Cell>{username}</Table.Cell>
        <Table.Cell>{pasport}</Table.Cell>
        <Table.Cell>{dateOfBirth}</Table.Cell>
        <Table.Cell>{carBrand}</Table.Cell>
        <Table.Cell>{carModel}</Table.Cell>
        <Table.Cell>{carplate}</Table.Cell>
        <ViewHistoryBtn pasport={pasport} />
        <Table.Cell>
          <Button
            onClick={() => {
              removeUser(pasport);
            }}
          >
            Delete
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={() => {
              openUpdateForm(pasport);
            }}
          >
            Update
          </Button>
        </Table.Cell>
      </Table.Row>
      {editingUserId === pasport && (
        <Table.Row>
          <Table.Cell colspan="100%">
            <UserForm initialValues={{
    name,
    username,
    pasport,
    dateOfBirth,
    carBrand,
    carModel,
    carplate
  }} addOrUpdate={updateUser} />
            <Button
              onClick={() => {
                setEditingUserId(null);
              }}
            >
              Close Form
            </Button>
          </Table.Cell>
        </Table.Row>
      )}
    </React.Fragment>
  );
};

export default React.memo(SingleUserRow);
