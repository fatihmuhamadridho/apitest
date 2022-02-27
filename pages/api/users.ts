const { Users } = require('./config');

const handler = async(req: any, res: any) => {
    if (req.method === "GET") {
        const snapshot = await Users.get();
        const list = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) )
        res.send(list)
    }
}

export default handler;