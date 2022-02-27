const { Users } = require('./config');

const handler = async(req: any, res: any) => {
    if (req.method === "GET") {
        const snapshot = await Users.get();
        const list = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) )
        res.send(list)
    } else if (req.method === "POST") {
        const { email, password } = req.body;
        const data = {
            email: email,
            password: password
        }
        await Users.add(data);
        res.send({ message: "User added" });
    }
}

export default handler;