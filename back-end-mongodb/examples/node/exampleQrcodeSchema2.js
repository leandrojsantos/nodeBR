const Mongoose = require('mongoose')

const QrcodeSchema = new Mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    width: {
        type: String,
    },
    height: {
        type: String,
    },
    colorDark: {
        type: String,
    },
    colorLight: {
        type: String,
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

//mocha workaround
module.exports = Mongoose.models.qrcode || Mongoose.model('qrcode', QrcodeSchema)



/*********************************************************** metodo para node

Var unirest = require("unirest");

var req = unirest("POST", "https://qrzebra-qr-ze-v1.p.rapidapi.com/campaign/");

req.headers({
    "x-rapidapi-host": "qrzebra-qr-ze-v1.p.rapidapi.com",
    "x-rapidapi-key": "SIGN-UP-FOR-KEY",
    "content-type": "application/json",
    "accept": "application/json"
});

req.type("json");
req.send({
    "campaign": {
        "qrType": "qr2",
        "qrUrl": "https://qrcode-zebra.com/"
    },
    "qr": {
        "size": 500,
        "colorDark": "rgba(5,64,128,1)",
        "logo": "https://i.imgur.com/V4LFcOU.png",
        "eye_outer": 2,
        "eye_inner": 1,
        "qrData": 0,
        "backgroundColor": "rgba(255,255,255,1)",
        "gradient": true,
        "grdType": 4,
        "color01": "rgba(5,64,128,1)",
        "color02": "rgba(243,5,5,1)",
        "eye_color": true,
        "eye_color01": "rgba(5,64,128,1)",
        "eye_color02": "rgba(243,5,5,1)"
    }
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});


********************************************************no schema 1 response200 
{
    "campaign": {
        "qrType": "qr2"
        "qrUrl": "https://qrcode-zebra.com/"
    }
    "qr": {
        "size": 500
        "colorDark": "rgba(5,64,128,1)"
        "logo": "https://i.imgur.com/V4LFcOU.png"
        "eye_outer": 2 
        "eye_inner": 1 
        "qrData": 0 
        "backgroundColor": "rgba(255,255,255,1)"
        "gradient": true 
        "grdType": 4 
        "color01": "rgba(5,64,128,1)"
        "color02": "rgba(243,5,5,1)"
        "eye_color": true 
        "eye_color01": "rgba(5,64,128,1)"
        "eye_color02": "rgba(243,5,5,1)"
    }
}

********************************************************* schema1

    type: object,
    properties: {
        campaign: {
            type: object,
            properties: {
                qrType: {
                    type: string
                },
                qrUrl: {
                    type: string,
                    format: uri
                }
            }
        },

        qr: {
            type: object,
            properties: {
                size: {
                    type: integer
                },
                colorDark: {
                    type: string
                },
                logo: {
                    type: string,
                    format: uri
                },
                eye_outer: {
                    type: integer
                },
                eye_inner: {
                    type: integer
                },
                qrData: {
                    type: integer
                },
                backgroundColor: {
                    type: string
                },
                gradient: {
                    type: boolean
                },
                grdType: {
                    type: integer
                },
                color01: {
                    type: string
                },
                color02: {
                    type: string
                },
                eye_color: {
                    type: boolean
                },
                eye_color01: {
                    type: string
                },
                eye_color02: {
                    type: string
                },
                insertedAt: {
                    type: Date,
                    default: new Date()
                }
            }
        }
    }

****************************************************************schema2
            uri: 'https://mdbapi.herokuapp.com/documentation',
            width: 300,
            height: 300,
            colorDark: '#ff0000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H

*****************************************************************schema3
    campaign: {
        properties: {
            qrType: {
                type: string
            },
            qrUrl: {
                type: string,
                format: uri
            }
        }
    },

    qr: {
        properties: {
            size: {
                type: integer
            },
            colorDark: {
                type: string
            },
            logo: {
                type: string,
                format: uri
            },
            qrData: {
                type: integer
            },
            backgroundColor: {
                type: string
            },
            gradient: {
                type: boolean
            },
            grdType: {
                type: integer
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        }
    }
*/