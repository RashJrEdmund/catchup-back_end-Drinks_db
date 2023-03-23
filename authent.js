const User = require('./database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const loginWithEmailPassword = async (email, password) => {
  let user = await User.findOne({
    where: {
      email: email
    }
  });

  if(!user) return { status: 401 };

  user = user.dataValues || user; // since users gives a complex object(proxy) with unneccesary key value pairs

  const match = await bcrypt.compare(password, user.password);

  if(!match) return { status: 401 };

  const token = jwt.sign(
    { barer_id: user.id, barer_email: user.email }, // giving the token barer his normal id, and email as barer_id / barer_email so i'll use it as reference when i want to log in with token
    JWT_PRIVATE_KEY,
    { expiresIn: '1h' }
  );

  return { user, token }
}

const loginWithToken = async (token) => {
  if(!token) return { status: 401 }

  try {
    const barer = jwt.verify(token, JWT_PRIVATE_KEY);
    console.log('this barer', barer);

    let user = await User.findByPk(barer.barer_id); // finding user by primary key which is barer_id as declared in the loginWithEmailPassword() fxn above

    if(!user) return { status: 401 }

    user = user.dataValues || user

    return user;
  } catch (er) {
    return { status: 401 }
  }
}

const loginWithApi = async (apikey) => {
  let user = await User.findOne({
    where: {
      apikey: apikey,
    }
  });

  if(!user) return { status: 401 }

  user = user.dataValues || user
  
  return user
}


module.exports = {
  loginWithEmailPassword,
  loginWithToken,
  loginWithApi
}