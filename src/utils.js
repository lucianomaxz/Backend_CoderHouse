export const getRandomNumber = () => Math.floor(Math.random() * 50);
import bcrypt from 'bcrypt';


/* ------------------------------------ - ----------------------------------- */
// import bcrypt from 'bcrypt';


/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * 
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);