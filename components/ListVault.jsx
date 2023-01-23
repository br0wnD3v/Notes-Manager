import { useState } from "react";

export default function ListVault({ user, vpass, obj }) {
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
