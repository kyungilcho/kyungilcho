// import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

// export interface GlobalStateInterface {
//     firstname: string;
//     lastname: string;
//     email: string;
// }

// export const GlobalState = createContext({
//     state: {} as Partial<GlobalStateInterface>,
//     setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
// });

// export const useGlobalState = () => useContext(GlobalState);

// const GlobalStateProvider = ({ 
//     children, 
//     value
// }: { 
//     children: React.ReactNode,
//     value: Partial<GlobalStateInterface>
// }) => {
//     const [state, setState] = useState(value);

//     return (
//         <GlobalState.Provider value={{ state, setState }}>
//             {children}
//         </GlobalState.Provider>
//     );
// }

