/* /local direct main page */

/* Used cause of react imports */
"use client";

/* React Imports */
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import React from "react";

/* CheckBox Event */
export const Checkbox = ({
  content,
  checkState,
  onCheckChange,
  index,
  onDelete,
}) => {
  //Props
  const [isChecked, setIsChecked] = useState(checkState);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  //Get the width and the height of the screen to adjust confetti
  const { width, height } = useWindowSize();

  //Function to track when a checkbox is being checked
  const checkHandler = () => {
    setIsChecked(!isChecked);
    onCheckChange(index); // Call the parent handler to toggle checked state

    if (!isChecked) {
      // Trigger confetti effect
      setIsConfettiActive(true);
      setTimeout(() => setIsConfettiActive(false), 5000); // Stop confetti after 3 seconds
    }
  };

  //Checkbox HTML Render
  return (
    <div>
      <div className="checkBoxGrid">
        <div>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            checked={isChecked}
            onChange={checkHandler}
            className="inline-block mr-3"
          />
        </div>
        <div>
          <div className="text-checkbox">
            {isChecked ? (
              <div className="inline-block line-through"> {content} </div>
            ) : (
              <div className="inline-block"> {content} </div>
            )}
          </div>
        </div>
        <div>
          {/* Delete Button */}
          <button
            title="Delete Dream"
            className="bg-inherit ml-8"
            onClick={() => onDelete(index)}
          >
            <div className="text-xs">🗑️</div>
          </button>
        </div>
      </div>

      {/* Confetti component */}
      {isConfettiActive && (
        <>
          <Confetti
            width={width / 1.2}
            height={height}
            recycle={false}
            numberOfPieces={10}
            gravity={0.5}
            style={{ position: "fixed", top: 0, left: 0 }}
          />
          <Confetti
            width={width / 1.2}
            height={height}
            recycle={false}
            numberOfPieces={10}
            gravity={0.5}
            style={{ position: "fixed", top: 0, right: 0 }}
          />
        </>
      )}
    </div>
  );
};

// HTML Export of the page
export default function ListFunction() {
  // Variable State Intialization
  const [submitState, setSubmitState] = useState("");
  const [items, setItems] = useState([]);
  const [listTitle, setlistTitle] = useState("Untitled List");
  const [titleState, settitleState] = useState("");
  const [titleEditState, setTitleEditState] = useState("false");
  const [deleteConfirmState, setDeleteConfirmState] = useState("false");

  // Individual Item Deletion Handler
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index); // Filter out the item at the given index
    setItems(updatedItems); // Update state
    localStorage.setItem("localDreams", JSON.stringify(updatedItems)); // Update localStorage

    //Forces to reload the page. If not reload is done, some weird kind of bug is going to occure
    window.location.reload(true);
  };

  // Total Storage Clear Function
  function handleClearAllLocalStorage() {
    localStorage.clear(); // Clears all data in localStorage
    setItems([]); // Clear items in state as well
    setlistTitle("Untitled List"); // Clear items in state as well
    setDeleteConfirmState("false");
  }

  // Load items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem("localDreams");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Load title from localStorage when the component mounts
  useEffect(() => {
    const listTitle = localStorage.getItem("listTitle");
    if (listTitle) {
      setlistTitle(JSON.parse(listTitle));
    }
  }, []);

  // Save items to localStorage whenever the items array changes
  useEffect(() => {
    localStorage.setItem("localDreams", JSON.stringify(items));
  }, [items]);

  //Dream Sumbition Handler
  function handleSubmitDream(e) {
    e.preventDefault(); // Prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.dreamsInput !== "") {
      //HTML Status for the User
      setSubmitState("Dream Submitted");

      //Local Storage Change
      setItems([...items, { text: formJson.dreamsInput, checked: false }]);

      //Clear the Form
      form.reset();
    } else {
      //HTML Status for the User
      setSubmitState("Empty Dream");
    }
  }

  //Title Sumbition Handler
  function handleTitleChange(e) {
    e.preventDefault(); // Prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setTitleEditState("false");

    if (formJson.titleInput !== "") {
      //HTML Status for the User
      settitleState("Title Changed");

      //Change the Title of the currently rendered page. I got no clue why this is not needed for the items.
      setlistTitle(formJson.titleInput);

      //Change title in Local Storage
      localStorage.setItem("listTitle", JSON.stringify(formJson.titleInput));

      //Reset the form
      form.reset();
    } else {
      //HTML Status for the User
      settitleState("No Title");
    }
  }

  // Handle changes to checkbox state
  const handleCheckChange = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // List each item
  const listGoals = items.map((item, index) => (
    <Checkbox
      key={index}
      content={item.text}
      checkState={item.checked}
      onCheckChange={handleCheckChange}
      onDelete={handleDeleteItem}
      index={index}
    />
  ));

  //function to toggle a dimmed display with the rename form
  function editShowUp() {
    if (titleEditState === "false") {
      setTitleEditState("true");
      console.log(titleEditState);
    } else {
      setTitleEditState("false");
      console.log(titleEditState);
    }
  }
  //function to toggle a dimmed display with a confirmation menu
  function deleteShowUp() {
    if (deleteConfirmState === "false") {
      setDeleteConfirmState("true");
      console.log(deleteConfirmState);
    } else {
      setDeleteConfirmState("false");
      console.log(deleteConfirmState);
    }
  }

  return (
    <div>
      <h5 className="mt-20 text-center font-semibold mb-2 text-xl font-sans">
        Your Dream List
      </h5>
      <h5 className="text-center font-semibold mb-10 text-xs font-sans text-neutral-400">
        Tracking your Dreams helps you stay focused on what needs to be done!
      </h5>

      <div className="todo-grid font-sans">
        <div className="todo-item">
          <div className="title-checkbox">
            {listTitle}{" "}
            <button
              title="Edit Name"
              className="bg-inherit ml-3"
              onClick={editShowUp}
            >
              <div className="text-s">✏</div>
            </button>
          </div>
          <div className="checkboxes">{listGoals}</div>
        </div>
      </div>

      <form method="post" onSubmit={handleSubmitDream}>
        <center>
          <input
            name="dreamsInput"
            type="text" // Change type to text
            placeholder="Add a new dream..."
            className="textbox block"
          />
          <button type="submit" className="btn-list">
            Add Dream
          </button>
        </center>
      </form>
      <br></br>
      <br></br>
      <br></br>

      <center>
        <button className="erase-button" onClick={deleteShowUp}>
          Erase Everything
        </button>
      </center>
      <div>
        {titleEditState === "true" ? (
          <div className="dim-effect">
            <div className="rename-form">
              <form method="post" onSubmit={handleTitleChange} className="">
                <input
                  name="titleInput"
                  type="text" // Change type to text
                  placeholder="Rename your List"
                  className="textbox"
                />
                <button type="submit" className="btn-list">
                  Rename List
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        {deleteConfirmState === "true" ? (
          <div className="dim-effect rename-form">
            <div className="text-xs text-slate-400 ml-15 mr-15 text-center">
              Hey! This action cannot be reversed! Once you erase, your saved
              data is gone forever!
            </div>
            <div className="">
              <button
                onClick={handleClearAllLocalStorage}
                className="erase-button m-5"
              >
                Confirm
              </button>
              <button onClick={deleteShowUp} className="btn-list">
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
