export default function CreateUser() {
  const axios = require("axios");

  const inputStyle = {
    padding: "10px",
    margin: "5px",
  };

  const create = async (event) => {
    event.preventDefault();

    console.log("Event", event);
    console.log("Target", event.target);

    const user = event.target.user.value;
    const pass = event.target.pass.value;
    const vPass = event.target.vPass.value;

    if (!user || !pass || !vPass) {
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

      await axios(config).then(async (res) => {
        if (res.data.status == "created") {
          const data = {
            user: `${user}`,
            pass: `${vPass}`,
          };

          const config = {
            method: "POST",
            data: data,
            url: "/api/vault",
          };

          await axios(config).then((res) => {
            if (res.data.status == "created") {
              alert("Created!");
              window.location.reload();
            } else {
              alert("Error! Try Again Later.");
              window.location.reload();
            }
          });
        } else {
          alert("Error! Try Again Later.");
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
            name="vPass"
            type="password"
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
