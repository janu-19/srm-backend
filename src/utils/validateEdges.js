const validateEdges = (data) => {

    const validEdges = [];
    const invalidEntries = [];

    for (let item of data) {

        item = item.trim();

        const regex = /^[A-Z]->[A-Z]$/;

        if (!regex.test(item)) {
            invalidEntries.push(item);
            continue;
        }

        const [parent, child] = item.split("->");

        if (parent === child) {
            invalidEntries.push(item);
            continue;
        }

        validEdges.push(item);
    }

    return {
        validEdges,
        invalidEntries
    };
};

module.exports = { validateEdges };