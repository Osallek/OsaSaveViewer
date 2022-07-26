// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (message) => {
        const {data, colorMapping} = message.data;
        const array = new Uint8Array(data.length);

        for (let i = 0; i < data.length; i += 4) {
            const key = `${data[i]};${data[i + 1]};${data[i + 2]}`;
            const value = colorMapping.get(key);

            if (value) {
                array[i] = value.red;
                array[i + 1] = value.green;
                array[i + 2] = value.blue;
                array[i + 3] = value.alpha;
            } else {
                array[i] = 0;
                array[i + 1] = 0;
                array[i + 2] = 0;
                array[i + 3] = 1;
            }
        }

        postMessage(array, [array.buffer]);
    };
};
