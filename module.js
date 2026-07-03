import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://phvvbnmpujqyzqicdrrc.supabase.co'
const supabaseKey = 'sb_publishable_owGo8PDUBRjA6l4Iq5RT0Q_N8w8Awhj'
const supabase = createClient(supabaseUrl, supabaseKey)

/* Teller antall aktiviteter per kategori */
async function countRows(tabell, relevant_id) {
    const { count, error } = await supabase
        .from(tabell)
        .select('*', { count: 'exact', head: true });

        const idbrikke = document.getElementById(relevant_id);
        idbrikke.textContent = count;
}
countRows('bruker_data_trening', "training_counter");
countRows('bruker_data_produktivitet', "work_counter");
countRows('bruker_data_journal', "journal_counter");
countRows('bruker_data_studie', "study_counter");
countRows('bruker_data_vaner', "habit_counter");



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
