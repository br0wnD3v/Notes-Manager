import Notes from "./Notes";
import Passwords from "./Passwords";

import { useState } from "react";

export default function Front({
  user,
  password,
  setValidUser,
  setPassword,
  setUsername,
}) {
  const [notes, setNotes] = useState(false);
  const [passwords, setPasswords] = useState(false);

  const divStyle = {
    textAlign: "center",
    margin: "250px auto 0 auto",
  };

  const logOutButton = {
    width: "150px",
    height: "50px",
    margin: "20px",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    marginBottom: "20px",
  };

  function logOut() {
    setValidUser(false);
    setPassword(null);
    setUsername(null);
  }

  function openNotes() {
    setNotes(true);
  }

  function openPasswords() {
    setPasswords(true);
  }

  return (
    <>
      {!notes && !passwords ? (
        <>
          <button onClick={() => logOut()} style={logOutButton}>
            Log Out
          </button>
          <div style={divStyle}>
            <button onClick={() => openPasswords()} style={buttonStyle}>
              Password Manager
            </button>
            <br />
            <button onClick={() => openNotes()} style={buttonStyle}>
              Notes Manager
            </button>
          </div>
        </>
      ) : (
        <>
          {passwords ? (
            <Passwords setPasswords={setPasswords} user={user} />
          ) : (
            <Notes setNotes={setNotes} user={user} password={password} />
          )}
        </>
      )}
    </>
  );
}
