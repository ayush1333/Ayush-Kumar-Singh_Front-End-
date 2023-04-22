import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <li
          key={index}
          style={{ backgroundColor: selectedIndex === index ? "green" : "red" }}
          onClick={() => handleClick(index)}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
