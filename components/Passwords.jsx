import { useState, useEffect } from "react";

import ListVault from "./ListVault";

export default function Passwords({ setPasswords, user }) {
  const [processed, setProcessed] = useState(false);
  const [vpass, setvPass] = useState(null);
  const [dataFetched, setDataFetched] = useState(null);

  const axios = require("axios");

  const inputStyle = {
    padding: "10px",
    margin: "5px",
  };

  const buttonStyle = {
    padding: "10px",
    margin: "5px",
  };

  function returnBack() {
    setPasswords(false);
  }

  function execute() {
    const config = {
      method: "GET",
      url: `/api/vault?user=${user}&pass=${vpass}`,
    };

    axios(config).then((res) => {
      const obj = res.data.status;
      if (Object.keys(obj).length > 0) {
        setDataFetched(obj);
      } else {
        alert("Invalid Password");
        return;
      }
    });
  }

  useEffect(() => {
    if (dataFetched) {
      setProcessed(true);
    }
  }, [dataFetched]);

  useEffect(() => {
    if (vpass) {
      execute();
    }
  }, [vpass]);

  const checkPass = (e) => {
    e.preventDefault();
    setvPass(e.target.vp.value);
  };

  return (
    <>
      <button onClick={() => returnBack()} style={buttonStyle}>
        BACK
      </button>
      {!processed ? (
        <>
          <div style={{ textAlign: "center", marginTop: "300px" }}>
            <form onSubmit={checkPass}>
              <input
                style={inputStyle}
                name="vp"
                placeholder="Vault Password"
                type="password"
                required
              ></input>
              <br />
              <input
                type="submit"
                style={inputStyle}
                // onSubmit={checkPass}
              ></input>
            </form>
          </div>
        </>
      ) : (
        <>
          <ListVault user={user} pass={vpass} data={dataFetched} />
        </>
      )}
    </>
  );
}
