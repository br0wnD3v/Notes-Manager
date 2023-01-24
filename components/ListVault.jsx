import axios from "axios";
import { useEffect, useState } from "react";

export default function ListVault({ user, pass, data }) {
  const [add, setAdd] = useState(false);
  const [domain, setDomain] = useState(null);
  const [dPass, setDPass] = useState(null);
  const [elementsUpdated, setElementsUpdated] = useState(0);

  const inputStyle = {
    padding: "10px",
    margin: "5px",
  };

  const buttonStyle = {
    padding: "10px",
  };

  const addStyle = {
    float: "right",
    margin: "50px 200px 0 0",
  };

  const tableStyle = {
    clear: "both",
    margin: "100px auto",
  };

  const elements = [];
  var length = Object.keys(data).length;

  const Keys = Object.keys(data);
  for (var index = 1; index < length; index++) {
    elements.push(
      <tr>
        <td style={{ textAlign: "center", width: "60px" }}>{index}</td>
        <td>{Keys[index]}</td>
        <td>{data[Keys[index]]}</td>
      </tr>
    );
  }
  if (elementsUpdated == 0) setElementsUpdated(length);

  const updateState = (e) => {
    e.preventDefault();
    setDomain(e.target.dom.value);
    setDPass(e.target.dPass.value);
  };

  async function deleteDomain(domain) {}

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
      console.log("Inside");
      if (res.data.status == "created") {
        setElementsUpdated(
          elements.push(
            <tr>
              <td style={{ textAlign: "center", width: "60px" }}>
                {length + 1}
              </td>
              <td>{domain}</td>
              <td>{dPass}</td>
              <td>
                <button onClick={() => deleteDomain(domain)}></button>
              </td>
            </tr>
          )
        );
        setDPass(null);
        setDomain(null);
        setAdd(!add);
        alert("Success!");
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
          <div style={addStyle}>
            <button onClick={insertData} style={buttonStyle}>
              Add +
            </button>
          </div>
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>Sno.</th>
                  <th>Domain</th>
                  <th>Password</th>
                  <th style={{ width: "70px" }}>Del</th>
                </tr>
              </thead>
              <tbody>{elements}</tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", marginTop: "250px" }}>
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
