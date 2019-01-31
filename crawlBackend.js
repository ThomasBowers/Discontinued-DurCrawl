module.exports = {
    sort: function (colleges) {
        var output = [];

        for (var j = 0; j < colleges.length; j++) {
            output[colleges[j].order - 1] = colleges[j]
        }

        return output.filter(Boolean);
    },

    byType: function (colleges, location) {
        var output = [];
        if (location === "all") {
            for (var j = 0; j < colleges.length; j++) {
                output[colleges[j].order - 1] = colleges[j]
            }
        } else if (location === "plus") {
            for (var j = 0; j < colleges.length; j++) {
                if (colleges[j].type !== "hill") {
                    output[colleges[j].order - 1] = colleges[j]
                }
            }
        } else {
        }
        for (var j = 0; j < colleges.length; j++) {
            if (colleges[j].type === location) {
                output[colleges[j].order - 1] = colleges[j]
            }
        }
        return output.filter(Boolean);
    }
};