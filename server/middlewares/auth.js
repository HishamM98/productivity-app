const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const helmet = require("helmet");
const User = require("../models").models.users;
const config = require("../config/auth");

function cookieExtractor(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies["auth"];
  return token;
}

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.jwtSecret,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (user) {
        return done(null, user.toJSON());
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = {
  initialize: () => {
    return [helmet(), passport.initialize()];
  },
  authenticate: () => passport.authenticate("jwt", { session: false }),
};
