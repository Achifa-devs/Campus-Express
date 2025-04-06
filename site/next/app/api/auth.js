import jwt from 'jsonwebtoken';


export const createToken = (payload,secret) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token,secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
