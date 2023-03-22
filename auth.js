const User = require('./database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const loginWithEmailPassword = async (email, password) => {
  let user = await User.findOne({
    where: {
      email: email
    }
  })

  user = user.dataValues // since users gives a complex object(proxy) with unneccesary key value pairs

  if(!user) return ('\n {status: 401} user not found \n');

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    console.log(user);

    return (user);
  };

  const token = jwt.sign(
    {user_id: user.id, email},
    JWT_PRIVATE_KEY,
    { expiresIn: 60 * 60 }
  );

  console.log({ status: 200 });

  return({ user, token })
}

const loginWithToken = async (token) => {
  if(!token) return { status: 401 }

  try {
    const usersToken = jwt.verify(token, JWT_PRIVATE_KEY);
    console.log(usersToken);

    const user = await User.findByPk(usersToken.id);

    if(!user) return { status: 401 }

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

  user = user.dataValues

  if(!user) return { status: 401 }
  
  return user
}


module.exports = {
  loginWithEmailPassword,
  loginWithToken,
  loginWithApi
}