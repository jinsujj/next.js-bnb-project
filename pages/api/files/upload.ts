import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";


export const config = {
    api: {
        bodyParser: false,
    }
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                console.log(files);
            });
        } catch(e){
            console.log(e);
            res.end();
        }
    }
    res.statusCode = 405;

    return res.end();
}