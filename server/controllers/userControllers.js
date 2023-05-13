import bcrypt from 'bcrypt';
import User from '../models/userSchema.js'
import generateToken from '../middleware/generateToken.js'
import calcNetWorth from '../middleware/calcNetWorth.js'

export const signupUser = async (req, res) => {

    try {
        const { 
            firstName,
            lastName,
            userName,
            password,
            assets,
            currency
        } = req.body;

        // INPUT VALIDATION
        const emptyField = !firstName || !lastName || !userName || !password || assets.length < 1 || !currency;

        if (emptyField)
            return res
                    .status(400)
                    .json({ message: "All input fields are required" });

        const potentialUser = await User.findOne({ userName })

        if (potentialUser)
            return res
                    .status(400)
                    .json({ message: "Username already exists" });

        // PASSWORD HASHING
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // CALCULATE NET WORTH
        const netWorth = calcNetWorth(assets);

        // SAVING USER
        const newUser = new User({
            firstName,
            lastName,
            userName,
            password: hashedPassword,
            assets,
            netWorth,
            currency
        })

        await newUser.save();

        // GENERATING TOKEN
        const payload = {
            firstName,
            lastName,
            userName
        }

        const token = generateToken(payload);

        // SENDING RESPONSE
        res
            .status(200)
            .json({
                message: "Signed Up Successfully",
                token: token 
            })

    } catch (err) {
        res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {

    try {
        const { 
            userName,
            password
        } = req.body;

        const emptyfield = !userName || !password;

        if (emptyfield) 
            return res
                    .status(400)
                    .json({ message: "All input fields are required" });

        const potentialUser = await User.findOne({ userName });

        if (!potentialUser)
            return res 
                    .status(400)
                    .json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, potentialUser.password)

        if (!match)
            return res 
                    .status(400)
                    .json({ message: "Invalid credentials" });

        const { firstName, lastName } = potentialUser;

        const payload = {
            firstName,
            lastName,
            userName
        }

        const token = generateToken(payload);

        res 
            .status(200)
            .json({
                token: token
            });

    } catch (err) {
        res
            .status(500)
            .json({ message: "Internal server error" });
    }
}