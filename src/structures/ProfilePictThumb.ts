type T = WA.ProfilePicThumbModel;

export default class ProfilePicThumb implements WAPI.ProfilePicThumb {
    _serialized: WAPI.ProfilePicThumbSerialized;
    eurl: string;
    filehash: string;
    fullDirectPath: string;
    id: WAPI.wid;
    img: string;
    imgFull: string;
    previewDirectPath: string;
    previewEurl: string;
    stale: boolean;
    raw: string;
    tag: string;
    timestamp: number;

    constructor(data: WA.ContactModel) {
        if (!data) throw new Error("No Data Objct");
        let _data = data.getProfilePicThumb();
        if (!_data) throw new Error("No Profile Picture Found");

        return this._patch(_data);
    }

    _patch(data: T) {
        this.eurl = data.eurl;
        this.filehash = data.filehash;
        this.fullDirectPath = data.fullDirectPath;
        this.id = data.id;
        this.img = data.img;
        this.imgFull = data.imgFull;
        this.previewDirectPath = data.previewDirectPath;
        this.previewEurl = data.previewEurl;
        this.stale = data.stale;
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

    static create(data: WA.ContactModel) {
        return new ProfilePicThumb(data);
    }
}
