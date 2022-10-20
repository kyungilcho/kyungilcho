import React, {useReducer, useContext, createContext, Dispatch} from 'react';

type State = {
    accountList: object;
};

type Action =
    | { type: 'ADD_ACCOUNT_LIST'; accountList: object };

type SimpleDispatch = Dispatch<Action>;

export const StateContext = createContext<State | null>(null);
export const DispatchContext = createContext<SimpleDispatch | null>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_ACCOUNT_LIST':
            return {
                ...state,
                accountList: Object.assign({},state.accountList, action.accountList),
            };
        default:
            throw new Error('Unhandled action');
    }
}

export function AccountListProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
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

export function useAccountListState() {
    const state = useContext(StateContext);
    if (!state) throw new Error('Cannot find GlobalProvider');
    return state;
}

export function useAccountListDispatch() {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Cannot find GlobalProvider');
    return dispatch;
}
