module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET || "your_refresh_jwt_secret",
  bcryptSaltRounds: 10,
};
