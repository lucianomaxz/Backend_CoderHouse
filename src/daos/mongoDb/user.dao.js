import { UserModel } from './models/user.model.js';
// import { createHash, isValidPassword } from '../utils.js';

export default class UserDao {

    constructor(model) {
        this.model = model;
      }


  // async register(user) {
  //   try {
  //     const { email, password } = user;
  //     const existUser = await this.getByEmail(email);
  //     if(!existUser){
  //       if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
  //         return await UserModel.create({
  //           ...user,
  //           // password: createHash(password),
  //           password,
  //           role: 'admin'
  //       });
  //       } 
  //         return await UserModel.create({
  //             ...user,
  //             // password: createHash(password),
  //             password
  //         });
  //       } else return false;
  //     } catch (error) {
  //       console.log(error)
  //       throw new Error(error)
  //     }
  //   }


  // async login(user){
  //   try {
  //     const { email, password } = user;
  //     const userExist = await this.getByEmail(email); 
  //     // console.log(userExist);
  //     if(userExist){
  //       // const passValid = isValidPassword(password, userExist)
  //       // console.log('PASS', passValid);
  //       // if(!passValid) return false
  //       // else return userExist
  //       return userExist
  //     } return false
  //   } catch (error) {
  //     console.log(error)
  //     throw new Error(error)
  //   }
  // }

  // async getById(id){
  //   try {
  //     const userExist = await UserModel.findById(id)
  //     if(userExist) return userExist
  //     else return false
  //   } catch (error) {
  //     console.log(error)
  //     // throw new Error(error)
  //   }
  // }
  async getByEmail(email){
    try {
        return await this.model.findOne({ email });
    } catch (error) {
        throw new Error(error)
    }
}

async getUserById(id){
    try {
        return await this.model.findById(id).populate("cart"); 
    } catch (error) {
        throw new Error(error)
    }
}
}