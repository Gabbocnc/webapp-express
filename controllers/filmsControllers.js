const connection = require('../database/connection.js')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const responseData = {
            data: results,
        }
        console.log(responseData);


        res.status(200).json(responseData);


    })

}



module.exports = {
    index
}