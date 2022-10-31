export const root = document.getElementsByTagName("body")[0];
export let canvas;
export let ctx;
export let imgTag;

/**
 * Create a canvas to place the texture and then be able to manipulate it.
 * @param id Name canvas 
 */
export const createCanvas = (id) => {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    canvas.style.display = "none";
    root.appendChild(canvas);
    ctx = canvas.getContext("2d");
}

/**
 * Run scaling and related tasks.
 * @param {Number} scale Value scale 0 to 1.
 * @param {*} input DOM File Input
 */
export const go = (scale, input) => {
    createCanvas("canvas_imgResizer");
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        imgTag = document.createElement("img_imgResizer");
        imgTag.setAttribute("id", "imgUpload");
        imgTag.src = reader.result;
        setProcess(scale);
    });
    reader.readAsDataURL(input.files[0]);
}

/**
 * MIME code Type extensions
 */
export const typeExtension = {
    APNG : "image/apng",
    BASE64 : "base64",
    BMP : "image/bmp",
    GIF : "image/gif",
    JPEG : "image/jpeg",
    ICON : "image/x-icon",
    PJPEG : "image/pjpeg",
    PNG : "image/png",
    SVG : "image/svg+xml",
    TIFF : "image/tiff",
    WEBP : "image/webp"
}

/**
 * Scale the image and generate the output file o base64
 * @param {*} factor 
 */
export const setProcess = (factor) => {
    let img = new Image();
    img.src = imgTag.src;
    img.onload = async () => {
        canvas.height = img.width * (img.height / img.width) * factor;
        canvas.width = img.width * factor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (imgResizer.options.extension == typeExtension.BASE64) {
            imgResizer.options.base64 = getDataURLBase64();
        } else {
            download();
        }
    }
}

/**
 * Generate a download simulating a link click
 */
export const download = () => {
    let link = document.createElement("a");
    console.log(imgResizer.options.imgname.replace(/^.*[\\\/]/, ''));
    link.download = imgResizer.options.prefix + imgResizer.options.imgname.replace(/^.*[\\\/]/, '');
    link.href = canvas.toDataURL(imgResizer.options.type, imgResizer.options.quality);
    link.click();
}

/**
 * Generate base64 image
 * @returns base64 image
 */
export const getDataURLBase64 = () => {
    return canvas.toDataURL(imgResizer.options.extension, imgResizer.options.quality);
}

/**
 * Configuration output
 */
export let imgResizer = {
    options : {
        prefix : null,
        imgname : null,
        extension : null,
        quality : null,
        base64 : null,
    }
}