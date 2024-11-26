import { fileSignature } from "../Constant";
import WAPI from "../../.";

const fileUtils = {
    /** Convert array buffer to base64 using async method */
    arrayBufferToBase64Async: async function arrayBufferToBase64Async(buffer: ArrayBuffer) {
        let blob = new Blob([buffer], { type: "application/octet-stream" }),
            result = await this.readBase64(blob),
            [, data] = result.split(",");
        console.log(result);
        return data;
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
    getMimeType: async function getMimeType(file: File | Blob | ArrayBuffer) {
        if (!file) return null;

        let buffer =
            file instanceof File || file instanceof Blob
                ? await this.readBuffer(file, { start: 0, end: 4 })
                : file instanceof ArrayBuffer
                ? file
                : null;

        if (!buffer) return null;

        let uint8arr = new Uint8Array(buffer);

        for (let { keys, result } of fileSignature) {
            let currentSignatureArr: string[] = ((arr) => {
                let res: string[] = [];
                for (let val of arr) {
                    res.push(val.toString(16));
                    if (res.length == 4) break;
                }
                return res;
            })(uint8arr);
            const curentSignature = currentSignatureArr.join("").toUpperCase();

            if (keys.some((val) => curentSignature.match(val))) {
                return result;
            }
        }

        return null;
    },
    /** Convert media info to file */
    mediaInfoToFile: function mediaInfoToFile(media: File | WAPI.MediaInput) {
        if (media instanceof File) return media;
        const { data, mimetype, filename } = media;

        const binaryData = window.atob(data);
        const buffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(buffer);

        for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([buffer], { type: mimetype });
        return new File([blob], filename ?? "", {
            type: mimetype,
            lastModified: Date.now(),
        });
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
