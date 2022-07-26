import Pica from "pica";
import compressPhoto from "./compressPhoto";
import insertErrorLog from "./errorLogging";

const pica = new Pica();

let reader = new FileReader();
let img = new Image();

let canvas = document.createElement("canvas");

const resizePhoto = (photoFile: File, dimension: number) => {
    
    return new Promise((resolve) => {
        reader.onload = (e) => {
            img.onload = () => {
                canvas.width = img.width > img.height ? ((dimension / img.height) * img.width) : dimension;
                canvas.height = img.height > img.width ? ((dimension / img.width) * img.height) : dimension;
    
                pica.resize(img, canvas)
                .then((result) => {
                    URL.revokeObjectURL(img.src);
                    reader.abort();

                    pica.toBlob(result, 'image/jpeg', 1)
                    .then((blob) => {
                        compressPhoto(blob)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            insertErrorLog("Compressing photo / resizePhoto", err);
                        })
                    })
                    .catch((err) => {
                        insertErrorLog("Converting to Blob with pica / resizePhoto", err);
                    })
                })
                .catch((err) => {
                    insertErrorLog("Resizing photo with pica / resizePhoto", err);
                })
                
            }
    
            if(typeof reader.result === 'string'){
                img.src = reader.result;
            }
        }
        
        if(photoFile){
            reader.readAsDataURL(photoFile);
        }
    })
}

export default resizePhoto;