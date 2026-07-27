import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://phvvbnmpujqyzqicdrrc.supabase.co'
const supabaseKey = 'sb_publishable_owGo8PDUBRjA6l4Iq5RT0Q_N8w8Awhj'
const supabase = createClient(supabaseUrl, supabaseKey)

async function validation(tabell, relevant_id) {
    const { data, error } = await supabase
    .from(tabell)
    .select('dato')

    const today = new Date().toISOString().split('T')[0];
    
    if (data.some(row => row.dato === today)) {
        const validation = document.getElementById(relevant_id);
        validation.style.backgroundColor = "var(--primary-color)";
        validation.style.color = "white";
        validation.innerHTML = "<i class='fa-solid fa-circle-check'></i> Fullført";
    }
}
validation('bruker_data_trening', "training_validation");
validation('bruker_data_produktivitet', "work_validation");
validation('bruker_data_journal', "journal_validation");
validation('bruker_data_studie', "study_validation");
validation('bruker_data_mikroøkt', "strength_validation");


async function validation_habits(vaneVerdi, relevant_id) {
    const { data, error } = await supabase
    .from("bruker_data_vaner")
    .select('dato, vane')

    const today = new Date().toISOString().split('T')[0];
    
    if (data.some(row => row.dato === today && row.vane === vaneVerdi)) {
        const validation = document.getElementById(relevant_id);
        validation.style.backgroundColor = "var(--primary-color)";
        validation.style.color = "white";
        validation.innerHTML = "<i class='fa-solid fa-circle-check'></i> Fullført";
    }
}
validation_habits("Resengen", "re_sengen_validation");
validation_habits("Søvn", "søvn_validation");
validation_habits("Vitaminer", "vitaminer_validation");
validation_habits("Vanntilførsel", "water_validation");
validation_habits("Proteintilskudd", "protein_validation");
validation_habits("Meditasjon", "meditasjon_validation");
validation_habits("Kreatin", "kreatin_validation");



/* - - - - - Segmenter - - - - - */
/* PS: Det er viktig at jeg ikke importerer informasjon fra databasen, men henter fra eksisterende funksjoner med local storage  */

    async function segmentDisplay() {              
            const { data, error } = await supabase 
                .from('function_segments')
                .select('id, navn, type, krav, xp_bonus, ikon, backgroundColor, color')
                .order('id', { ascending: false })

            const segments_grid = document.querySelector('.segments_grid');
            segments_grid.innerHTML = "";

            let fullførtAntall = 0;

            data.forEach(element => {
                const card = document.createElement("article");
                card.className = "segments_grid__card";

                let Antall = 0;
                let erFullført = false;
                let progress = 0;

                function antall_registreringer(supabase_type, counter_id){
                if (element.type === supabase_type) {
                        Antall = Math.round(localStorage.getItem(counter_id));
                        progress = Antall / element.krav
                            if(progress > 1)    {
                                progress = 1;
                            }
                            

                            if (Antall > element.krav) {
                                Antall = element.krav;
                            }
                           
                        if(localStorage.getItem(counter_id) >= element.krav) {
                            erFullført = true;
                        }
                }
                }
                /* Alle funksjoner for antall registreringer (Antall treningsøkter, xp ...)*/
                antall_registreringer("trening_antall_registreringer", "training_counter");
                antall_registreringer("xp_grind", "xp_point");
                antall_registreringer("journal_antall_registreringer", "journal_counter");
                antall_registreringer("studie_antall_registreringer", "study_counter");
                antall_registreringer("vaner_antall_registreringer", "habit_counter");
                antall_registreringer("arbeid_antall_registreringer", "work_counter");
                antall_registreringer("total_aktiviteter", "total_aktiviteter");

                if (erFullført) {
                    fullførtAntall++;
                }

                const dynamic_segment = document.getElementById('dynamic_segment');
                dynamic_segment.textContent = fullførtAntall;

                card.classList.add(erFullført ? 'fullført' : 'pågående');

                card.innerHTML = `
                        <div class="segment-badge">
                            <div class="segment-badge-inner">
                                <i class="${element.ikon}"></i>
                            </div>
                        </div>
                        <div class="segments_grid__content">
                            <div class="segments_grid__top">
                                <p class="segments_grid__title">${element.navn}</p>
                                <span class="segments_grid__value">${Antall} / ${element.krav}</span>
                            </div>
                            <div class="segments_grid__track">
                                <span style="width: ${progress * 100}%" class="segments_grid__fill"></span>
                            </div>
                        </div>
                `

                if (erFullført) {
                    const track = card.querySelectorAll('.segments_grid__track');

                    track.forEach(element => {
                        element.style.display = "none";
                    })
                }

                segments_grid.appendChild(card);
            });
        }
    segmentDisplay();