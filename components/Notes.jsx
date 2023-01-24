import { useState, useEffect } from "react";

import ListNotes from "./ListNotes";

export default function Passwords({ setNotes, user, password }) {
  const [processed, setProcessed] = useState(false);
  const [dataFetched, setDataFetched] = useState(null);

  const axios = require("axios");

  const buttonStyle = {
    padding: "10px",
    margin: "5px",
  };

  function returnBack() {
    setNotes(false);
  }

  useEffect(() => {
    if (dataFetched) {
      setProcessed(true);
    }
  }, [dataFetched]);

  async function execute() {
    const config = {
      method: "GET",
      url: `/api/note?user=${user}&pass=${password}`,
    };

    await axios(config).then((res) => {
      const obj = res.data;
      if (Object.keys(obj).length > 0) {
        setDataFetched(obj);
      } else {
        alert("Invalid");
        return;
      }
    });
  }

  useEffect(() => {
    execute();
  }, []);

  return (
    <>
      <button onClick={() => returnBack()} style={buttonStyle}>
        BACK
      </button>
      {!processed ? (
        <>Loading...</>
      ) : (
        <>
          <ListNotes user={user} data={dataFetched} password={password} />
        </>
      )}
    </>
  );
}
