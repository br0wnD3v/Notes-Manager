import { useState } from "react";
import Get_details from "../components/Get_details";
import Authenticate from "../components/Autheticate";
import CreateUser from "../components/CreateUser";
import Notes from "../components/Notes";

export default function Home() {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [validUser, setValidUser] = useState(false);

  return (
    <>
      {createNew ? (
        <>
          <CreateUser />
        </>
      ) : (
        <>
          {!username || !password ? (
            <Get_details
              setPassword={setPassword}
              setUsername={setUsername}
              setCreateNew={setCreateNew}
            />
          ) : (
            <>
              {validUser ? (
                <Notes username={username} />
              ) : (
                <>
                  <Authenticate
                    username={username}
                    password={password}
                    setValidUser={setValidUser}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
