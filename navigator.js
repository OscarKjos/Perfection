const style = document.createElement("style");

const splashAlreadyShown = sessionStorage.getItem("splash_vist") === "true";

style.textContent = `
        .overlay {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 95vh;
            background: var(--surface-color);
            z-index: 9999;
            align-items: center;
            justify-content: center;

            opacity: 0;
            transform: translateY(100%);
            pointer-events: none;
            transition: 0.2s ease;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .overlay.active {
            opacity: 1;
            pointer-events:fill;
            transform: translateY(0%);
        }

        .overlay-card {
            border-radius: 10px;
            width: 100vw;
            max-width: 400px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 18px;
            padding-top:15px;
        }

        .bottomnav {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: calc(80px + env(safe-area-inset-bottom));
            box-sizing: border-box;
            background: var(--surface-color);
            box-shadow: 0 -2px 12px rgba(0,0,0,0.07);
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            z-index: 200;
            padding-bottom: max(12px, env(safe-area-inset-bottom));
        }
        
        .bottomnav-btn {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--text-color);
            font-size: 1.25em;
            text-decoration: none;
            height: 100%;
            transition: color 0.2s;
            cursor: pointer;
            background: none;
            border: none;
        }

        .bottomnav-btn:active, .bottomnav-btn:focus {
            color: var(--primary-color);
        }

        .bottomnav-label {
            font-size: 0.65em;
            margin-top: 5px;
        }

        .bottomnav-plus {
            background: var(--primary-color);
            color: #fff;
            border-radius: 50%;
            width: 54px;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            box-shadow: 0 2px 12px rgba(0,176,121,0.18);
            position: relative;
            top: -22px;
            z-index: 2;
            border: 4px solid white;
        }

        .topnav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--surface-color);
            padding: 0px 24px 0px 12px;
            height: 50px;
            gap: 18px;
        }

        .topnav .brand {
            font-size: 1.1em;
            color: var(--text-color);
            margin-right: 12px;
            letter-spacing: 3px;

            display:flex;
            align-items:center;
            justify-content:center;
        }

        .topnav .icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            margin: 0 2px;
            font-size: 1.1em;
            color: var(--text-color);
            transition: color 0.2s;
        }

        .topnav .icon-btn:hover {
            color: #444;
        }

        *{
            padding:0;
            box-sizing:border-box;
        }

        body{
            background: var(--bg-color);
            font-family:Arial,sans-serif;
            min-height:100vh;
            margin:0px;
            display:grid;
            grid-template-rows:50px fit-content(100%) auto;
        }

        .sidebar__profile{
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px;
            border-bottom: 1px solid #eee;
            width: 100%;
        }

        .sidebar__avatar{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight: bold;
        }

        .sidebar__profile h3{
            margin:0;
            font-size: 15px;
        }

        .sidebar__profile p{
            margin:0;
            font-size: 12px;
            color:#777;
        }

        /* Links */
        .sidebar__links a{
            display:flex;
            align-items:center;
            gap:12px;
            padding:12px 20px;
            text-decoration:none;
            color:var(--subtext-color);
            border-left:3px solid transparent;
            transition:0.2s;
        }

        .sidebar__links a:hover{
            background:#3448681e;
            color:var(--primary-color);
        }

        .sidebar__links a.active{
            background:#3448681e;
            color:var(--primary-color);
            border-left:3px solid var(--primary-color);
            font-weight:600;
        }

        /* Footer */
        .sidebar__footer{
            border-top:1px solid #eee;
            width:100%;
            padding-bottom:20px;
        }

        .sidebar__footer a{
            display:flex;
            gap:12px;
            padding:8px 20px;
            text-decoration:none;
            color:#777;
            font-size: 14px;
        }

        .sidebar__footer a:hover{
            color:var(--primary-color);
        }

        .link_with_no_decoration{
            text-decoration:none;
        }

        #margin_master{
            margin:0px 15px 0px 15px;
        }

        .profile-card__progress-info{
            display:flex;
            justify-content:space-between;
            font-size:13px;
            color:#666;
        }

        .profile-card__bar{
            height:6px;
            background:#ddd;
            border-radius:10px;
            margin-top:5px;
            overflow:hidden;
        }

        .profile-card__fill{
            width:0%;
            height:100%;
            background:linear-gradient(to right,var(--primary-color),var(--primary-color));
        }

        .overlay-hint {
            font-size: 0.72em;
            color: #b0b0b0;
            text-align: center;
            line-height: 1.5;
            font-weight: 400;
            margin:15px 22px 23px 22px;
        }

        #splash_screen {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, var(--splash-color), var(--splash-color));
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

    
        /* Center container */
        .splash_content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            transform: translateY(-10%);
        }

        /* Logo */
        .splash_logo {
            font-size: 72px;
            color: white;
            width:150px;
        }

        /* App name */
        .splash_title {
            font-size: 22px;
            letter-spacing: 10px;
            color: rgba(255,255,255,0.95);
            font-family: "Montserrat", sans-serif;
            font-weight: 400;
            letter-spacing: 0.45em;
            text-transform: uppercase;
        }

        #name_value1{
            color:var(--text-color);
        }
`;

document.head.appendChild(style);



/* ==================== Her kommer HTML for navigasjonen ====================== */

const navContainer = document.createElement("div");
navContainer.className = "NAVcontainer";

navContainer.innerHTML = `
    <div id="overlay" class="overlay">
        <div class="overlay-card">
            <div class="sidebar__profile">
                <div class="sidebar__avatar dynamic_level">0</div>
                <div>
                    <h3 class="dynamic_name" id="name_value1"></h3>
                    <p id="klubb_value1"><i class="dynamic_status">-</i> · <i class="dynamic_age">-</i></p>
                </div>
            </div>

            <div id="margin_master" class="profile-card__progress">
                <div class="profile-card__progress-info">
                    <span>Nivå <i class="dynamic_level">0</i> – Gold</span>
                    <span><i class="dynamic_xp_current_level"></i> / <i class="dynamic_xp_krav">0</i> XP</span>
                </div>

                <div class="profile-card__bar">
                    <div class="profile-card__fill"></div>
                </div>
            </div>

            <div class="sidebar__links">
                <a href="index.html" id="action_profil" class="active"><i class="fa-solid fa-house"></i>Hjem</a>
                <a href="Forms/training.html" id="action_segmenter"><i class="fa-solid fa-route"></i>Treningsøkt</a>
                <a href="Forms/studyhours.html" id="action_treningsokt"><i class="fa-solid fa-book"></i>Studietimer</a>
                <a href="Forms/project.html" id="action_treningsokt"><i class="fa-solid fa-chart-line"></i>Arbeidstimer</a>
                <a href="Forms/habits.html" id="action_artikler"><i class="fa-solid fa-bed"></i>Vaner</a>
                <a href="Forms/journal.html" id="action_treningsokt"><i class="fa-solid fa-journal-whills"></i>Journal</a>
                <hr style="background:#eee; height:1px; border:none; width:100%;">
                <a href="Forms/mikroøkt.html" id="action_mikroøkt"><i class="fa-solid fa-hand-fist"></i>Mikroøkt</a>
            </div>
        </div>

        <div class="sidebar__footer">

        <span style="display:flex; flex-direction:row; gap:10px; padding-top:15px; align-items:center; justify-content:space-between; padding:5px 25px 0px 15px;">
            <a><i class="fa-solid fa-shield-alt"></i>Personvern</a>
            <p style="color:#b0b0b0" font-size:14px>|</p>
            <a class="logout_referrer"><i class="fa-solid fa-right-from-bracket"></i>Logg ut</a>
        </span>
            <p class="overlay-hint">Registrer aktiviteter, få XP og bygg opp profilen din med nivåer, statistikk og funksjoner. <u>Les mer om hvordan appen fungerer</u></p>
        </div>
    </div>

    <div class="topnav">
        <a class="link_with_no_decoration" href="index.html">
            <span class="brand"><img style="width:30px;" src="Bilder/ikoner/logo_light.png" alt="Logo"> KVADOR</span>
        </a>
        <div>
            <button class="icon-btn" title="Varsler"><i class="fa-regular fa-bell"></i></button>
            <button class="icon-btn" id="settings_referrer" title="Innstillinger"><i class="fa-solid fa-gear"></i></button>
        </div>
    </div>

    <nav class="bottomnav">
        <button id="profil_referrer" class="bottomnav-btn" title="Profil">
            <i class="fa-regular fa-user"></i>
            <span class="bottomnav-label">Profil</span>
        </button>
        <button id="statistikk_referrer" class="bottomnav-btn" title="Statistikk">
            <i class="fa-solid fa-chart-bar"></i>
            <span class="bottomnav-label">Statistikk</span>
        </button>
        <button id="navclick" class="bottomnav-plus" title="Legg til">
            <i class="fa-solid fa-plus"></i>
        </button>
        <button id="leaderboard_referrer" class="bottomnav-btn" title="Leaderboard">
            <i class="fa-solid fa-trophy"></i>
            <span class="bottomnav-label">Leaderboard</span>
        </button>
        <button id="data_referrer" class="bottomnav-btn" title="Data">
            <i class="fa-solid fa-database"></i>
            <span class="bottomnav-label">Data</span>
        </button>
    </nav>

    <div id="splash_screen" style="${splashAlreadyShown ? 'display: none;' : ''}">
        <div class="splash_content">
            <img class="splash_logo" src="Bilder/ikoner/splash_screen.png" alt="Logo">
            <div class="splash_title">KVADOR</div>
        </div>
    </div>
`;

document.body.prepend(navContainer);


/* ==================== Her kommer JavaScript for funksjon ====================== */

const navclick = document.getElementById('navclick');
const overlay = document.getElementById('overlay');

if (navclick && overlay) {
    navclick.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


/* ==================== Oppdaterer Overlay ====================== */
    const prosent = localStorage.getItem("xp_prosent");
    const card__fill = document.querySelector(".profile-card__fill");
    card__fill.style.width = `${prosent}%`;



/* ================= Fikser referanse knapper =================== */

function referrer(Id_tag, adresse) {
    const element = document.getElementById(Id_tag);

    element.addEventListener('click', () => {
        window.location.href = adresse;
    })
}
referrer('profil_referrer', 'index.html');
referrer('statistikk_referrer', 'statistikk.html');
referrer('leaderboard_referrer', 'leaderboard.html');
referrer('data_referrer', 'data.html');

/* ==================== Splash screen ====================== */

    window.addEventListener("load", () => {
        if (sessionStorage.getItem("splash_vist") === "true") {
            document.getElementById("splash_screen").style.display = "none";
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                settThemeColor('#0b0f14');
            } else{
                settThemeColor('white');
            }
        } else{
             document.querySelector("#loader")?.classList.add("hidden");
        }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        settThemeColor('black');
    } else{
        settThemeColor(mediaFarge);
    }

    setTimeout(() => {
        document.getElementById("splash_screen").style.display = "none";
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            settThemeColor('#0b0f14');
        } else{
            settThemeColor('white');
        }
        sessionStorage.setItem("splash_vist", "true");
    }, 3000); // 3 sekunder


    const loader = document.querySelector('#loader');

    if (!loader.classList.contains('hidden')) {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', mediaFarge);
    }
});

// ==================== Link til Innstillinger ====================== //
    const knapp = document.getElementById("settings_referrer");

    knapp.addEventListener("click", () => {
        window.location.href = "settings.html";
    });