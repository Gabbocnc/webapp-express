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

const show = (req, res) => {
    const id = req.params.id;

    const reviewsSql = `
        SELECT 
            movies.id,
            movies.title,
            movies.director,
            movies.genre,
            movies.release_year,
            movies.abstract,
            movies.image,
            reviews.name ,
            reviews.vote,
            reviews.text
        FROM movies
        LEFT JOIN reviews ON movies.id = reviews.movie_id
        WHERE movies.id = ?
    `;

    connection.query(reviewsSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore server' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const film = {
            id: results[0].movieId,
            title: results[0].title,
            director: results[0].director,
            genre: results[0].genre,
            release_year: results[0].release_year,
            abstract: results[0].abstract,
            image: results[0].image,
            reviews: results
        };

        res.json(film);
    });
};



module.exports = {
    index,
    show
}