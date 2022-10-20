// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (message) => {
        const {i, province} = message.data;

        province.histories = [];

        for (let i = 0; i < province.history.length; i++) {
            const h = province.history[i];

            province.histories.push(getPHistoryInternal(province, h.date));
        }

        if (province.histories.length > 1) {
            for (let i = 1; i < province.histories.length; i++) {
                if (province.histories[i].date === province.histories[i - 1].date) {
                    province.histories.splice(i - 1, 1);
                    i--;
                }
            }
        }

        postMessage({i, histories: province.histories});
    };

    function getPHistoryInternal(province, date) {
        let history = {date};

        for (const h of province.history) {
            if (!h.date || h.date <= date) {
                let cores = (history && history.cores) ?? [];

                if (h.addCores) {
                    cores = cores.concat(h.addCores);
                }

                if (h.removeCores) {
                    cores = cores.filter(e => !h.removeCores?.includes(e))
                }

                let claims = (history && history.claims) ?? [];

                if (h.addClaims) {
                    claims = claims.concat(h.addClaims);
                }

                if (h.removeClaims) {
                    claims = claims.filter(e => !h.removeClaims?.includes(e))
                }

                let buildings = (history && history.buildings) ?? [];

                if (h.buildings) {
                    Object.entries(h.buildings).forEach(([key, value]) => {
                        if (value) {
                            buildings.concat(key);
                        } else {
                            buildings.filter(item => item !== key)
                        }
                    })
                }

                history = {
                    ...(typeof history === 'object' ? history : {}),
                    ...h,
                    owner: '---' === h.owner ? undefined : (h.owner ?? history.owner),
                    cores,
                    claims,
                    buildings
                };
            } else {
                break;
            }
        }

        delete history.addCores;
        delete history.addClaims;
        delete history.removeCores;
        delete history.removeClaims;

        return history;
    }
};
