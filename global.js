
/* ================= Dynamisk tema farge =================== */
function settThemeColor(farge) {
    const meta = document.querySelector('meta[name="theme-color"]');
    
    if (meta) {
        meta.setAttribute("content", farge);
    }
}


// ==================== Dynamisk Fargevalg ====================== //
    let lagretFarge = localStorage.getItem("primary_color");
    const lagretFarge2 = localStorage.getItem("secondary_color");
    const lagretFarge3 = localStorage.getItem("eksternfarge");
    let lagretFarge4 = localStorage.getItem("splash_color");
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        lagretFarge4 = "black";
        if (lagretFarge === "#1f2329" || lagretFarge === "rgb(31, 35, 41)"){
            lagretFarge = "#85bc8d";
        }
    }
    if (lagretFarge === "#1f2329" || lagretFarge === "rgb(31, 35, 41)"){
        lagretFarge4 = "black";
    }

    if (lagretFarge) {
        document.documentElement.style.setProperty("--primary-color", lagretFarge);
        document.documentElement.style.setProperty("--secondary_color", lagretFarge2);
        document.documentElement.style.setProperty("--eksternfarge", lagretFarge3);
        document.documentElement.style.setProperty("--splash-color", lagretFarge4);
    }


// ================= Tema farge basert på fargevalg ==================== //
let mediaFarge = '#00b079';
if (lagretFarge === "#00b079" || lagretFarge === "rgb(0, 176, 121)") {
    mediaFarge = '#00b079';
} else if (lagretFarge === "#2995a3" || lagretFarge === "rgb(41, 149, 163)"){
    mediaFarge = '#2995a3';
} else if (lagretFarge === "#dc4c56" || lagretFarge === "rgb(220, 76, 86)"){
    mediaFarge = '#dc4c56';
} else if (lagretFarge === "#1f2329" || lagretFarge === "rgb(31, 35, 41)"){
    mediaFarge = 'black';
}