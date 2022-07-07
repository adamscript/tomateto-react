import Pica from "pica";
import compressPhoto from "./compressPhoto";

const pica = new Pica();

let reader = new FileReader();
let img = new Image();

let canvas = document.createElement("canvas");

const resizePhoto = (photoFile: any, dimension: number) => {
    
    return new Promise((resolve) => {
        console.log('resizing')

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
                    })
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