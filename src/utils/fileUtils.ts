import { mimeToExtension, findMimeType } from "../FileSignature";

const fileUtils = {
    /** Convert array buffer to base64 using async method */
    arrayBufferToBase64Async: async function arrayBufferToBase64Async(buffer: ArrayBuffer) {
        let blob = new Blob([buffer], { type: "application/octet-stream" }),
            result = await this.readBase64(blob),
            [, data] = result.split(",");
        console.log(result);
        return data;
    },
    /** Convert Blob object to File object */
    blobToFile: function blobToFile(blob: Blob, name?: string) {
        let mime = blob.type,
            filename = name && name !== "" ? name : `file.${mimeToExtension(mime)}`;
        return new File([blob], filename, { type: mime, lastModified: Date.now() });
    },
    /** Generate random hash with specific length */
    generateHash: async function generateHash(length: number) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    /** Generate audio waveform from audio type file */
    generateWaveform: async function generateWaveform(audioFile: File) {
        try {
            const audioData = await audioFile.arrayBuffer();
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(audioData);

            const rawData = audioBuffer.getChannelData(0);
            const samples = 64;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = [];
            for (let i = 0; i < samples; i++) {
                const blockStart = blockSize * i;
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum = sum + Math.abs(rawData[blockStart + j]);
                }
                filteredData.push(sum / blockSize);
            }

            const multiplier = Math.pow(Math.max(...filteredData), -1);
            const normalizedData = filteredData.map((n) => n * multiplier);

            const waveform = new Uint8Array(normalizedData.map((n) => Math.floor(100 * n)));

            return waveform;
        } catch (e) {
            return undefined;
        }
    },
    /** Get file hash info */
    getFileHash: async function getFileHash(data: File) {
        let buffer = await data.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    },
    /** Check and determine the mimetype of current file/blob/arraybuffer */
    getMimeType: async function getMimeType(file: File | Blob | ArrayBuffer | string) {
        /** No file, return empty string */
        if (!file) return "";
        /** If file is a File or a Blob */
        if (file instanceof File || file instanceof Blob) return file.type;

        /** If file is a string */
        if (typeof file === "string") {
            let arr = file.split(","),
                i = 0;
            for (let _ of arr) {
                let res = _.match(/:(.*?);/)?.[1] ?? "";
                if (res !== "") return res;
                if (res === "" && i === arr.length) return "application/octet-stream";
                i += 1;
            }
        }

        /** If file is an ArrayBuffer */
        if (!(file instanceof ArrayBuffer)) return "";

        const uint8arr = new Uint8Array(file),
            len = 4;

        let signature: string = "";
        if (uint8arr.length >= len) {
            let signatureArr = new Array(len);
            for (let i = 0; i < len; i++) {
                signatureArr[i] = new Uint8Array(file)[i].toString(16);
                signature = signatureArr.join("").toUpperCase();
            }
        }

        return findMimeType(signature);
    },
    /** Convert media info to File */
    mediaInfoToFile: function mediaInfoToFile(media: File | Blob | WAPI.MediaInput) {
        if (media instanceof File) return media;

        let filename = "";
        if (!(media instanceof Blob)) {
            filename = media.filename ?? "";
            media = this.mediaInfoToBlob(media);
        }

        return this.blobToFile(media, filename);
    },
    /** Convert media info to Blob */
    mediaInfoToBlob: function mediaInfoToBlob(media: File | Blob | WAPI.MediaInput) {
        if (media instanceof Blob || media instanceof File) return media;

        let { data, mimetype } = media,
            arr = data.split(",");

        if (mimetype == null || typeof mimetype == "undefined" || arr.length > 1) {
            mimetype = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
            data = arr[1];
        }

        const binaryData = window.atob(data);
        const buffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(buffer);

        for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
        }

        return new Blob([buffer], { type: mimetype });
    },
    /** Read file as base64 */
    readBase64: async function readBase64(file: File | Blob) {
        return new Promise((done, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                done(reader.result as string);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        }) as Promise<string>;
    },
    /** Read file as arraybuffer */
    readBuffer: async function readBuffer(file: File | Blob, options?: Record<"start" | "end", number>) {
        let { start, end } = options ?? { start: 0, end: 0 },
            useSlice = end > 0 && start !== end,
            useFile = useSlice ? file.slice(start, end) : file;

        return new Promise((done, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                done(reader.result as ArrayBuffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(useFile);
        }) as Promise<ArrayBuffer>;
    },
    /** Fetch URL and convert it to Base64 data */
    urlToB64: async function urlToB64(url: string) {
        let data = await fetch(url);
        if (!data.ok) throw Error("URL can't be fetched");

        let blob = await data.blob();
        return await this.readBase64(blob);
    },
};

export default fileUtils;
