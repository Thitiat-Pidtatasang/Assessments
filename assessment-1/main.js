const imgFileInput = document.querySelector("#imgFileInput");
const topTxtInput = document.querySelector("#topTxtInput");
const bottomTxtInput = document.querySelector("#bottomTxtInput");
const canvas = document.querySelector("#meme");


let img; 


imgFileInput.addEventListener("change", () => {
    const imgDataUrl = url.creatObjectURL(imgFileInput.files[0]);

    img = new img();
    img.src = imgDataUrl;

    img.addEventListener("load", () => {
        updateMemeCanvas(canvas, img, topTxtInput.value, bottomTxtInput.value); 
    }, {once: true});
});


topTxtInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, img, topTxtInput.value, bottomTxtInput.value);
});


bottomTxtInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, img, topTxtInput.value, bottomTxtInput.value);
});


function updateMemeCanvas(canvas, img, topTxt, bottomTxt) {
    const ctx = canvas.getContext('2d');
    const width = img.width;
    const height = img.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;


    canvas.width = width;
    canvas.height = height;
    ctx.drawImg(img, 0, 0);


    ctx.strokeStyle = "black";
    ctx.lineWidth = math.floor(fontSize / 4);
    ctx.fillStyle = "White";  
    ctx.txtAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px`;


    ctx.txtBaseline = 'top';
    ctx.strokeTxt(topTxt, width / 2, yOffset);
    ctx.fillTxt(topTxt, width  / 2, yOffset);


    ctx.txtBaseline = 'botom';
    ctx.strokeTxt(bottomTxt, width / 2, height - yOffset);
    ctx.fillTxt(bottomTxt, width  / 2, height - yOffset);

};