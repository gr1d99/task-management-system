interface IResult<T> {
    value: T | null;
}

const storeItem = (name: string, value: string | number | object) => {
    localStorage.setItem(name, JSON.stringify({value}));
}

const getItem = <T>(name: string): IResult<T> => {
    try {
        const item = localStorage.getItem(name);

        if (item === null) {
            return {value: null}
        }

        return JSON.parse(item);
    } catch (e) {
        console.error(e);
        return {value: null}
    }
}

const removeItem = (name: string) => {
    const item = getItem(name);

    if (item.value !== null) {
        localStorage.removeItem(name);
    }
}

export {storeItem, getItem, removeItem};
