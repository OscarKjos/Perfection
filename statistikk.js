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

async function hentSeng(dato_id, check_id, vane_id) {
    const { data, error } = await supabase
        .from('bruker_data_vaner')
        .select('dato, vane')

    data.forEach((element) => {
        if (element.vane === vane_id && element.dato === dato_id) {
            const seng = document.getElementById(check_id);
            seng.innerHTML = "<i class='fa-solid fa-check'></i>";
            seng.style.backgroundColor = "var(--primary-color)";

            if (element.dato === today && vane_id === "Resengen") {
                const bilde = document.getElementById("ikon_av_seng");
                bilde.src = "Bilder/ikoner/bed.png";
            }

            if (element.dato === today && vane_id === "Vitaminer") {
                const bilde = document.getElementById("ikon_av_vitamin");
                bilde.src = "Bilder/ikoner/sun.png";
            }
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

// Diagram for oppredd seng (Siste 7 dager)
hentSeng(day7, "fill_7_bed", "Resengen");
hentSeng(day6, "fill_6_bed", "Resengen");
hentSeng(day5, "fill_5_bed", "Resengen");
hentSeng(day4, "fill_4_bed", "Resengen");
hentSeng(day3, "fill_3_bed", "Resengen");
hentSeng(yesterday, "fill_2_bed", "Resengen");
hentSeng(today, "fill_1_bed", "Resengen");

// Diagram for intak av vitaminer (Siste 7 dager)
hentSeng(day7, "vitamin_7", "Vitaminer");
hentSeng(day6, "vitamin_6", "Vitaminer");
hentSeng(day5, "vitamin_5", "Vitaminer");
hentSeng(day4, "vitamin_4", "Vitaminer");
hentSeng(day3, "vitamin_3", "Vitaminer");
hentSeng(yesterday, "vitamin_2", "Vitaminer");
hentSeng(today, "vitamin_1", "Vitaminer");


/* Teller antall aktiviteter per kategori */
async function countRows(tabell, relevant_id) {
    const { count, error } = await supabase
        .from(tabell)
        .select('*', { count: 'exact', head: true });

        const idbrikke = document.getElementById(relevant_id);
        idbrikke.textContent = count;

        localStorage.setItem(relevant_id, count);
}
const rowCountPromises = Promise.all([
    countRows('bruker_data_trening', "training_counter"),
    countRows('bruker_data_produktivitet', "work_counter"),
    countRows('bruker_data_journal', "journal_counter"),
    countRows('bruker_data_studie', "study_counter"),
    countRows('bruker_data_vaner', "habit_counter")
]);

const total_antall_aktiviteter = Number(localStorage.getItem("training_counter")) + Number(localStorage.getItem("habit_counter")) + Number(localStorage.getItem("work_counter")) + Number(localStorage.getItem("journal_counter")) + Number(localStorage.getItem("study_counter")); //localStorage.getItem("work_counter") + localStorage.getItem("journal_counter") + localStorage.getItem("study_counter");
localStorage.setItem("total_aktiviteter", total_antall_aktiviteter);
document.getElementById("total_counter").textContent = total_antall_aktiviteter;



/* ======== Funksjon som beregner antall reps per styrkeøvelse basert på dato ======== */

let total_week_reps = 0;
let total_month_reps = 0;
let total_year_reps = 0;
let totalreps = 0;


// Sjekker dato 
let date = new Date();
let year = date.getFullYear();
let måned = date.getMonth() + 1;


async function mikro_training(base) {
    const { data, error } = await supabase
    .from('bruker_data_mikroøkt')
    .select('dato, aktivitet')

    let today = new Date();
    const currentWeek = getWeekNumber(today);
    const currentYear = today.getFullYear();

    data.forEach(element => {

        // Antall reps per styrkeøvelse (Totalt)
        if (element.aktivitet.includes(base)) {
            const øvelse_reps = element.aktivitet.split(", ");
            
            øvelse_reps.forEach(øvelse => {
                const [navn, reps] = øvelse.split(": ");
                if (navn === base) {
                    totalreps += Number(reps)
                }
            });
        }

        // Antall reps per styrkeøvelse (Fra i år)
        if (element.dato >= year + "-01-01" && element.aktivitet.includes(base)) {
            const øvelse_reps = element.aktivitet.split(", ");
            
            øvelse_reps.forEach(øvelse => {
                const [navn, reps] = øvelse.split(": ");
                if (navn === base) {
                    total_year_reps += Number(reps)
                }
        });
        }

        // Antall reps per styrkeøvelse (Fra denne måneden)
        if (element.dato >= `${year}-${String(måned).padStart(2, "0")}-01` && element.aktivitet.includes(base)) {
            const øvelse_reps = element.aktivitet.split(", ");
            
            øvelse_reps.forEach(øvelse => {
                const [navn, reps] = øvelse.split(": ");
                if (navn === base) {
                    total_month_reps += Number(reps)
                }
        });
        }

        const elementDate = new Date(element.dato);
        const weekNumber = getWeekNumber(elementDate);
        const elementYear = elementDate.getFullYear();

        // Antall reps per styrkeøvelse (Fra denne uken)
        if (weekNumber === currentWeek && elementYear === currentYear) {
            const øvelse_reps = element.aktivitet.split(", ");
            
            øvelse_reps.forEach(øvelse => {
                const [navn, reps] = øvelse.split(": ");
                if (navn === base) {
                    total_week_reps += Number(reps)
                }
        });
        }
    });

    // Oppretter html elementer for hver kategori
        const ovelser__liste = document.querySelector(".ovelser__liste");
        const ovelser__rad = document.createElement("article");
        ovelser__rad.className = "ovelser__rad";

        if (base === "Push-Ups" || base === "Sit-Ups" || base === "Triceps-Dips") {
            ovelser__rad.classList.add("always_show_row");
        }

        if (totalreps === 0) {
            return
        }

        ovelser__rad.innerHTML = `
            <div class="ovelser__navn">
                <div class="ovelser__ikon">
                    <i class="fa-solid fa-dumbbell" aria-hidden="true"></i>
                </div>
                <p>${base}</p>
            </div>

            <div class="ovelser__statistikk">
                <small>Uke</small>
                <p>${total_week_reps !== 0 ? total_week_reps : "-" }</p>
            </div>

            <div class="ovelser__statistikk">
                <small>Måned</small>
                <p>${total_month_reps !== 0 ? total_month_reps : "-" }</p>
            </div>

            <div class="ovelser__statistikk">
                <small>År</small>
                <p>${total_year_reps !== 0 ? total_year_reps : "-" }</p>
            </div>

            <div class="ovelser__statistikk">
                <small>Totalt</small>
                <p>${totalreps !== 0 ? totalreps : "-"}</p>
            </div>
        `;

        ovelser__liste.appendChild(ovelser__rad);

    totalreps = 0;
    total_year_reps = 0;
    total_month_reps = 0;
    total_week_reps = 0;
}
mikro_training("Push-Ups");
mikro_training("Sit-Ups");
mikro_training("Planke");
mikro_training("Triceps-Dips");
mikro_training("Biceps Curls");

mikro_training("Crunches");
mikro_training("Beinhev");
mikro_training("Rygghev");
mikro_training("Supermann");
mikro_training("Bird-dog");
mikro_training("Russian Twist");
mikro_training("Ankel-touch");
mikro_training("Side-Planke");

mikro_training("Knebøy");
mikro_training("Utfall");
mikro_training("Seteløft");
mikro_training("Tåhev");
mikro_training("Reverse Calf Raise");


/* ======== Funksjon som beregner antall reps totalt/år/måned/uke ======== */

async function reps_count() {
    const { data, error } = await supabase
    .from('bruker_data_mikroøkt')
    .select('dato, repetisjoner');

    let reps_total = 0;
    let reps_year = 0;
    let reps_month = 0;
    let reps_week = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
    };

    let today = new Date();
    const currentWeek = getWeekNumber(today);
    const currentYear = today.getFullYear();

    data.forEach(element => {
        const elementDate = new Date(element.dato);
        const weekNumber = getWeekNumber(elementDate);
        const elementYear = elementDate.getFullYear();

        reps_total += Number(element.repetisjoner);
        document.getElementById("antall-reps-totalt").textContent = reps_total;

        // Antall reps år
        if (element.dato >= year + "-01-01") {
            reps_year += Number(element.repetisjoner);
            document.getElementById("antall-reps-ar").textContent = reps_year;
        }

        // Antall reps måned
        if (element.dato >= `${year}-${String(måned).padStart(2, "0")}-01`) {
            reps_month += Number(element.repetisjoner);
            document.getElementById("antall-reps-maned").textContent = reps_month;
        }

        // Antall reps uke
        function allweekreps(antall, id_element, id_prosent) {
        if (weekNumber === (currentWeek-antall) && elementYear === currentYear) {
            reps_week[antall + 1] += Number(element.repetisjoner);

            document.getElementById(id_element).textContent = reps_week[antall + 1];
            document.getElementById(id_prosent).style.height = (reps_week[antall + 1])/5 + "%";

            if (antall === 0) {
                document.getElementById("antall-reps-uke").textContent = reps_week[1];
            }
        }
        }
        allweekreps(0, "reps_numb_1", "reps_week_1");
        allweekreps(1, "reps_numb_2", "reps_week_2");
        allweekreps(2, "reps_numb_3", "reps_week_3");
        allweekreps(3, "reps_numb_4", "reps_week_4");
        allweekreps(4, "reps_numb_5", "reps_week_5");
        allweekreps(5, "reps_numb_6", "reps_week_6");
        allweekreps(6, "reps_numb_7", "reps_week_7");
        allweekreps(7, "reps_numb_8", "reps_week_8");
        allweekreps(8, "reps_numb_9", "reps_week_9");
        allweekreps(9, "reps_numb_10", "reps_week_10");
        allweekreps(10, "reps_numb_11", "reps_week_11");
        allweekreps(11, "reps_numb_12", "reps_week_12");
    });
}
reps_count();


// Knapp for å vise alle øvelser
    const showmore = document.getElementById("find_more_ovelser");

    showmore.addEventListener("click", () => {
        const rader = document.querySelectorAll(".ovelser__rad");

        const text = document.getElementById("text_replacement");

        if (text.textContent === "Last inn flere øvelser") {
            text.textContent = "Skjul alle øvelser";
        } else {
            text.textContent = "Last inn flere øvelser";
        }
        
        rader.forEach(rad => {
            rad.classList.toggle("show_more_rows");
        })
    })



// =================== Funksjon for å finne søvndata (siste 7 dager) =================== //


