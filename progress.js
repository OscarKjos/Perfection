//Her må jeg importere XP og level fra Supabase, også må jeg lagre total XP og level i local storage, og oppdatere det hver gang.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://phvvbnmpujqyzqicdrrc.supabase.co'
const supabaseKey = 'sb_publishable_owGo8PDUBRjA6l4Iq5RT0Q_N8w8Awhj'
const supabase = createClient(supabaseUrl, supabaseKey)

async function updateProgress(tabell) {
    const { data, error } = await supabase
        .from(tabell)
        .select('xp, dato');

    if (error) {
        console.error(error);
        return 0;
    }

    return data.reduce((sum, row) => sum + (row.xp || 0), 0);
}


    let count = 0

    const count1 = await updateProgress('bruker_data_trening');
    const count2 = await updateProgress('bruker_data_produktivitet');
    const count3 = await updateProgress('bruker_data_vaner');
    const count4 = await updateProgress('bruker_data_journal');
    const count5 = await updateProgress('bruker_data_studie');
    const count6 = await updateProgress('bruker_data_mikroøkt');
    const count7 = await updateProgress('bruker_data_resultater');

    count = count1 + count2 + count3 + count4 + count5 + count6 + count7



    //*Formel for å beregne nivå basert på XP
    const level = (Math.floor((count / 100) ** (1/1.6)))+1

    console.log("Total XP: "+count)
    console.log("Level: "+level)


    //*Formel for å beregne xp krav til neste nivå
    const xp_krav = Math.round(100 * level ** 1.6)
    console.log("XP krav (neste nivå): "+xp_krav)


    //*Formel for å beregne xp igjen til neste nivå
    const xp_igjen = Math.round(xp_krav - count)
    console.log("XP igjen til neste nivå: "+xp_igjen)


    //*Formel for å beregne xp-differanse mellom nåværende og forrige nivå
    const xp_krav_forrige_level = Math.round(100 * (level-1) ** 1.6)
    const xp_differanse = xp_krav - xp_krav_forrige_level
    console.log("XP-differanse: "+xp_differanse) /* Hvor mye xp som fører til nivåoppgraderin */
    
    
    const nåværende_xp = xp_differanse - xp_igjen
    console.log("XP i nåværende level: "+nåværende_xp)


    //*Formel for å beregne prosentandel til neste nivå
    const xp_prosent = Math.round((nåværende_xp / xp_differanse) * 100)
    document.getElementById("dynamic_progress").innerHTML = xp_prosent+" %";
    console.log("Prosentandel: "+xp_prosent +" %")


    /* ============ Lagre data i Localstorage ============== */


    //* Lagre total XP og level i local storage for gjenbruk
        localStorage.setItem("xp_point", count);
        localStorage.setItem("level", level);
        localStorage.setItem("xp_krav", xp_krav);
        localStorage.setItem("xp_prosent", xp_prosent);
        localStorage.setItem("xp_differanse", xp_differanse);
        localStorage.setItem("xp_igjen", xp_igjen);


    /* ============ Oppdatere data i HTML ============== */

    const dynamic_xp = document.querySelectorAll(".dynamic_xp");
        dynamic_xp.forEach((xp) => {
            xp.innerText = Math.round(count)        /* Merker total XP */
        })

    const dynamic_level = document.querySelectorAll(".dynamic_level");
        dynamic_level.forEach((nivå) => {
            nivå.innerText = level     /* Merker level */
        })
    
    const dynamic_xp_igjen = document.querySelectorAll(".dynamic_xp_krav");
        dynamic_xp_igjen.forEach((element) => {
            element.innerText = xp_differanse       /* Merker XP igjen til neste nivå */
        })

    const dynamic_xp_current_level = document.querySelectorAll(".dynamic_xp_current_level");
        dynamic_xp_current_level.forEach((e) => {
            e.innerText = nåværende_xp       /* Merker prosentandel til neste nivå */
        })


    /* ============ Oppdatere xp-progress bar ============== */

    const xp_bar = document.querySelector(".xp-bar")
        xp_bar.style.width = `${xp_prosent}%`

    const circle = document.querySelector(".circle")
        circle.style.setProperty("--progress", `${xp_prosent}%`);



    /* ============ Teller antall XP for dagens dato + 7 siste dager ============== */

    async function hentXpData(tabell) {
        const { data, error } = await supabase
            .from(tabell)
            .select('xp, dato');

        if (error) {
            console.error(error);
            return [];
        }

        return data;
    }
    const data1 = await hentXpData('bruker_data_trening');
    const data2 = await hentXpData('bruker_data_produktivitet');
    const data3 = await hentXpData('bruker_data_vaner');
    const data4 = await hentXpData('bruker_data_journal');
    const data5 = await hentXpData('bruker_data_studie');
    const data6 = await hentXpData('bruker_data_mikroøkt');
    const allData = [...data1, ...data2, ...data3, ...data4, ...data5, ...data6];



    function xpForDate(number, prog, numb, weekday) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - number);

        let todayXP = 0;

        const dager = ["Søn","Man","Tir","Ons","Tor","Fre","Lør"];
        let ukedag_per_søyle = dager[targetDate.getDay()];

        allData.forEach(element => {
            const datoSB = new Date(element.dato);

            if (
                datoSB.getFullYear() === targetDate.getFullYear() &&
                datoSB.getMonth() === targetDate.getMonth() &&
                datoSB.getDate() === targetDate.getDate()
            ) {
                todayXP += Number(element.xp);
            }
        });

        if (weekday) {
            document.getElementById(weekday).innerText = ukedag_per_søyle;
        }

        const progress = document.getElementById(prog);
        progress.style.height = `${todayXP}%`;

        const label = document.getElementById(numb);
        label.innerText = todayXP.toFixed(1);
    }
    //* Lager en XP profil fra de 7 siste dagene
    xpForDate(0, "prog1", "one_lable", null); /* Dagens XP */
    xpForDate(1, "prog2", "two_lable", "second_day_lable"); /* Gårsdagens XP */
    xpForDate(2, "prog3", "three_lable", "third_day_lable"); /* XP for 2 dager siden*/
    xpForDate(3, "prog4", "four_lable", "fourth_day_lable"); /* XP for 3 dager siden*/
    xpForDate(4, "prog5", "five_lable", "fifth_day_lable"); /* XP for 4 dager siden*/
    xpForDate(5, "prog6", "six_lable", "sixth_day_lable"); /* XP for 5 dager siden*/
    xpForDate(6, "prog7", "seven_lable", "seventh_day_lable"); /* XP for 6 dager siden*/




    /* ============ Logg ut bruker med knapp ============== */
    const logout = document.querySelectorAll(".logout_referrer");
    
    logout.forEach((element) => {
        element.addEventListener("click", async () => {
        const { error } = await supabase.auth.signOut();
        window.location.href = "login.html";
    });
    });
   


    /* Hente navn og informasjon fra bruker_data */

    async function hentBruker() {
    const { data, error } = await supabase
        .from('bruker_data')
        .select('user_id, navn, fødselsdato, status, kjønn');

        data.forEach((element) => {
            const navn = document.querySelectorAll(".dynamic_name");
            navn.forEach((names) => {
                names.innerText = element.navn;
                localStorage.setItem("navn", element.navn);
            })

            const status = document.querySelectorAll(".dynamic_status");
            status.forEach((stat) => {
                stat.innerText = element.status;
                localStorage.setItem("status", element.status);
            })

            const fødselsdato = document.querySelectorAll(".dynamic_age");
            fødselsdato.forEach((date) => {
                date.innerText = element.fødselsdato;
                localStorage.setItem("fødselsdato", element.fødselsdato);
            })

            /* Beregne levealder basert på kjønn */
            let levealder = null;

            if (element.kjønn === "Mann") {
                levealder = 82;
            }
            else if (element.kjønn === "Kvinne") {
                levealder = 85;
            }

            /* Beregne dødsdato basert på fødselsdato og levealder */
            const dødsdom = document.querySelectorAll(".dynamic_dead");
            dødsdom.forEach((dead) => {
                const nyDato = new Date(element.fødselsdato);
                nyDato.setFullYear(nyDato.getFullYear() + levealder);
                const dødsdato = Math.ceil((new Date(nyDato) - new Date())/ (1000 * 60 * 60 * 24))

                dead.innerText = dødsdato.toLocaleString("no-NO")
            })

            /* Lagre levealder i local storage og oppdatere html */
            localStorage.setItem("levealder", levealder);
            document.getElementById("dynamic_levealder").innerText = levealder+" år";
            
        });

    };
    hentBruker();

    // Loading Screen
    setTimeout(() => {
        document.getElementById("loader")?.classList.add("hidden");
    }, 400);
