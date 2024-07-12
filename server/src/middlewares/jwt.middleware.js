import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.headers.authorization

    // Aqui se valida si existe el token
    if(!token){
        return res.status(401).json({error: "Token nor provided"});
    }

    // Aqui se limpia primero el token, porque viene con la palabra bearer de primero
    token = token.split(" ")[1];
    try {
        
        const {username} = jwt.verify(token, process.env.JWT_SECRET); // Esto nos devuelve el payload
        
        req.username = username;

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Token invalid"});
    }

}

