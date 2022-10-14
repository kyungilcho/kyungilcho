import React, {useReducer, useContext, createContext, Dispatch} from 'react';

type Color = 'red' | 'orange' | 'yellow';

type State = {
    privateKey: string;
    address: string;
    color: Color;
    isGood: boolean;
    status: 'idle' | 'pending' | 'success' | 'failure';
    accountList: object;
};

type Action =
    | { type: 'SET_PRIVATEKEY'; privateKey: string }
    | { type: 'SET_ADDRESS'; address: string }
    | { type: 'SET_COLOR'; color: Color }
    | { type: 'TOGGLE_GOOD' }
    | { type: 'SET_TRANSACTION_STATE'; status: State['status'] }
    | { type: 'ADD_ACCOUNT_LIST'; accountList: object };

type SimpleDispatch = Dispatch<Action>;

export const StateContext = createContext<State | null>(null);
export const DispatchContext = createContext<SimpleDispatch | null>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_PRIVATEKEY':
            return {
                ...state,
                privateKey: action.privateKey,
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
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
        case 'SET_TRANSACTION_STATE':
            return {
                ...state,
                status: action.status,
            };
        case 'ADD_ACCOUNT_LIST':
            return {
                ...state,
                accountList: Object.assign({},state.accountList, action.accountList),
            };
        default:
            throw new Error('Unhandled action');
    }
}

export function StateProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        privateKey: '',
        address: "",
        color: 'red',
        isGood: true,
        status: 'idle',
        accountList: {},
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
