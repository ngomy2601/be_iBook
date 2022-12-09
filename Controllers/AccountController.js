const AccountRepository = require('../repositories/AccountRepository');
const {
  EXISTED_USER,
  CREATE_SUCCESS,
  MISSING_PARAMS,
  USER_NOT_FOUND,
  UPDATE_SUCCESS,
} = require('../Constants/message');

//Show a list of already account in system
const getAllAccounts = async (req, res, next) => {
  const accounts = await AccountRepository.getAccounts();
  console.log(
    '🚀 ~ file: AccountController.js ~ line 13 ~ getAllAccounts ~ accounts',
    JSON.stringify(accounts)
  );
  return res.status(200).send(accounts);
};

//Search account
const searchAccount = async (req, res, next) => {
  try {
    const { keyword } = req.params;
    const foundAccount = await AccountRepository.searchAccount(keyword);
    if (!foundAccount) return res.status(404).send(NOT_FOUND);
    return res.send(foundAccount);
  } catch (error) {
    console.log('error: ', error);
  }
};

//Create a new account
const createAccount = async (req, res, next) => {
  const { firstName, lastName, role, email, password } = req.body;
  if (!firstName || !lastName || !role || !email || !password)
    return res.status(400).send(MISSING_PARAMS);

  const user = await AccountRepository.getAccountByEmail(email);

  if (user) return res.status(400).send(EXISTED_USER);

  const data = {
    firstName,
    lastName,
    role,
    email,
    password,
  };

  const newUser = await AccountRepository.register(data);
  return res.status(200).send(CREATE_SUCCESS);
};

//Update an already account
const updateAccountInfo = async (req, res, next) => {
  const { id } = req.params;

  const user = await AccountRepository.getAccountById(id);
  console.log(
    '🚀 ~ file: AccountController.js ~ line 43 ~ updateAccountInfo ~ user',
    JSON.stringify(user)
  );

  if (!user) return res.status(404).send(USER_NOT_FOUND);
  const { firstName, lastName, role, email, password } = req.body;
  const data = {
    firstName,
    lastName,
    role,
    email,
    password,
  };

  const updatedUser = await AccountRepository.updateAccount(id, data);
  return res.status(200).send(UPDATE_SUCCESS);
};

//Find account by Month
const countAccountEachMonth = async (req, res, next) => {
  try {
    const date = new Date();
    let month;
    let response = [];
    const year = date.getFullYear();
    for (month = 0; month < 12; month++) {
      let startDate = new Date(year, month, 1);
      let endDate = new Date(year, month + 1);
      const foundAccounts = await AccountRepository.findAccountByMonth(
        startDate,
        endDate
      );
      const numberOfAccount = foundAccounts.length;
      await response.push({
        monthValue: month + 1,
        numberOfAccountVal: numberOfAccount,
      });
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(
      '🚀 ~ file: AccountController.js ~ line 100 ~ countAccountEachMonth ~ error',
      error
    );
  }
};
module.exports = {
  getAllAccounts,
  createAccount,
  updateAccountInfo,
  searchAccount,
  countAccountEachMonth,
};
