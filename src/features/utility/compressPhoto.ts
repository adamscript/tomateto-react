const reader = new FileReader();
const img = new Image();

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

function compressPhoto(photoFile: any){

    return new Promise((resolve) => {
        reader.onload = (e) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
    
                context?.drawImage(img, 0, 0, img.width, img.height);
                URL.revokeObjectURL(img.src);

                canvas.toBlob((blob: any) => {
                    resolve(blob)
                }, "image/jpeg", 0.6)
            }
    
            if(typeof reader.result === 'string'){
                img.src = reader.result;
            }
        }
        
        if(photoFile){
            reader.readAsDataURL(photoFile);
        }
    })
};

export default compressPhoto;