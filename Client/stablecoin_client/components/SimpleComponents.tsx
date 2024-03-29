//create a simple react component with typescript
// which is a button with a text and a disabled property
// which can create an event when clicked and can be disabled or not
// which receives a function as a prop and can be called when clicked

import React, { SetStateAction, useEffect } from "react";
import { useGlobalDispatch, useGlobalState } from "../context";
import { MdCallReceived } from "react-icons/md";
import { FiSend } from "react-icons/fi";
export function Button(props: {
  text: string;
  disabled?: boolean;
  value: string;
  onClick: (value: string) => void | Promise<void>;
}) {
  return (
    <button
      disabled={props.disabled}
      onClick={async () => {
        await props.onClick(props.value);
      }}
    >
      {props.text}
    </button>
  );
}

// input component with a label and a text input field
// which can be disabled or not
// which can be used to get a value from the user
// which can be used to check the validation of the input and change the color of the input

export function Input(props: {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: ((value: string) => void) | React.Dispatch<SetStateAction<any>>;
  validate?: (value: string) => boolean;
}) {
  return (
    <div className="box__input-container">
      <label>
        {props.label} <br />
        <input
          placeholder={props.placeholder ? props.placeholder : ""}
          disabled={props.disabled}
          className="box__send-token-input"
          onChange={(e) => {
            if (props.onChange) {
              console.log(e.target.value);

              props.onChange(e.target.value);
            }
            if (props.validate) {
              if (props.validate(e.target.value)) {
                e.target.style.backgroundColor = "green";
              } else {
                e.target.style.backgroundColor = "red";
              }
            }
          }}
        />
      </label>
    </div>
  );
}

// dropdown component with a dropdown field
// which can select an option from the dropdown
// which can set the value of the dropdown
// when an option is selected, visulize the selected option in the dropdown

export function Dropdown(props: {
  options: object;
  onChange1?: ((value: string) => void) | React.Dispatch<SetStateAction<any>>;
  onChange2?: (value: string) => void;
}) {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return (
    <select
      value={state.address}
      onChange={(e) => {
        if (props.onChange1 && props.onChange2) {
          props.onChange1(e.target.value);
          props.onChange2(e.target.value);
        } else if (props.onChange1) {

          props.onChange1(e.target.value);
        }
      }}
    >
      {Object.keys(props.options).map((value, _id) => {
        return (
          <option
            key={_id}
            value={value}
            // defaultValue={state.address === option ? true : false}
          >
            {value}
          </option>
        );
      })}
    </select>
  );
}

// box component with a title and a body
// glassmorphism style css

export function Box(props: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        marginBottom: "20px",
        padding: "10px 30px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
      }}
      className={`box ${props.className ? props.className : ""}`}
    >
      {props.title && <h1>{props.title}</h1>}
      {props.children}
    </div>
  );
}

/* glass morphism  style box css */

// panel component with a title and a body and children

export function Panel(props: { title: string; children?: React.ReactNode }) {
  return (
    <div className="panel">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

// button component with a text
// which changes the color of the button when hovered

export function Button2(props: {
  text: string;
  value?: string;
  onClick?: (value?: string | number | null) => any;
  className?: string;
}) {
  return (
    <button
      className={props.className ? props.className : "send-token"}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "rgba(100,100,100,0.6)";
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "rgba(255,255,255,0.2)";
      }}
      onClick={async () => {
        if (props.onClick) {
          if (props.value) {
            await props.onClick(props.value);
          }
          props.onClick();
        }
      }}
    >
      {props.text}
    </button>
  );
}

// container component with a title and several children

export function Container(props: {
  flexDirection?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: props.flexDirection ? props.flexDirection : "row",
        marginRight: "20px",
      }}
      className={`container ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
}

// container component with a title and several children
// which should be displayed in a row

export function Container2(props: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="container">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

// container component with a title and several children
// which should be displayed in a row
// which can be scrolled vertically

export function ScrollContainer(props: {
  flexDirection?: string;
  children?: React.ReactNode;
}) {
  return <div className="container scroll-box">{props.children}</div>;
}

export function Card(props: {
  type?: string;
  txValue: {
    from: string;
    to: string;
    value: number;
  };
}) {

  switch (props.type) {
    case "receive":
      return (
        <>
          <div className="card-elem">
            <MdCallReceived className="card-icon" />
          </div>
          <div>
            <h4>{`from: ${props.txValue.from}`}</h4>
            <h4>{`value: ${props.txValue.value}`}</h4>
          </div>
        </>
      );

    case "send":
      return (
        <>
          <div className="card-elem">
            <FiSend className="card-icon" />
          </div>
          <div>
            <h4>{`to: ${props.txValue.to}`}</h4>
            <h4>{`value: ${props.txValue.value}`}</h4>
          </div>
        </>
      );
    default:
      return <></>;
  }
}
