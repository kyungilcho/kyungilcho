class LocalStorage {
    static get(key: string): any {
        if(typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
    }
    static set(key: string, value: any): void {
        if(typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    }
    static remove(key: string): void {
        if(typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }
}

export default LocalStorage;