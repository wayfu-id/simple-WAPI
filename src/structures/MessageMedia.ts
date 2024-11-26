import { fileUtils } from "../utils/index";
import Message from "./Message";

export default class MessageMedia {
    mimetype: string;
    data: string;
    filename?: string;
    size?: number;

    constructor({ mimetype, data, filename, size }: WA.MediaInfo) {
        /**
         * MIME type of the attachment
         */
        this.mimetype = mimetype;

        /**
         * Base64 encoded data that represents the file
         */
        this.data = data;

        /**
         * Document file name. Value can be null
         */
        this.filename = filename;

        /**
         * Document file size in bytes. Value can be null
         */
        this.size = size;
    }

    static async fromFile(file: File) {
        const { readBase64, getMimeType } = fileUtils;

        let { name: filename } = file,
            data = await readBase64(file),
            mimetype = await getMimeType(file),
            randomName = Math.random().toString(36).substring(2, 5);

        if (!filename || filename == "") filename = randomName;

        return new MessageMedia({ mimetype: mimetype ?? "application/octet-stream", data, filename });
    }

    static async fromArrayBuffer(buffer: ArrayBuffer) {
        const { arrayBufferToBase64Async, getMimeType } = fileUtils;

        let filename = Math.random().toString(36).substring(2, 5),
            data = await arrayBufferToBase64Async(buffer),
            mimetype = await getMimeType(buffer);

        return new MessageMedia({ mimetype: mimetype ?? "application/octet-stream", data, filename });
    }

    static async fromMsg(message: Message | WA.MessageModel) {
        let msg = message instanceof Message ? message : message.getModel();
        return await msg.downloadMedia();
    }
}
