const { getDatabase } = require("../models/connect");


async function tempo() {
    const connection = getDatabase();
    return connection.collection("reparation").aggregate(
        [
            {
                $match: {
                    "date_sortie": {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                $group:
                {
                    _id: null,
                    averageTime:
                    {
                        $avg:
                        {
                            $dateDiff:
                            {
                                startDate: { $toDate: "$date_depot" },
                                endDate: { $toDate: "$date_sortie" },
                                unit: "second"
                            }
                        }
                    }
                }
            },
            {
                $project:
                {
                    _id: 0,
                    numSecond:
                    {
                        $trunc:
                            ["$averageTime", 1]
                    }
                }
            }
        ]
    ).toArray();
}

module.exports = {
    temps: tempo
}