import { UserMockModel } from '../daos/mongodb/models/userMock.js';
import {generateUser} from '../utils/userMock.utils.js';

export const createUsersMock = async (cant = 100) => {
  try {
    const usersArray = [];
    for (let i = 0; i < cant; i++) {
      const user = generateUser();
      usersArray.push(user);
    }
    return await UserModel.create(usersArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async() => {
  try {
    return await UserMockModel.find({})
  } catch (error) {
    throw new Error(error);
  }
};