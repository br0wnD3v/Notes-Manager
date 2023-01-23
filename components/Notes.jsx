export default function Notes({ setNotes }) {
  const buttonStyle = {
    padding: "10px",
    margin: "5px",
  };

  function returnBack() {
    setNotes(false);
  }

  return (
    <>
      <button onClick={() => returnBack()} style={buttonStyle}>
        BACK
      </button>
    </>
  );
}
