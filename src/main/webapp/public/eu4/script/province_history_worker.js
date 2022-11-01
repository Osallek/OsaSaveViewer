// eslint-disable-next-line no-restricted-globals
onmessage = (message) => {
    let {i, history} = message.data;

    const histories = [];

    for (let i = 0; i < history.length; i++) {
        const h = history[i];

        histories.push(getPHistoryInternal(history, h.date));
    }

    if (histories.length > 1) {
        for (let i = 1; i < histories.length; i++) {
            if (histories[i].date === histories[i - 1].date) {
                histories.splice(i - 1, 1);
                i--;
            }
        }
    }

    postMessage({i, histories});
};

function getPHistoryInternal(history, date) {
    let toReturn = {date};

    for (const h of history) {
        if (!h.date || h.date <= date) {
            let cores = (history && history.cores) ?? new Set();

            if (h.addCores) {
                h.addCores.forEach(e => cores.add(e));
            }

            if (h.removeCores) {
                h.removeCores.forEach(e => cores.delete(e));
            }

            let claims = (history && history.claims) ?? new Set();

            if (h.addClaims) {
                h.addClaims.forEach(e => claims.add(e));
            }

            if (h.removeClaims) {
                h.removeClaims.forEach(e => claims.delete(e));
            }

            let buildings = toReturn.buildings ?? new Set();

            if (h.buildings) {
                Object.entries(h.buildings).forEach(([key, value]) => {
                    if (value) {
                        buildings.add(key);
                    } else {
                        buildings.delete(key);
                    }
                })
            }

            toReturn = {
                ...(typeof toReturn === 'object' ? toReturn : {}),
                ...h,
                owner: '---' === h.owner ? undefined : (h.owner ?? toReturn.owner),
                cores,
                claims,
                buildings
            };
        } else {
            break;
        }
    }

    return toReturn;
}
