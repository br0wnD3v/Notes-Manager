export default function CreateUser() {
  const axios = require("axios");

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

  const create = async (event) => {
    event.preventDefault();

    console.log("Event", event);
    console.log("Target", event.target);

    const user = event.target.user.value;
    const pass = event.target.pass.value;
    if (!user || !pass) {
      alert("Try Again!");
      return;
    } else {
      const data = {
        user: `${user}`,
        pass: `${pass}`,
      };

      const config = {
        method: "POST",
        data: data,
        url: "/api/login",
      };

      await axios(config).then((res) => {
        if (res.data.status == "created") {
          alert("Created!");
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "250px" }}>
        <form onSubmit={create} method="POST">
          <input
            placeholder="Set Username"
            name="user"
            style={inputStyle}
            required
          ></input>
          <br />
          <input
            placeholder="Set Password"
            type="password"
            name="pass"
            style={inputStyle}
            required
          ></input>
          <br />
          <input
            placeholder="Password Vault"
            name="passMan"
            style={inputStyle}
            required
          ></input>
          <br />
          <input type="submit" style={inputStyle}></input>
        </form>
      </div>
    </>
  );
}
