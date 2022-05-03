const storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        let value = localStorage.getItem(key)
        if (value != null) {
            return JSON.parse(value);
        }
        return null;
    },

    remove(key) {
        localStorage.removeItem(key);
    }
}

export default storage;