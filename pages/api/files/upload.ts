import formidable, { FileJSON } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import { createReadStream } from "fs";
import { rejects } from "assert";
import {v4 as uuidv4} from "uuid";

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();

            const url = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    const s3 = new aws.S3({
                        accessKeyId: process.env.ACCESSSKEY_ID,
                        secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
                    });
                    var formidableFile:any = files.file;
                    const stream = createReadStream(formidableFile.filepath);

                    // 파일 이름
                    const originalFileName = formidableFile.originalFilename.split(".").shift();
                    // 확장자
                    const fileExtension = formidableFile.originalFilename.split(".").pop();

                    await s3.upload({
                        Bucket: process.env.S3_BUCKET_NAME!,
                        Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
                        ACL: "public-read",
                        Body: stream,
                    }).promise().then((res) => resolve(res.Location)).catch((e) => rejects(e));
                });
            });
            res.statusCode = 201;
            res.send(url);
        } catch (e) {
            console.log(e);
            res.end();
        }
        res.statusCode = 405;

        return res.end();
    }
}
