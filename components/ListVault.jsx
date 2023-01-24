import axios from "axios";
import { useEffect, useState } from "react";

export default function ListVault({ user, pass, data }) {
  const [add, setAdd] = useState(false);
  const [domain, setDomain] = useState(null);
  const [dPass, setDPass] = useState(null);

  const inputStyle = {
    padding: "10px",
    margin: "5px",
  };

  const buttonStyle = {
    padding: "10px",
  };

  const updateState = (e) => {
    e.preventDefault();
    setDomain(e.target.dom.value);
    setDPass(e.target.dPass.value);
  };

  async function createDomain() {
    const data = {
      user: `${user}`,
      vPass: `${pass}`,
      domain: `${domain}`,
      dPass: `${dPass}`,
    };

    const config = {
      url: "/api/vault",
      data: data,
      method: "PUT",
    };

    await axios(config).then((res) => {
      if (res.data.status == "created") {
        alert("Success!");
        setDPass(null);
        setDomain(null);
        setAdd(!add);
      }
    });
  }

  useEffect(() => {
    if (domain && dPass) {
      createDomain();
    }
  }, [dPass, domain]);

  const insertData = () => {
    setAdd(!add);
  };

  return (
    <>
      {!add ? (
        <>
          <button onClick={insertData} style={buttonStyle}>
            Add +
          </button>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", marginTop: "300px" }}>
            <form onSubmit={updateState} method="POST">
              <input
                placeholder="Domain"
                name="dom"
                style={inputStyle}
                required
              ></input>
              <br />
              <input
                placeholder="Password"
                type="password"
                name="dPass"
                style={inputStyle}
                required
              ></input>
              <br />
              <input type="submit" style={inputStyle}></input>
            </form>
          </div>
        </>
      )}
    </>
  );
}
