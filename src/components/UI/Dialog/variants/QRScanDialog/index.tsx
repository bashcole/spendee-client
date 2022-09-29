import React, {useEffect} from 'react';
import Dialog from "@components/UI/Dialog";
import {Html5Qrcode} from "html5-qrcode";
import {Html5QrcodeCameraScanConfig} from "html5-qrcode/html5-qrcode";

interface Props {
    isShown: boolean;
    onClose: any;
    onSuccess: any;
}

interface IQRConfig extends Html5QrcodeCameraScanConfig {
    facingMode?: 'user' | 'environment'
}

const qrcodeRegionId = "html5qr-code-full-region";
let html5QrCode: Html5Qrcode | null = null

const Index = ({isShown, onClose, onSuccess}: Props) => {
    useEffect(() => {

        if (isShown) {

            // This method will trigger user permissions
            Html5Qrcode.getCameras().then(devices => {
                /**
                 * devices would be an array of objects of type:
                 * { id: "id", label: "label" }
                 */
                if (devices && devices.length) {

                    let cameraId = devices[0].id;
                    let extraConfig = {
                        aspectRatio: 1.7777778,
                        experimentalFeatures: {
                            useBarCodeDetectorIfSupported: true
                        },
                        fps: 20, // Optional frame per seconds for qr code scanning
                        qrbox: 150 // Optional if you want bounded box UI
                    }

                    let config = {
                        facingMode: "user"
                    }

                    if (devices.length > 1) {
                        config = {...config, facingMode: "environment"};
                    }

                    html5QrCode = new Html5Qrcode(/* element id */ qrcodeRegionId);
                    html5QrCode.start(
                        config,
                        extraConfig,
                        qrCodeMessage => {

                            let parts = qrCodeMessage.split("*");
                            
                            onSuccess({
                                date: parts[2],
                                amount: parts[4]
                            })

                            // @ts-ignore
                            html5QrCode.stop().then((ignore) => {
                                console.log('STOP')
                                onClose()
                            }).catch((err) => {
                                // Stop failed, handle it.;
                                console.log(err)
                            })
                        },
                        errorMessage => {
                            // parse error, ignore it.
                            console.log(errorMessage)
                        })
                        .catch(err => {
                            // Start failed, handle it.
                            console.log(err)
                        });

                }
            }).catch(err => {
                // handle err
                console.log(err)
            });
        } else {
            if (html5QrCode) {
                if (html5QrCode.getState() === 2) {
                    html5QrCode.stop().then(r => console.log(r))
                }
            }
        }

    }, [isShown, onClose, onSuccess])

    return (
        <Dialog width="340px" title="QR Code Scan" isShown={isShown} onClose={onClose}>
            <div style={{minHeight: '231px', padding: '1rem'}}>
                <div id={qrcodeRegionId}/>
            </div>
        </Dialog>
    )
}

export default Index;