import axios from "axios";
import { useEffect, useState } from "react";

export default function ListVault({ user, pass, data }) {
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);

  const [delDom, setDelDom] = useState(null);
  const [domain, setDomain] = useState(null);
  const [dPass, setDPass] = useState(null);

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

  const toAdd = (e) => {
    e.preventDefault();
    setDomain(e.target.dom.value);
    setDPass(e.target.dPass.value);
  };

  const toDel = (e) => {
    e.preventDefault();
    setDelDom(e.target.dom.value);
  };

  function createDomain() {
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

    axios(config).then((res) => {
      if (res.data.status == "created") {
        setDPass(null);
        setDomain(null);
        setAdd(!add);
        alert("Added. Reload the page to see the changes.");
      }
    });
  }

  useEffect(() => {
    if (domain && dPass) {
      createDomain();
    }
  }, [dPass, domain]);

  async function deleteDomain(domain) {
    const data = {
      user: `${user}`,
      vPass: `${pass}`,
      domain: `${domain}`,
    };

    const config = {
      url: "/api/vault",
      data: data,
      method: "DELETE",
    };

    await axios(config).then((res) => {
      if (res.data.status == "deleted") {
        setDel(!del);
        setDelDom(null);
        alert("Deleted. Reload the page to see the changes.");
      }
    });
  }

  useEffect(() => {
    if (delDom) {
      deleteDomain(delDom);
    }
  }, [delDom]);

  const insertData = () => {
    setAdd(!add);
  };

  const delData = () => {
    setDel(!del);
  };

  return (
    <>
      {!add ? (
        <>
          {!del ? (
            <>
              <div style={addStyle}>
                <button onClick={insertData} style={buttonStyle}>
                  Add
                </button>
                <button onClick={delData} style={buttonStyle}>
                  Delete
                </button>
              </div>
              <div>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }}>Sno.</th>
                      <th>Domain</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>{elements}</tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", marginTop: "250px" }}>
                <form onSubmit={toDel} method="POST">
                  <input
                    placeholder="Domain"
                    name="dom"
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
      ) : (
        <>
          <div style={{ textAlign: "center", marginTop: "250px" }}>
            <form onSubmit={toAdd} method="POST">
              <input
                placeholder="Domain URL"
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
