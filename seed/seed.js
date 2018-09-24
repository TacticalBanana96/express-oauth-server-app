const { Client } = require("./../models/client");
const { AccessToken } = require("./../models/accessToken");
const { RefreshToken } = require("./../models/refreshToken");
const { AuthorizationCode } = require("./../models/authorizationCode");
const { User } = require("./../models/user");

const client = [
  {
    id: "1",
    clientSecret: "123abc",
    redirectUri: "http://localhost:3000/",
    grants: ["authorization_code"]
  },
  {
    id: "2",
    clientSecret: "456def",
    redirectUri: "http://localhost:3000/",
    grants: ["authorization_code"]
  }
];

const authorizationCodes = [
  {
    code: "sgdjhgdadhakhdadj39",
    expiresAt: new Date(2018, 9, 20).getTime(),
    redirectUri: "http://localhost:3000/",
    clientId: "1",
    userId: "123"
  },
  {
    code: "fjhsfkshf893yrefhfrfh",
    expiresAt: new Date(2018, 9, 20),
    redirectUri: "http://localhost:3000/",
    clientId: "2",
    userId: "456"
  }
];

const users = [
  {
    id: "123",
    username: "AndrewEvans",
    password: "12345"
  },
  {
    id: "456",
    username: "JenMick",
    password: "132134124"
  }
];

const populateClients = done => {
  return Client.deleteMany({})
    .then(() => {
      let clientOne = new Client(client[0]).save();
      let clientTwo = new Client(client[1]).save();

      return Promise.all([clientOne, clientTwo]);
    })
    .then(() => done());
};

const populateAuthorizationCodes = done => {
  return AuthorizationCode.deleteMany({})
    .then(() => {
      let codeOne = new AuthorizationCode(authorizationCodes[0]).save();
      let codeTwo = new AuthorizationCode(authorizationCodes[1]).save();

      return Promise.all([codeOne, codeTwo]);
    })
    .then(() => done());
};

const clearTokens = async () => {
  await AccessToken.deleteMany({});
  await RefreshToken.deleteMany({});
};

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  client,
  populateClients,
  authorizationCodes,
  populateAuthorizationCodes,
  users,
  clearTokens,
  populateUsers
};
