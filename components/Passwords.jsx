import { useState, useEffect } from "react";

export default function Passwords({ setPasswords, user }) {
  const [processed, setProcessed] = useState(false);
  const [vpass, setvPass] = useState(null);

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

  async function execute() {
    const config = {
      method: "GET",
      url: `/api/vault?user=${user}&password=${vpass}`,
    };

    await axios(config).then((res) => {
      var obj = res;
      if (typeof obj == "object") setProcessed(true);
      else {
        alert("Invalid Password");
        return;
      }
    });
  }

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
                onSubmit={checkPass}
              ></input>
            </form>
          </div>
        </>
      ) : (
        <>
          <ListVault user={user} />
        </>
      )}
    </>
  );
}
