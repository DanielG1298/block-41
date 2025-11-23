import express from 'express';
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from '#utils/jwt';
const userRouter = express.Router();
export default userRouter;

userRouter.post("/register",requireBody(["username","password"]),
async(req,res) =>{
const {username,password} = req.body;
const user = await createUser(username,password);
const token = createToken({id: user.id });
res.status(201).send(token);
});

userRouter.post("/login",requireBody(["username","password"]),
async (req,res) =>{
    const {username,password} = req.body;
    const user = await getUserByUsernameAndPassword(username,password);
    if (!user)
        return res.status(401).send("invalid username or password");
    const token = createToken({id: user.id});
    res.send(token);

});