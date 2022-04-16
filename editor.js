let from, to;
window.onload = gen;

function gen() {
    let width = Number(document.getElementById('width').value);
    let height = Number(document.getElementById('height').value);
    from = [];
    to = [];
    for (let i = 0; i < height; i++) {
        from.push([]); to.push([]);
        for (let j = 0; j < width; j++) {
            from[i].push(0); to[i].push(0);
        }
    }
    let fromel = document.getElementById("from");
    let toel = document.getElementById("to");
    fromel.style.width = width * 40;
    fromel.style.height = height * 40;
    toel.style.width = width * 40;
    toel.style.height = height * 40;
    drawPanel();
}

function drawPanel() {
    let fromel = document.getElementById("from");
    let toel = document.getElementById("to");
    while (fromel.firstChild) fromel.removeChild(fromel.firstChild);
    while (toel.firstChild) toel.removeChild(toel.firstChild);
    for (let i = 0; i < from.length; i++) {
        let rowfrom = document.createElement("div")
        let rowto = document.createElement("div")
        rowfrom.classList.add("hlist");
        rowto.classList.add("hlist");
        for (let j = 0; j < from[0].length; j++) {
            let buttonfrom = document.createElement("button");
            let buttonto = document.createElement("button");
            if (from[i][j]) buttonfrom.classList.add("active");
            if (to[i][j]) buttonto.classList.add("active");
            buttonfrom.addEventListener("click", click("from", j, i));
            buttonto.addEventListener("click", click("to", j, i));
            rowfrom.appendChild(buttonfrom);
            rowto.appendChild(buttonto);
        }
        fromel.appendChild(rowfrom);
        toel.appendChild(rowto);
    }
    document.getElementById("export").href = "./index.html#" + exportPanel();
}

function click(el, x, y) { return () => {
    if (el === "from") from[y][x] = !from[y][x];
    else if (el === "to") to[y][x] = !to[y][x];
    drawPanel();
}}

function exportPanel() {
    let fromfl = from.flat(); let tofl = to.flat(); let ret = from.length + "," + from[0].length + ",";
    for (let i = 0; i < fromfl.length; i++) {
        ret += fromfl[i] + (2 * tofl[i]);
    }
    return ret;
}