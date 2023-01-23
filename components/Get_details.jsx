export default function Get_details({
  setUsername,
  setPassword,
  setCreateNew,
}) {
  const inputStyle = {
    padding: "10px",
    margin: "5px",
  };
  const buttonStyle = {
    cursor: "pointer",
    color: "lightblue",
    backgroundColor: "black",
    padding: "10px",
    marginLeft: "400px",
  };

  const updateState = (event) => {
    event.preventDefault();

    console.log("Event", event);
    console.log("Target", event.target);

    const user = event.target.user.value;
    const pass = event.target.pass.value;
    if (!user || !pass) {
      alert("Try Again!");
      return;
    }

    setUsername(user);
    setPassword(pass);
  };

  function create() {
    setCreateNew(true);
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "300px" }}>
        <form onSubmit={updateState} method="POST">
          <input placeholder="Username" name="user" style={inputStyle}></input>
          <br />
          <input
            placeholder="Password"
            type="password"
            name="pass"
            style={inputStyle}
          ></input>
          <br />
          <input type="submit" style={inputStyle}></input>
        </form>
        <button
          onClick={() => {
            create();
          }}
          style={buttonStyle}
        >
          Create
        </button>
      </div>
    </>
  );
}
