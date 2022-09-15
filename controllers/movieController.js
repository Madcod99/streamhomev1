const Movie = require('./../models/movieModel');
const fs = require('fs');
const rootDir = require('path').resolve('./');




exports.createMovie = async (req, res,) => {
    try {
        const movie = await Movie.create(req.body);
        if (!movie) {
            res.status(400).json({
                status: "fail",
                message: "echec de l'enregistrement"
            });
        }
        res.status(200).json({
            status: "sucess",
            message: "movie added",
            data: movie
        });
    } catch (err) {
        throw new Error(err);
    }
};

exports.getMovies = async (req, res,) => {
    const movies = await Movie.find();

    console.log(movies);

    if (movies.length == 0) {
        res.status(400).json({
            status: "sucess",
            message: "Aucun film trouvé"
        })
    }

    res.status(200).json({
        status: "sucess",
        message: "",
        length: movies.length,
        data: movies
    });
};

exports.getMovieById = async (req, res,) => {
    const movie = await Movie.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    if (!movie) {
        throw new Error("pas de film pour ce id");
    }
    res.status(200).json({
        status: 'success',
        data: {
            movie
        }
    });
};

// lancé un stream pour la lecture here
exports.playMovie = async (req, res) => {
    const movieTitle = req.params.title;
    const range = req.headers.range || "bytes=3244032-";
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    console.log('RANGE --- ' + range);
    // get video stats (about 61MB)
    const videoPath = `${rootDir}/videos/${movieTitle}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoPath);
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
}

