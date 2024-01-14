import React from "react";
import { useUserListContext } from "../context/UserListContext";
import { useParams } from "react-router-dom";

const HistoryOfUpdates = () => {
  const { pasport } = useParams();
  const { updateHistory } = useUserListContext();
  return (
    <div>
      {updateHistory 
        .filter((historyEntry) => historyEntry.userId === pasport)
        .map((historyEntry) => (
          <div>
            <p>Updated at: {historyEntry.timestamp.toLocaleString()}</p>
            <p>{JSON.stringify(historyEntry.prevData, null, 2)}</p>
          </div>
        ))}
    </div>
  );
};

export default HistoryOfUpdates;
