import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const secret = process.env.JWT_KEY;
  const token = req.headers['x-access-token'];
  jwt.verify(token, secret, (err, decoded) => {
      if(err) {
          return res.status(401).send('Usuário não autenticado.');
      } 
      req.userId = decoded.userId;
      next();
  });
}

export {verifyJWT};