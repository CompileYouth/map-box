import ManagedObject from "sap/ui/base/ManagedObject";

export default class ServiceClient extends ManagedObject {
    metadata = {
        events: {
            ready: {}
        }
    }

    static __instance__ = null;

    static getInstance() {
        if (gd.service.ServiceClient.__instance__ === null) {
            gd.service.ServiceClient.__instance__ = new gd.service.ServiceClient();
        }

        return gd.service.ServiceClient.__instance__;
    }

    init() {
        AMap.service([ "AMap.Driving", "AMap.Autocomplete", "AMap.Geocoder" ], () => {
            const options = {
                city: "南京市"
            };
            this.autoComplete = new AMap.Autocomplete(options);
            this.driving = new AMap.Driving(options);
            this.geocoder = new AMap.Geocoder(options);
            setTimeout(() => {
                this.fireReady();
            });
        });

        this.x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        this.PI = 3.1415926535897932384626;
        this.a = 6378245.0;
        this.ee = 0.00669342162296594323;
    }

    searchPoiAutoComplete(keyword) {
        return new Promise((resolve, reject) => {
            this.autoComplete.search(keyword, (status, result) => {
                if (status === "complete" && result.info === "OK") {
                    const tips = result.tips.map((val) => {
                        return {
                            name: val.name,
                            district: val.district,
                            location: this.convertToWgs84(val.location.lat, val.location.lng)
                        }
                    });
                    resolve(tips);
                }
                else {
                    reject({
                        status,
                        info: result.info
                    });
                }
            });
        });
    }

    getAddressByLatlng(lat, lng) {
        return new Promise((resolve, reject) => {
            this.convertToGcj02([[lat, lng]]).then((res) => {
                const latlng = res[0];
                this.geocoder.getAddress([latlng.lng, latlng.lat], (status, result) => {
                    if (status === "complete" && result.info === "OK") {
                        const ac = result.regeocode.addressComponent;
                        const prefix = this._getFormatString(ac.province) + this._getFormatString(ac.city)
                                        + this._getFormatString(ac.district) + this._getFormatString(ac.township);
                        resolve(result.regeocode.formattedAddress.replace(prefix, ""));
                    }
                    else {
                        reject({
                            status,
                            info: result.info
                        });
                    }
                });
            }, (reason) => {});
        });
    }

    _getFormatString(str) {
        if (typeof str === "string") {
            return str;
        }
        else {
            return "";
        }
    }

    searchDrivingRoute(locations) {
        return new Promise((resolve, reject) => {
            const start = [locations[0].lng, locations[0].lat];
            const end = [locations[1].lng, locations[1].lat];
            this.driving.search(start, end, (status, result) => {
                if (status === "complete" && result.routes.length) {
                    resolve(result.routes[0]);
                }
                else {
                    reject();
                }
            });
        });
    }

    // locations: [[lat, lng]]
    convertToGcj02(locations) {
        return new Promise((resolve, reject) => {
            const locs = locations.map((location) => {
                return [location[1], location[0]];
            });
            AMap.convertFrom(locs, "gps", (status,result) => {
                if (status === "complete") {
                    resolve(result.locations.map((loc) => {
                        return {
                            lat: loc.lat,
                            lng: loc.lng
                        }
                    }));
                }
            });
        });
    }

    convertToWgs84(lat, lng) {
        let dlat = this._transformlat(lat - 35.0, lng - 105.0);
        let dlng = this._transformlng(lat - 35.0, lng - 105.0);
        const radlat = lat / 180.0 * this.PI;
        let magic = Math.sin(radlat);
        magic = 1 - this.ee * magic * magic;
        const sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
        dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
        const mglat = lat + dlat;
        const mglng = lng + dlng;
        return [lat * 2 - mglat, lng * 2 - mglng];
    }

    _transformlat(lat, lng) {
        let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    _transformlng(lat, lng) {
        let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * this.PI) + 40.0 * Math.sin(lng / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
}
