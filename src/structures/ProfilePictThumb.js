/**
 * @type {import("../../index").default.ProfilePicThumb}
 */
export default class ProfilePicThumb {
    constructor(data) {
        return this._patch(data);
    }

    _patch(data) {
        this.eurl = data.eurl;
        this.filehash = data.filehash;
        this.fullDirectPath = data.fullDirectPath;
        this.id = data.id;
        this.img = data.img;
        this.imgFull = data.imgFull;
        this.previewDirectPath = data.previewDirectPath;
        this.previewEurl = data.previewEurl;
        this.state = data.state;
        this.raw = data.raw;
        this.tag = data.tag;
        this.timestamp = data.timestamp;

        this._serialized = {
            eurl: this.eurl,
            id: this.id,
            img: this.img,
            imgFull: this.imgFull,
            raw: this.raw,
            tag: this.tag,
        };

        return this;
    }

    static create(data) {
        return new ProfilePicThumb(data);
    }
}
