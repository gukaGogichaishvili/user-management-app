import React from "react";
import { useUserListContext } from "../context/UserListContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Table } from "@radix-ui/themes";
import { useRedirectContext } from "../context/RedirectContext";

const ViewHistoryBtn = ({ pasport }) => {
  const { updateHistory } = useUserListContext();
  const { setRedirecting } = useRedirectContext();
  const navigate = useNavigate();

  const handleClick = (userId) => {
    setRedirecting(false);
    navigate(`/history/${userId}`);
  };

  return (
    <Table.Cell>
      {" "}
      {updateHistory.some((historyEntry) => historyEntry.userId === pasport) ? (
        <Button onClick={() => handleClick(pasport)} className="bg-amber-300">
          View History
        </Button>
      ) : (
        <Button className="bg-stone-200" disabled>
          {" "}
          No History Of Updates
        </Button>
      )}
    </Table.Cell>
  );
};

export default ViewHistoryBtn;
