import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).send({
      success: false,
      data: null,
      error: 'No token provided',
    });
  }

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        data: null,
        error: err.message,
      });
    }

    req.userId = decoded.id;
    next();
  });
};