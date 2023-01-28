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

async function chiffreAffaireParJour(dateDebut = null, dateFin = null) {
    const connection = getDatabase();
    return connection.collection("reparation").aggregate([
        {
            $match: {
                "paiement.valid": {
                    $exists: true,
                    $eq: 1
                }
            }
        },
        {
            $group: {
                _id: "$paiement.date",
                chiffre: { $sum: "$paiement.recu" },
                count: { $sum: 1 }
            }
        }
    ]).toArray();
}

async function chiffreAffaireParMois() {
    const connection = getDatabase();
    return connection.collection("reparation").aggregate([
        {
            $match: {
                "paiement.valid": {
                    $exists: true,
                    $eq: 1
                }
            }
        }, {
            $group: {
                _id: {
                    year: { $year: "$paiement.date" },
                    month: { $month: "$paiement.date" }
                },
                total_cost_month: { $sum: "$paiement.recu" },
                booking_month: {
                    $push: {
                        voiture: "$voiture",
                        total: "$paiement.recu"
                    }
                }
            }
        }
    ]).toArray();
}

module.exports = {
    temps: tempo,
    chiffrejour: chiffreAffaireParJour,
    chiffreMois: chiffreAffaireParMois
}