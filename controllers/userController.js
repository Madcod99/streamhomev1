const User = require('./../models/userModel');


exports.createUser = async (req, res,) => {
    const user = await User.create(req.body);
    if (!user) {
        res.status(400).json({
            status: "fail",
            message: "echec enregistrement"
        })
    }
    res.status(200).json({
        status: "sucess",
        message: "enregistrer avec sucess",
        data: user
    });
};


exports.updateUser = async (req, res,) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
        res.status(400).json({
            status: "fail",
            message: "echec de l'update"
        })
    }
    res.status(200).json({
        status: "sucess",
        message: "update  avec sucess",
        data: user
    });
};

exports.getUsers = async (req, res,) => {
    const users = await User.find();

    if (users.length == 0) {
        res.status(400).json({
            status: "sucess",
            message: "Aucun film trouvé"
        })
    }
    res.status(200).json({
        status: "sucess",
        message: "",
        length: users.length,
        data: users
    });

};

exports.getUserById = async (req, res,) => {
    const userId = req.params.id * 1;
    const user = await User.findById(userId);
    // Tour.findOne({ _id: req.params.id })

    if (!user) {
        throw new Error("pas de film pour ce id");
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
};


exports.deleteUser = async (req, res,) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "sucess",
            message: "supprimé",
            data: true
        });
    
    }catch(err){
        throw new Error(err)
    }
};

