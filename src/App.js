import React from "react";
import List from "./ok";

const App = () => {
  const items = [
    { text: "Item 1" },
    { text: "Item 2" },
    { text: "Item 3" },
    { text: "Item 4" },
  ];

  return (
    <>
      <div>
        <h1>My List</h1>
        <List items={items} />
      </div>
    </>
  );
};

export default App;
