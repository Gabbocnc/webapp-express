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


    const movieSql = `
        SELECT 
            id, title, director, genre, release_year, abstract, image
        FROM movies
        WHERE id = ?
    `;

    const reviewsSql = `
        SELECT 
            name, vote, text
        FROM reviews
        WHERE movie_id = ?
        ORDER BY id DESC
    `;


    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) {
            return res.status(500).json({ error: 'Errore server durante il recupero del film' });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }


        const film = movieResults[0];


        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) {
                return res.status(500).json({ error: 'Errore server durante il recupero delle recensioni' });
            }


            res.json({
                ...film,
                reviews: reviewsResults
            });
        });
    });
};


const addReview = (req, res) => {
    const { reviewer, review, vote } = req.body;
    const movieId = req.params.id;

    const insertReviewSql = `
        INSERT INTO reviews (movie_id, name, vote, text) 
        VALUES (?, ?, ?, ?)
    `;

    connection.query(insertReviewSql, [movieId, reviewer, vote, review], (err, result) => {
        if (err) {
            console.error("Errore nell'inserire la recensione:", err);
            return res.status(500).json({ error: 'Errore nell\'aggiungere la recensione' });
        }

        const reviewsSql = `
            SELECT 
                movies.id,
                movies.title,
                movies.director,
                movies.genre,
                movies.release_year,
                movies.abstract,
                movies.image,
                reviews.name,
                reviews.vote,
                reviews.text
            FROM movies
            LEFT JOIN reviews ON movies.id = reviews.movie_id
            WHERE movies.id = ?
        `;

        connection.query(reviewsSql, [movieId], (err, results) => {
            if (err) {
                console.error("Errore nel recupero delle recensioni:", err);
                return res.status(500).json({ error: 'Errore nel recupero delle recensioni aggiornate' });
            }

            const film = {
                id: results[0].movie_id,
                title: results[0].title,
                director: results[0].director,
                genre: results[0].genre,
                release_year: results[0].release_year,
                abstract: results[0].abstract,
                image: results[0].image,
                reviews: results
            };


            res.status(200).json(film);
        });
    });
}



module.exports = {
    index,
    show,
    addReview

}