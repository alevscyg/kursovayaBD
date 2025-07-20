const db = require('../db')

class KursovayaControllers {

    /////////////////////////////-----------------Musician-------------------//////////////////////////////////////

    async createMusician(req, res){
        const {musician, release_of_artist_year} = req.body
        const musicianDB = await db.query(`INSERT INTO musicians (musician, release_of_artist_year) values ($1, $2) RETURNING * `, [musician, release_of_artist_year])
        res.json(musicianDB)
    }

    async updateMusician(req, res){
        const {musician, release_of_artist_year} = req.body
        const musicianDB = await db.query(`UPDATE musicians SET musician = $1, release_of_artist_year = $2 WHERE id = $3 RETURNING *`, [musician, release_of_artist_year, req.params.id])
        res.json(musicianDB)
    }

    async deleteMusician(req, res){
        const musicianDB = await db.query(`DELETE FROM musicians WHERE id = $1 RETURNING *`, [req.params.id])
        res.json(musicianDB)
    }

    /////////////////////////////-----------------Song-------------------//////////////////////////////////////

    async createSong(req, res){
        const {song_name, album, genre, release_year, song_rating, musician_id} = req.body
        const song = await db.query(`INSERT INTO songs (song_name, album, genre, release_year, song_rating, musician_id) values ($1, $2, $3, $4, $5, $6) RETURNING * `, [song_name, album, genre, release_year, song_rating, musician_id])
        res.json(song)
    }

    async updateMSong(req, res){
        const {song_name, album, genre, release_year, song_rating, musician_id} = req.body
        const song = await db.query(`UPDATE songs SET song_name = $1, album = $2, genre = $3, release_year = $4, song_rating = $5, musician_id = $6 WHERE id = $7 RETURNING *`, [song_name, album, genre, release_year, song_rating, musician_id, req.params.id])
        res.json(song)
    }

    async deleteSong(req, res){
        const song = await db.query(`DELETE FROM songs WHERE id = $1 RETURNING *`, [req.params.id])
        res.json(song)
    }

    /////////////////////////////------------------Award_of_song------------------//////////////////////////////////////

    async createAward_of_song(req, res){
        const {song_id, award} = req.body
        const award_of_song = await db.query(`INSERT INTO awards_of_songs (song_id, award) values ($1, $2) RETURNING * `, [song_id, award])
        res.json(award_of_song)
    }

    async updateAward_of_song(req, res){
        const {song_id, award} = req.body
        const award_of_song = await db.query(`UPDATE awards_of_songs SET song_id = $1, award = $2 WHERE id = $3 RETURNING *`, [song_id, award, req.params.id])
        res.json(award_of_song)
    }

    async deleteAward_of_song(req, res){
        const award_of_song = await db.query(`DELETE FROM awards_of_songs WHERE id = $1 RETURNING *`, [req.params.id])
        res.json(award_of_song)
    }

    /////////////////////////////------------------------------------//////////////////////////////////////

    async getTop10Musicians(req, res){
        const songs = await db.query(`
        SELECT 
            m.musician,
            COUNT(a.id) AS awards_count
        FROM 
            musicians m
        JOIN 
            songs s ON m.id = s.musician_id
        JOIN 
            awards_of_songs a ON s.id = a.song_id
        GROUP BY 
            m.id, m.musician
        ORDER BY 
            awards_count DESC
        LIMIT 10;`)
        res.json(songs.rows)
    }

    async getTheNumberOfSongsForTheSpecifiedYear(req, res){
        
        const songs_count = await db.query(`
        SELECT 
            genre,
            COUNT(id) AS songs_count
        FROM 
            songs
        WHERE 
            release_year = $1
        GROUP BY 
            genre
        ORDER BY 
            songs_count DESC;`,[req.params.year])
        res.json(songs_count.rows)
    }

    async getTopAlbum(req, res){
        const {genres} = req.body
        const top = await db.query(`
        SELECT 
            album,
            AVG(song_rating) AS average_rating,
            COUNT(id) AS songs_count
        FROM 
            songs
        WHERE 
            genre = ANY($1)
            AND album IS NOT NULL
        GROUP BY 
            album
        ORDER BY 
            average_rating DESC
        LIMIT 1;`, [genres])
        res.json(top.rows)
    }

    async getMusiciansByAlphabetOrder(req, res){
        const urlSplit = req.params.years.split("-")
        const musicians = await db.query(`
        SELECT DISTINCT
            m.musician
        FROM 
            musicians m
        JOIN 
            songs s ON m.id = s.musician_id
        WHERE 
            s.album IS NOT NULL
            AND s.release_year BETWEEN $1 AND $2
        ORDER BY 
            m.musician ASC;`, [urlSplit[0], urlSplit[1]])
        res.json(musicians.rows)
    }
}
module.exports = new KursovayaControllers()