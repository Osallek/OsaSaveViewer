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
            let cores = toReturn.cores ?? [];

            if (h.addCores) {
                cores = cores.concat(h.addCores);
            }

            if (h.removeCores) {
                cores = cores.filter(e => !h.removeCores?.includes(e))
            }

            let claims = toReturn.claims ?? [];

            if (h.addClaims) {
                claims = claims.concat(h.addClaims);
            }

            if (h.removeClaims) {
                claims = claims.filter(e => !h.removeClaims?.includes(e))
            }

            let buildings = toReturn.buildings ?? [];

            if (h.buildings) {
                Object.entries(h.buildings).forEach(([key, value]) => {
                    if (value) {
                        buildings.concat(key);
                    } else {
                        buildings.filter(item => item !== key)
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
