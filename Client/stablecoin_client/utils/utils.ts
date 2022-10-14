// null or undefined checker 

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

// receive multiple dispatches and return array of dispatches

export function receiveMultipleDispatches(...dispatches: any): any[] {
    return dispatches;
}