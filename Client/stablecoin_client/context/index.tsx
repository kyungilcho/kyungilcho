import React, {useReducer, useContext, createContext, Dispatch} from 'react';

type Color = 'red' | 'orange' | 'yellow';

type State = {
    count: number;
    text: string;
    color: Color;
    isGood: boolean;
};

type Action =
    | { type: 'SET_COUNT'; count: number }
    | { type: 'SET_TEXT'; text: string }
    | { type: 'SET_COLOR'; color: Color }
    | { type: 'TOGGLE_GOOD' };


type SimpleDispatch = Dispatch<Action>;

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<SimpleDispatch | null>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COUNT':
            return {
                ...state,
                count: action.count,
            };
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text,
            };
        case 'SET_COLOR':
            return {
                ...state,
                color: action.color,
            };
        case 'TOGGLE_GOOD':
            return {
                ...state,
                isGood: !state.isGood,
            };
        default:
            throw new Error('Unhandled action');
    }
}

export function StateProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text: 'hello',
        color: 'red',
        isGood: true,
    });
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export function useGlobalState() {
    const state = useContext(StateContext);
    if (!state) throw new Error('Cannot find GlobalProvider');
    return state;
}

export function useGlobalDispatch() {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Cannot find GlobalProvider');
    return dispatch;
}
