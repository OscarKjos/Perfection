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
let gjennomsnitt_av_søvn = 0;
let gjennomsnitt_av_kalorier = 0;
let gjennomsnitt_av_vann = 0;

async function hentVane(dato_id, check_id, vane_id) {
    const { data, error } = await supabase
        .from('bruker_data_vaner')
        .select('dato, vane, verdi')

    let totalverdi = 0;

    data.forEach((element) => {
        if (element.vane === vane_id && element.dato === dato_id) {
            if (vane_id === "Resengen" || vane_id === "Vitaminer") {
                const seng = document.getElementById(check_id);
                seng.innerHTML = "<i class='fa-solid fa-check'></i>";
                seng.style.backgroundColor = "var(--primary-color)";
            }

            if (element.dato === today && vane_id === "Resengen") {
                const bilde = document.getElementById("ikon_av_seng");
                bilde.src = "Bilder/ikoner/bed.png";
            }

            if (element.dato === today && vane_id === "Vitaminer") {
                const bilde = document.getElementById("ikon_av_vitamin");
                bilde.src = "Bilder/ikoner/sun.png";
            }

            if(vane_id === "Søvn") {
                const label = document.getElementById(check_id);
                label.style.height = (element.verdi * 10) + "%";

                gjennomsnitt_av_søvn += Number(element.verdi);
                const gjennomsnitt = gjennomsnitt_av_søvn / 7;
                const floor = Math.floor(gjennomsnitt);
                const decimal = gjennomsnitt - floor;
                const minutter = decimal * 60;

                document.getElementById("sleep_time").textContent = (floor).toFixed(0) + " t " + (minutter).toFixed(0) + " min";

                const sleepNote = document.getElementById("sleep_note");
                if (gjennomsnitt > 8){
                    sleepNote.textContent = "Svært god søvnmengde";
                } else if (gjennomsnitt >= 7) {
                    sleepNote.textContent = "Mindre søvn enn anbefalt";
                } else if (gjennomsnitt >= 6) {
                    sleepNote.textContent = "Søvnmengden din er lav";
                } else if (gjennomsnitt >= 0) {
                    sleepNote.textContent = "Svært lite søvn";
                }

                if(check_id==="søyle_7"){document.getElementById("sleep_label_7").textContent = element.verdi;}
                if(check_id==="søyle_6"){document.getElementById("sleep_label_6").textContent = element.verdi;}
                if(check_id==="søyle_5"){document.getElementById("sleep_label_5").textContent = element.verdi;}
                if(check_id==="søyle_4"){document.getElementById("sleep_label_4").textContent = element.verdi;}
                if(check_id==="søyle_3"){document.getElementById("sleep_label_3").textContent = element.verdi;}
                if(check_id==="søyle_2"){document.getElementById("sleep_label_2").textContent = element.verdi;}
                if(check_id==="søyle_1"){document.getElementById("sleep_label_1").textContent = element.verdi;}

                // Denne skal slettes når funksjon i index.html er ferdig - fungerer for dagsrapport
                if (dato_id === today) {
                    const floor = Math.floor(element.verdi);
                    const decimal = element.verdi - floor;
                    const minutter = decimal * 60;
                    localStorage.setItem("sleep_value_today", floor + " t " + minutter.toFixed(0) + " min");
                }
            }


            if (vane_id === "Vanntilførsel") {
                const bar_fill = document.getElementById(check_id);
                totalverdi += Number(element.verdi);
                bar_fill.style.height = (totalverdi / 35) + "%";

                gjennomsnitt_av_vann += Number(element.verdi);
                const gjennomsnitt = gjennomsnitt_av_vann / 7;

                document.getElementById("gjs_vann").textContent = gjennomsnitt.toFixed(1) + " ml";

                if(check_id==="vann_1"){document.getElementById("vann_label_1").textContent = totalverdi/100;}
                if(check_id==="vann_2"){document.getElementById("vann_label_2").textContent = totalverdi/100;}
                if(check_id==="vann_3"){document.getElementById("vann_label_3").textContent = totalverdi/100;}
                if(check_id==="vann_4"){document.getElementById("vann_label_4").textContent = totalverdi/100;}
                if(check_id==="vann_5"){document.getElementById("vann_label_5").textContent = totalverdi/100;}
                if(check_id==="vann_6"){document.getElementById("vann_label_6").textContent = totalverdi/100;}
                if(check_id==="vann_7"){document.getElementById("vann_label_7").textContent = totalverdi/100;}

                 // Denne funksjonen lagrer verdien for dagsrapport
                if (dato_id === today) {
                    localStorage.setItem("water_value_today", totalverdi + " ml");
                }
            }

            if (vane_id === "Kaloriinntak") {
                const bar_fill = document.getElementById(check_id);
                totalverdi += Number(element.verdi);
                bar_fill.style.height = (totalverdi / 35) + "%";

                gjennomsnitt_av_kalorier += Number(element.verdi);
                const gjennomsnitt = gjennomsnitt_av_kalorier / 7;

                document.getElementById("gjs_kcal").textContent = gjennomsnitt.toFixed(1) + " kcal";

                if(check_id==="kalori_1"){document.getElementById("kalori_label_1").textContent = totalverdi/100;}
                if(check_id==="kalori_2"){document.getElementById("kalori_label_2").textContent = totalverdi/100;}
                if(check_id==="kalori_3"){document.getElementById("kalori_label_3").textContent = totalverdi/100;}
                if(check_id==="kalori_4"){document.getElementById("kalori_label_4").textContent = totalverdi/100;}
                if(check_id==="kalori_5"){document.getElementById("kalori_label_5").textContent = totalverdi/100;}
                if(check_id==="kalori_6"){document.getElementById("kalori_label_6").textContent = totalverdi/100;}
                if(check_id==="kalori_7"){document.getElementById("kalori_label_7").textContent = totalverdi/100;}
            }

            if (vane_id === "Proteintilskudd" || vane_id === "Kreatin") {
                const bar_check = document.getElementById(check_id);
                bar_check.innerHTML = "<i class='fa-solid fa-check'></i>";
                bar_check.style.color = "white";
                if (vane_id === "Proteintilskudd") {bar_check.style.backgroundColor = "var(--primary-color)";}
                if (vane_id === "Kreatin") {bar_check.style.backgroundColor = "var(--eksternfarge)";}
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
hentVane(day7, "fill_7_bed", "Resengen");
hentVane(day6, "fill_6_bed", "Resengen");
hentVane(day5, "fill_5_bed", "Resengen");
hentVane(day4, "fill_4_bed", "Resengen");
hentVane(day3, "fill_3_bed", "Resengen");
hentVane(yesterday, "fill_2_bed", "Resengen");
hentVane(today, "fill_1_bed", "Resengen");

// Diagram for intak av vitaminer (Siste 7 dager)
hentVane(day7, "vitamin_7", "Vitaminer");
hentVane(day6, "vitamin_6", "Vitaminer");
hentVane(day5, "vitamin_5", "Vitaminer");
hentVane(day4, "vitamin_4", "Vitaminer");
hentVane(day3, "vitamin_3", "Vitaminer");
hentVane(yesterday, "vitamin_2", "Vitaminer");
hentVane(today, "vitamin_1", "Vitaminer");

// Diagram for søvn (Siste 7 dager)
hentVane(day7, "søyle_7", "Søvn");
hentVane(day6, "søyle_6", "Søvn");
hentVane(day5, "søyle_5", "Søvn");
hentVane(day4, "søyle_4", "Søvn");
hentVane(day3, "søyle_3", "Søvn");
hentVane(yesterday, "søyle_2", "Søvn");
hentVane(today, "søyle_1", "Søvn");

// Diagram for vanntilførsel og antall kalorier (Siste 7 dager)
hentVane(day7, "kalori_7", "Kaloriinntak");
hentVane(day7, "vann_7", "Vanntilførsel");

hentVane(day6, "kalori_6", "Kaloriinntak");
hentVane(day6, "vann_6", "Vanntilførsel");

hentVane(day5, "kalori_5", "Kaloriinntak");
hentVane(day5, "vann_5", "Vanntilførsel");

hentVane(day4, "kalori_4", "Kaloriinntak");
hentVane(day4, "vann_4", "Vanntilførsel");

hentVane(day3, "kalori_3", "Kaloriinntak");
hentVane(day3, "vann_3", "Vanntilførsel");

hentVane(yesterday, "kalori_2", "Kaloriinntak");
hentVane(yesterday, "vann_2", "Vanntilførsel");

hentVane(today, "kalori_1", "Kaloriinntak");
hentVane(today, "vann_1", "Vanntilførsel");

// Diagram for protein og kreatin (Siste 7 dager)
hentVane(day7, "protein_7", "Proteintilskudd");
hentVane(day6, "protein_6", "Proteintilskudd");
hentVane(day5, "protein_5", "Proteintilskudd");
hentVane(day4, "protein_4", "Proteintilskudd");
hentVane(day3, "protein_3", "Proteintilskudd");
hentVane(yesterday, "protein_2", "Proteintilskudd");
hentVane(today, "protein_1", "Proteintilskudd");

hentVane(day7, "kreatin_7", "Kreatin");
hentVane(day6, "kreatin_6", "Kreatin");
hentVane(day5, "kreatin_5", "Kreatin");
hentVane(day4, "kreatin_4", "Kreatin");
hentVane(day3, "kreatin_3", "Kreatin");
hentVane(yesterday, "kreatin_2", "Kreatin");
hentVane(today, "kreatin_1", "Kreatin");


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

    let reps_today = 0;
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
    const todayString = today.toISOString().split("T")[0];
    const currentWeek = getWeekNumber(today);
    const currentYear = today.getFullYear();

    data.forEach(element => {
        const elementDate = new Date(element.dato);
        const weekNumber = getWeekNumber(elementDate);
        const elementYear = elementDate.getFullYear();

        reps_total += Number(element.repetisjoner);
        document.getElementById("antall-reps-totalt").textContent = reps_total;

        // Antall reps i dag
        if (element.dato === todayString) {
            reps_today += Number(element.repetisjoner);
            localStorage.setItem("strength_value_today", reps_today + " reps");
        }

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



// Funksjon for å lage work-diagram


async function getWork(tabelltype) {
    const { data, error } = await supabase
        .from(tabelltype)
        .select('dato, varighet');

        // Alt oppgis i antall minutter (Husk å gjøre om til timer + min)
        let total_tid = 0;
        let tid_dette_året = 0;
        let tid_denne_måneden = 0;

        let hour_uke1 = 0;    let hour_uke2 = 0;    let hour_uke3 = 0;    let hour_uke4 = 0;    //Måned 1
        let hour_uke5 = 0;    let hour_uke6 = 0;    let hour_uke7 = 0;    let hour_uke8 = 0;    //Måned 2
        let hour_uke9 = 0;    let hour_uke10 = 0;   let hour_uke11 = 0;   let hour_uke12 = 0;   //Måned 3

        // Setter grunnverdier slik at funksjonen returnerer verdi ved manglende data
        document.getElementById("måneds_timer").innerHTML = "0 t";
        document.getElementById("års_timer").innerHTML = "0 t";
        document.getElementById("total_timer").innerHTML = "0 t";

        const value = document.querySelectorAll(".work_value");
        value.forEach(element => {
            element.innerHTML = "0";
        })

        const bar = document.querySelectorAll(".work_bar");
        bar.forEach(element => {
            element.style.height = "0%";
        })

    data.forEach(element => {

        total_tid += Number(element.varighet);
        const timer_total = (total_tid / 60).toFixed(1);
        document.getElementById("total_timer").innerHTML = timer_total + " t";

        if (element.dato >= year + "-01-01") {
            tid_dette_året += Number(element.varighet);

            const timer = (tid_dette_året / 60).toFixed(1);

            document.getElementById("års_timer").innerHTML = timer + " t";
        }

        if (element.dato >= `${year}-${String(måned).padStart(2, "0")}-01`) {
            tid_denne_måneden += Number(element.varighet);

            const timer = (tid_denne_måneden / 60).toFixed(1);

            document.getElementById("måneds_timer").innerHTML = timer + " t";
        }

        const week = getWeekNumber(new Date());

        function timer_per_uke(week_number) {
            const wanted_week = week - week_number;

            if (getWeekNumber(new Date(element.dato)) === wanted_week && new Date(element.dato).getFullYear() === year) {
                if (week_number === 0) {
                    hour_uke1 += Number(element.varighet);
                    document.getElementById("work_hour_1").innerHTML = Math.round(hour_uke1 / 60);
                    document.getElementById("work_bar_1").style.height = (hour_uke1 / 60)*10 / 5 + "%";
                }
                else if (week_number === 1) {
                    hour_uke2 += Number(element.varighet);
                    document.getElementById("work_hour_2").innerHTML = Math.round(hour_uke2 / 60);
                    document.getElementById("work_bar_2").style.height = (hour_uke2 / 60)*10 / 5 + "%";
                }
                else if (week_number === 2) {
                    hour_uke3 += Number(element.varighet);
                    document.getElementById("work_hour_3").innerHTML = Math.round(hour_uke3 / 60);
                    document.getElementById("work_bar_3").style.height = (hour_uke3 / 60)*10 / 5 + "%";
                }
                else if (week_number === 3) {
                    hour_uke4 += Number(element.varighet);
                    document.getElementById("work_hour_4").innerHTML = Math.round(hour_uke4 / 60);
                    document.getElementById("work_bar_4").style.height = (hour_uke4 / 60)*10 / 5 + "%";
                }
                else if (week_number === 4) {
                    hour_uke5 += Number(element.varighet);
                    document.getElementById("work_hour_5").innerHTML = Math.round(hour_uke5 / 60);
                    document.getElementById("work_bar_5").style.height = (hour_uke5 / 60)*10 / 5 + "%";
                }
                else if (week_number === 5) {
                    hour_uke6 += Number(element.varighet);
                    document.getElementById("work_hour_6").innerHTML = Math.round(hour_uke6 / 60);
                    document.getElementById("work_bar_6").style.height = (hour_uke6 / 60)*10 / 5 + "%";
                }
                else if (week_number === 6) {
                    hour_uke7 += Number(element.varighet);
                    document.getElementById("work_hour_7").innerHTML = Math.round(hour_uke7 / 60);
                    document.getElementById("work_bar_7").style.height = (hour_uke7 / 60)*10 / 5 + "%";
                }
                else if (week_number === 7) {
                    hour_uke8 += Number(element.varighet);
                    document.getElementById("work_hour_8").innerHTML = Math.round(hour_uke8 / 60);
                    document.getElementById("work_bar_8").style.height = (hour_uke8 / 60)*10 / 5 + "%";
                }
                else if (week_number === 8) {
                    hour_uke9 += Number(element.varighet);
                    document.getElementById("work_hour_9").innerHTML = Math.round(hour_uke9 / 60);
                    document.getElementById("work_bar_9").style.height = (hour_uke9 / 60)*10 / 5 + "%";
                }
                else if (week_number === 9) {
                    hour_uke10 += Number(element.varighet);
                    document.getElementById("work_hour_10").innerHTML = Math.round(hour_uke10 / 60);
                    document.getElementById("work_bar_10").style.height = (hour_uke10 / 60)*10 / 5 + "%";
                }
                else if (week_number === 10) {
                    hour_uke11 += Number(element.varighet);
                    document.getElementById("work_hour_11").innerHTML = Math.round(hour_uke11 / 60);
                    document.getElementById("work_bar_11").style.height = (hour_uke11 / 60)*10 / 5 + "%";
                }
                else if (week_number === 11) {
                    hour_uke12 += Number(element.varighet);
                    document.getElementById("work_hour_12").innerHTML = Math.round(hour_uke12 / 60);
                    document.getElementById("work_bar_12").style.height = (hour_uke12 / 60)*10 / 5 + "%";
                }
            }
        }
        timer_per_uke(0)
        timer_per_uke(1)
        timer_per_uke(2)
        timer_per_uke(3)
        timer_per_uke(4)
        timer_per_uke(5)
        timer_per_uke(6)
        timer_per_uke(7)
        timer_per_uke(8)
        timer_per_uke(9)
        timer_per_uke(10)
        timer_per_uke(11)
    });
}
getWork("bruker_data_produktivitet");

const work_button = document.getElementById("work_button");
work_button.addEventListener("click", () => {
    getWork("bruker_data_produktivitet");
});

const study_button = document.getElementById("study_button");
study_button.addEventListener("click", () => {
    getWork("bruker_data_studie");
});