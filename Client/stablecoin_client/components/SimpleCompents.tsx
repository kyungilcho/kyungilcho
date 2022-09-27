


//create a simple react component with typescript
// which is a button with a text and a disabled property
// which can create an event when clicked and can be disabled or not 
// which receives a function as a prop and can be called when clicked

import React from "react";

export function Button(
    props: {
        text: string,
        disabled?: boolean,
        value: string,
        onClick: (value: string) => void | Promise<void>
    }) {
    return <button disabled={props.disabled}
        onClick={async () => {
            await props.onClick(props.value)
        }}>{props.text}</button>;
}

// input component with a label and a text input field
// which can be disabled or not
// which can be used to get a value from the user
// which can be used to check the validation of the input and change the color of the input 

export function Input(props: { label: string, placeholder?: string, disabled?: boolean, onChange?: (value: string) => void, validate?: (value: string) => boolean }) {
    return <div>
        <label >{props.label} <br />
            <input
                placeholder={props.placeholder ? props.placeholder : ""}
                disabled={props.disabled}
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
                }
                } />
        </label>
    </div>
}

// dropdown component with a dropdown field
// which can select an option from the dropdown
// which can set the value of the dropdown


export function Dropdown(props: { options: string[], onChange?: (value: string) => void }) {
    return <select onChange={(e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }}>
        {props.options.map((option, _id) => {
            return <option key={_id} value={option}>{option}</option>
        })}
    </select>
}

// box component with a title and a body
// glassmorphism style css

export function Box(props: { title: string, children?: React.ReactNode }) {
    return <div style={{
        width: "100%",
        height: "300px",
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
    }} className="box">
        <h1>{props.title}
        </h1>
        {props.children}
    </div>
}


/* glass morphism  style box css */

// panel component with a title and a body and children

export function Panel(props: { title: string, children?: React.ReactNode }) {
    return <div style={{
        width: "400px",
        height: "300px",
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
    }} className="panel">
        <h1>{props.title}
        </h1>
        {props.children}
    </div>
}

// button component with a text 
// which changes the color of the button when hovered

export function Button2(props: { 
    text: string, 
    value?: string,
    onClick?: (value: string) => void | Promise<void> 
}) {
    return <button style={{
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        height: "50%",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
    }} onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "rgba(100,100,100,0.6)";
    }} onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "rgba(255,255,255,0.2)";
    }}
        onClick={async () => {
            
            if (props.onClick && props.value) {
                await props.onClick(props.value);
            }
        }}
    >{props.text}</button>
}

// container component with a title and several children

export function Container(
    props: {
        flexDirection?: string,
        children?: React.ReactNode
    }) {

    const flexDirection = props.flexDirection;

    return <div style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: flexDirection ? flexDirection : "row",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
    }} className="container">
        {props.children}
    </div>
}

// container component with a title and several children 
// which should be displayed in a row

export function Container2(props: { title: string, children?: React.ReactNode }) {
    return <div style={{
        width: "800px",
        height: "500px",
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
    }} className="container">
        <h1>{props.title}
        </h1>
        {props.children}
    </div>
}