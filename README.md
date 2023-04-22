# Ayush-Kumar-Singh_Front-End-

# Explain what the simple List component does.
Ans :-
The List component is a React component that displays an unordered list (<ul>). It receives an array of objects called items in prop, where each object has a text property with a string value. The component iterate over array using map and renders a SingleListItem component for each item.

SingleListItem is a stateless functional component that represents a single item in the list. It receives four props: index, isSelected, onClickHandler, and text. It renders an <li> element that displays the text prop and changes its background color based on whether or not it is selected (isSelected).

List uses the useState hook to manage the selected item's index state. When an item is clicked, its index is stored in the selectedIndex state. The useEffect hook is used to clear the selectedIndex state when the items prop changes.

The memo higher-order component is used to optimize SingleListItem and List by preventing unnecessary re-renders when their props haven't changed.

Overall, List is a reusable and customizable component that can be used in various scenarios where a list of items needs to be displayed.



# What problems / warnings are there with code?
Ans :-
1.The index prop in SingleListItem is passed but not used in the component. This could lead to confusion for other developers.

2.The setSelectedIndex function in WrappedListComponent should be a state function returned by the useState hook, not a function that directly sets the state. The line const [setSelectedIndex, selectedIndex] = useState(); should be changed to const [selectedIndex, setSelectedIndex] = useState(null);.

3.The isSelected prop in SingleListItem is being passed a state variable selectedIndex instead of a boolean value. This can lead to bugs, and the prop should be passed a boolean value, such as selectedIndex === index.

4.The items prop in WrappedListComponent is declared with PropTypes.array(PropTypes.shapeOf({...})), but it should be declared as PropTypes.arrayOf(PropTypes.shape({...})) instead.

5.The items prop in WrappedListComponent has a default value of null, which could cause problems if the component is not used correctly. It's better to give it an empty array as the default value instead: WrappedListComponent.defaultProps = { items: [] }.


# Please fix, optimize, and/or modify the component as much as you think is necessary.
Ans :-
In the SingleListItem component, the onClickHandler function should not be called immediately with the index argument. It should be wrapped in an arrow function or a bind function to be executed only when the element is clicked. So, it should be onClick={() => onClickHandler(index)}.

The selectedIndex state in the WrappedListComponent should be initialized with null instead of an empty array [].

In the WrappedListComponent, the useEffect hook should not be used to reset the selectedIndex state. Instead, it can be set to null directly in the handleClick function.

The PropTypes for the items prop in the WrappedListComponent should be defined as PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired })) instead of PropTypes.array(PropTypes.shapeOf({ text: PropTypes.string.isRequired })).

The defaultProps for the WrappedListComponent should be defined as an empty object {} instead of null.



# code:-
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = index => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string.isRequired })
  ),
};

List.defaultProps = {};

export default List;




