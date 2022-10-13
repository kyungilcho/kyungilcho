// null or undefined checker 

export function isNullOrUndefined(value: any): boolean {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
    return value === null || value === undefined;
}

import { useContext, Dispatch } from "react";
import { DispatchContext } from "../context";

export const DispatchinApp = (dispatch: Dispatch) => {
    dispatch({ type: 'SET_COUNT', count: 1})
}