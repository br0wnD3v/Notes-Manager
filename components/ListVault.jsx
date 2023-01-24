import { useState } from "react";

export default function ListVault({ user, pass, data }) {
  const [add, setAdd] = useState(false);

  return (
    <>
      {!add ? (
        <>
          <button onClick={() => insertData()}>Add +</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
