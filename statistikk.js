import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://phvvbnmpujqyzqicdrrc.supabase.co'
const supabaseKey = 'sb_publishable_owGo8PDUBRjA6l4Iq5RT0Q_N8w8Awhj'
const supabase = createClient(supabaseUrl, supabaseKey)


// Funksjon som regner ut ukenummer basert på dato (Bruker denne senere)
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    // ISO-uke starter på mandag
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}


// Teller totalt antall km per trenings-kategori - basert på dato
async function hentTrening() {
    const { data, error } = await supabase
        .from("bruker_data_trening")
        .select('dato, aktivitet, distanse');

    
    
    let akt_type = "Løping";

    // Teller totalt antall km per trenings-kategori (Løping, sykling, svømming)
    /* - Beregner total, år og måneds distanse - */
    function KmCount(årsdato, månedsdato, sport) {
    let totaldistanse = 0;
    let årsdistanse = 0;
    let månedsdistanse = 0;

    data.forEach(element => {
        if (element.aktivitet === sport) {
            totaldistanse += element.distanse
        }

        if (element.aktivitet === sport && element.dato >= årsdato) {
            årsdistanse += element.distanse
        }

        if (element.aktivitet === sport && element.dato >= månedsdato) {
            månedsdistanse += element.distanse
        }
    });

    document.getElementById("total_distanse").innerText = Math.round(totaldistanse)+" km";
    document.getElementById("års_distanse").innerText = Math.round(årsdistanse)+" km";
    document.getElementById("måneds_distanse").innerText = Math.round(månedsdistanse)+" km";
}
// Beregner årstall i år
let date = new Date();
let year = date.getFullYear();
let måned = date.getMonth() + 1;
const månedString = String(måned).padStart(2, "0");
KmCount(`${year}-01-01`, `${year}-${månedString}-01`, akt_type);



// Funksjon som beregner antall km per uke (per kategori)
    function kmPerUke(aktivitet, uke1, uke2, uke3, uke4, uke5, uke6, uke7, uke8, uke9, uke10, uke11, uke12) {
        let km_uke1 = 0;    let km_uke2 = 0;    let km_uke3 = 0;    let km_uke4 = 0;    //Måned 1
        let km_uke5 = 0;    let km_uke6 = 0;    let km_uke7 = 0;    let km_uke8 = 0;    //Måned 2
        let km_uke9 = 0;    let km_uke10 = 0;   let km_uke11 = 0;   let km_uke12 = 0;   //Måned 3

        data.forEach(element => {
            let week_number = getWeekNumber(new Date(element.dato));

            if (element.aktivitet === aktivitet) {
                if (week_number === uke1) {
                    km_uke1 += element.distanse;
                }
                else if (week_number === uke2) {
                    km_uke2 += element.distanse;
                }
                else if (week_number === uke3) {
                    km_uke3 += element.distanse;
                }
                else if (week_number === uke4) {
                    km_uke4 += element.distanse;
                }
                else if (week_number === uke5) {
                    km_uke5 += element.distanse;
                }
                else if (week_number === uke6) {
                    km_uke6 += element.distanse;
                }
                else if (week_number === uke7) {
                    km_uke7 += element.distanse;
                }
                else if (week_number === uke8) {
                    km_uke8 += element.distanse;
                }
                else if (week_number === uke9) {
                    km_uke9 += element.distanse;
                }
                else if (week_number === uke10) {
                    km_uke10 += element.distanse;
                }
                else if (week_number === uke11) {
                    km_uke11 += element.distanse;
                }
                else if (week_number === uke12) {
                    km_uke12 += element.distanse;
                }
            }

            // Setter antall km per uke og runder av desimaler
            document.getElementById("km_per_uke_1").innerText = Math.round(km_uke1);
                document.getElementById("progress_fill_1").style.height = `${km_uke1}%`;
            document.getElementById("km_per_uke_2").innerText = Math.round(km_uke2); 
                document.getElementById("progress_fill_2").style.height = `${km_uke2}%`;
            document.getElementById("km_per_uke_3").innerText = Math.round(km_uke3);
                document.getElementById("progress_fill_3").style.height = `${km_uke3}%`;
            document.getElementById("km_per_uke_4").innerText = Math.round(km_uke4);
                document.getElementById("progress_fill_4").style.height = `${km_uke4}%`;
            document.getElementById("km_per_uke_5").innerText = Math.round(km_uke5);
                document.getElementById("progress_fill_5").style.height = `${km_uke5}%`;
            document.getElementById("km_per_uke_6").innerText = Math.round(km_uke6);
                document.getElementById("progress_fill_6").style.height = `${km_uke6}%`;
            document.getElementById("km_per_uke_7").innerText = Math.round(km_uke7);
                document.getElementById("progress_fill_7").style.height = `${km_uke7}%`;
            document.getElementById("km_per_uke_8").innerText = Math.round(km_uke8);
                document.getElementById("progress_fill_8").style.height = `${km_uke8}%`;
            document.getElementById("km_per_uke_9").innerText = Math.round(km_uke9);
                document.getElementById("progress_fill_9").style.height = `${km_uke9}%`;
            document.getElementById("km_per_uke_10").innerText = Math.round(km_uke10);
                document.getElementById("progress_fill_10").style.height = `${km_uke10}%`;
            document.getElementById("km_per_uke_11").innerText = Math.round(km_uke11);
                document.getElementById("progress_fill_11").style.height = `${km_uke11}%`;
            document.getElementById("km_per_uke_12").innerText = Math.round(km_uke12);
                document.getElementById("progress_fill_12").style.height = `${km_uke12}%`;
        });
    }
    const week = getWeekNumber(new Date());
    const week2 = week - 1;     const week3 = week - 2;     const week4 = week - 3;     const week5 = week - 4;
    const week6 = week - 5;     const week7 = week - 6;     const week8 = week - 7;     const week9 = week - 8;
    const week10 = week - 9;    const week11 = week - 10;   const week12 = week - 11;
    
    kmPerUke(akt_type, week, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12);


    // Funksjon for å filtrere informasjon basert på valgt aktivitet (Løping, Svømming, Sykling)
    const action = document.querySelectorAll(".diagram-action");
    action.forEach(element => {
        element.addEventListener("click", () => {

            akt_type = element.value;
            kmPerUke(akt_type, week, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12);
            KmCount(`${year}-01-01`, `${year}-${månedString}-01`, akt_type);
        });
    });
}
hentTrening();





/* ======== Funksjoner for re opp sengen - Siste 7 dager ======== */

async function hentSeng(dato_id, check_id) {
    const { data, error } = await supabase
        .from('bruker_data_vaner')
        .select('dato, vane')

    data.forEach((element) => {
        if (element.vane === "Resengen" && element.dato === dato_id) {
            const seng = document.getElementById(check_id);
            seng.innerHTML = "<i class='fa-solid fa-check'></i>";
            seng.style.backgroundColor = "var(--primary-color)";
        }

    })
} 

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - (86400000*1)).toISOString().split('T')[0];
const day3 = new Date(Date.now() - (86400000*2)).toISOString().split('T')[0];
const day4 = new Date(Date.now() - (86400000*3)).toISOString().split('T')[0];
const day5 = new Date(Date.now() - (86400000*4)).toISOString().split('T')[0];
const day6 = new Date(Date.now() - (86400000*5)).toISOString().split('T')[0];
const day7 = new Date(Date.now() - (86400000*6)).toISOString().split('T')[0];

hentSeng(day7, "fill_7_bed");
hentSeng(day6, "fill_6_bed");
hentSeng(day5, "fill_5_bed");
hentSeng(day4, "fill_4_bed");
hentSeng(day3, "fill_3_bed");
hentSeng(yesterday, "fill_2_bed");
hentSeng(today, "fill_1_bed");