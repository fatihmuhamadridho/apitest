const { Mart } = require('../config');

const handler = async(req: any, res: any) => {
    if (req.method === "GET") {
        const snapshot = await Mart.get();
        const list = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        const list2 = snapshot.docs[0].data().data.map((doc: any) => doc).concat([snapshot.docs[2].data()])
        const id = snapshot.docs.findIndex((doc: any) => doc.id === '26-02-2022')
        res.send({ data: list, jumlah: snapshot.docs.length, list2: list2, id: id  });
    } else if (req.method === "POST") {
        const {
            tanggal_beli,
            nama_product,
            harga_product,
            jumlah_product,
        } = req.body;
        const snapshot = await Mart.get();
        // const id = snapshot.docs.length + 1;
        const data = {
            tanggal_beli: tanggal_beli,
            nama_product: nama_product,
            harga_product: harga_product,
            jumlah_product: jumlah_product,
            total_harga: String(Number(harga_product) * Number(jumlah_product))
        }

        console.log(snapshot.docs.find((doc: any) => String(doc.id)))

        if (snapshot.docs.find((doc: any) => String(doc.id) === String(tanggal_beli))) {
            await Mart.doc(`${tanggal_beli}`)
                .set({ 
                    data: snapshot.docs[snapshot.docs.findIndex((doc: any) => doc.id === tanggal_beli)].data().data
                            .map((doc: any) => doc)
                            .concat([data])
                });
        } else {
            await Mart.doc(`${tanggal_beli}`)
                .set({ 
                    data: [data],
                    message: "gagal"
                });
        }

        res.send({
            message: "Data berhasil ditambah!",
            data: data
        })
    }
}

export default handler;