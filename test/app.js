import { imgResizer, typeExtension, go } from "../package/index.js";

document.getElementById("execute").addEventListener("click", Execute);

function Execute() {
    let scale = document.getElementById("rangescale").value;
    imgResizer.options.extension = typeExtension.JPEG;
    imgResizer.options.imgname = document.getElementById("fileinput").files[0].name;
    imgResizer.options.prefix = "min_";
    imgResizer.options.quality = parseFloat(document.getElementById("quality").value);
    go(scale, document.getElementById("fileinput"));
}