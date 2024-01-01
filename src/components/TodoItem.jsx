import { useReducer } from "react";

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (newItem) => {
    dispatch({ type: "addItem", payload: newItem });
  };

  const toggleItem = (index) => {
    dispatch({ type: "toggleItem", payload: index });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a todo"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            addItem(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <ul>
        {state.items.map((item, index) => (
          <li key={index}>
            {item.hidden ? "This is hidden" : item.title}
            <button onClick={() => toggleItem(index)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        items: [...state.items, { title: action.payload, hidden: false }],
      };
    case "toggleItem":
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload ? { ...item, hidden: !item.hidden } : item
        ),
      };
    default:
      return state;
  }
}

export default TodoApp;
