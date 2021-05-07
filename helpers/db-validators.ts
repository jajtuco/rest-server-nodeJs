import { Category, Role, User } from '../models';

//*** Users ***/
export const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    let msg: string = role ? `The ${role} is invalid` : 'Must enter a role'
    throw new Error(msg);
  }
};

// Check if the email exists
export const existsEmail = async (email: string) => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) throw new Error('The email already exists');
};

// Check if the user exists
export const existsUserById = async (id: string) => {
  const existsUser = await User.findById(id);
  if (!existsUser) throw new Error(`There is no user with id ${id}`);
};


//*** Categories ***/
// Check if the category exists
export const existsCategoryById = async (id: string) => {
  const existsCategory = await Category.findById(id);
  if (!existsCategory) throw new Error(`There is no category with id ${id}`);
};
