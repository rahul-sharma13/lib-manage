import Users from "../models/users.js";
import bcrypt from "bcryptjs";
import createToken from "../middlewares/createToken.js";

const signUp = async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    throw new Error("Please fill all required fields");
  }

  const userExists = await Users.findOne({ name, phone });
  if (userExists) return res.status(401).send("User already exists");

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new Users({ name, phone, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data:", error);
  }
};

const logIn = async (req, res) => {
  const { name, phone, password } = req.body;
  const existingUser = await Users.findOne({ name, phone });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      return res.status(201).json({
        _id: existingUser._id,
        name: existingUser.name,
        phone: existingUser.phone,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    return res.status(401).json({ message: "User not found" });
  }
};

const logOut = async (req, res) => {
  res.clearCookie("jwt");

  return res.status(200).json({ message: "Logged Out Successfully" });
};

const allUsers = async (req, res) => {
  const users = await Users.find({});
  res.json(users);
};

export { signUp, logIn, logOut, allUsers };
