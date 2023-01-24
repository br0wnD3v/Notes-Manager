import axios from "axios";
import { useEffect, useState } from "react";

export default function ListNotes({ user, password, data }) {
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);

  const [task, setTask] = useState(null);
  const [delTask, setDelTask] = useState(null);

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

  if (data["incomplete"] != undefined) {
    const pending = data["incomplete"];
    const pKeys = Object.keys(pending);
    pKeys.forEach((key) => {
      elements.push(
        //Added just for the warning
        <tr key={key}>
          <td style={{ textAlign: "center", width: "200px" }}>{key}</td>
          <td>{pending[key]}</td>
        </tr>
      );
    });
  }

  if (data["complete"] != undefined) {
    const completed = data["completed"];
    const cKeys = Object.keys(completed);
    cKeys.forEach((key) => {
      elements.push(
        //Added just for the warning
        <tr key={key}>
          <td style={{ textAlign: "center", width: "60px" }}>{key}</td>
          <td>{completed[key]}</td>
        </tr>
      );
    });
  }

  const toAdd = (e) => {
    e.preventDefault();
    setTask(e.target.task.value);
  };

  const toDel = (e) => {
    e.preventDefault();
    setDelTask(e.target.taskId.value);
  };

  async function createTask() {
    const data = {
      user: `${user}`,
      pass: `${password}`,
      task: `${task}`,
    };

    const config = {
      url: "/api/note",
      data: data,
      method: "POST",
    };

    await axios(config).then((res) => {
      console.log(res.data);
      if (res.data.status == "added") {
        setTask(null);
        setAdd(!add);
        alert("Added. Reload the page to see the changes.");
      }
    });
  }

  useEffect(() => {
    if (task) {
      createTask(task);
    }
  }, [task]);

  async function deleteTask(epoch) {
    const data = {
      user: `${user}`,
      pass: `${password}`,
      taskEpoch: `${epoch}`,
    };

    const config = {
      url: "/api/note",
      data: data,
      method: "DELETE",
    };

    await axios(config).then((res) => {
      if (res.data.status == "deleted") {
        setDelTask(null);
        alert("Deleted. Reload the page to see the changes.");
      }
    });
  }

  useEffect(() => {
    if (delTask) {
      deleteTask(delTask);
    }
  }, [delTask]);

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
                      <th style={{ textAlign: "center", width: "200px" }}>
                        Unique ID
                      </th>
                      <th>Note</th>
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
                    placeholder="Unique ID"
                    name="taskId"
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
                placeholder="Note"
                name="task"
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
