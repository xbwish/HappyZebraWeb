export const setSessionStorage = (key: string, value: any) => {
    let _value: any = value;
    const type: string = typeof value;
    if (type === 'object') {
        _value = JSON.stringify(value);
    } else if (type == 'number') {
        _value = `${value}`
    }
    sessionStorage.setItem(key, _value);
}

export const getSessionStorageWithString = (key: string): string | null => {
    return sessionStorage.getItem(key);
}

export const getSessionStorageWithNumber = (key: string): number | null => {
    const _value: string | null = sessionStorage.getItem(key);
    return _value ? parseFloat(_value) : null;
}

export const getSessionStorageWithObject = (key: string): { [key: string]: any } | null => {
    const _value: string | null = sessionStorage.getItem(key);
    return _value ? JSON.parse(_value) : null;
}