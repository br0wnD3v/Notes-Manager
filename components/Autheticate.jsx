import { useEffect } from "react";

export default function Authenticate({ username, password, setValidUser }) {
  const axios = require("axios");

  async function checkValidity() {
    const config = {
      method: "GET",
      url: `/api/login?user=${username}&pass=${password}`,
    };

    await axios(config).then((res) => {
      if (res.data.state == "valid") setValidUser(true);
      else {
        alert("Invalid User!");
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    async function execute() {
      await checkValidity();
    }

    execute();
  }, []);
}
