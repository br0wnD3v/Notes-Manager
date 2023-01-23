import Notes from "./Notes";
import Passwords from "./Passwords";

import { useState } from "react";

export default function Front({ user }) {
  const [notes, setNotes] = useState(false);
  const [passwords, setPasswords] = useState(false);

  const divStyle = {
    textAlign: "center",
    margin: "300px auto 0 auto",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    marginBottom: "20px",
  };

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
            <Notes setNotes={setNotes} user={user} />
          )}
        </>
      )}
    </>
  );
}
