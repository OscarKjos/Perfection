const style = document.createElement("style");

style.textContent = `
        .overlay {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 95vh;
            background: white;
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
            background: var(--white);
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
            color: #222;
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
            font-size: 0.7em;
            margin-top: 2px;
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
            border: 4px solid var(--white);
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
            background: var(--white);
            padding: 0 24px;
            height: 50px;
            gap: 18px;
        }

        .topnav .brand {
            font-weight: bold;
            font-size: 1.1em;
            color: #111;
            margin-right: 12px;
            letter-spacing: 1px;
        }

        .topnav .icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            margin: 0 2px;
            font-size: 1.1em;
            color: #111;
            transition: color 0.2s;
        }

        .topnav .icon-btn:hover {
            color: #444;
        }

        :root{
            --primary-color:#00b079;
            --background-color:#f6f5fb;
            --text-color:#222;
            --subtext-color:#666;
            --white:white;
        }

        *{
            padding:0;
            box-sizing:border-box;
        }

        body{
            background:var(--background-color);
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
            color:#555;
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
            margin: 10px 0 0 0;
            text-align: center;
            line-height: 1.5;
            font-weight: 400;
            margin:30px 15px 30px 15px;
        }

        #splash_screen {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #1DB874, #0f6b47);
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
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));
        }

        /* App name */
        .splash_title {
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 2px;
            color: rgba(255,255,255,0.95);
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
                <a href="Forms/project.html" id="action_treningsokt"><i class="fa-solid fa-chart-line"></i>Produktivitet</a>
                <a href="Forms/habits.html" id="action_artikler"><i class="fa-solid fa-bed"></i>Vaner / Helse</a>
                <a href="Forms/journal.html" id="action_treningsokt"><i class="fa-solid fa-journal-whills"></i>Journal</a>
                <p class="overlay-hint">Registrer aktiviteter, få XP og bygg opp profilen din med nivåer, statistikk og funksjoner. <u>Les mer om hvordan appen fungerer</u></p>
            </div>
        </div>

        <div class="sidebar__footer">
            <a><i class="fa-solid fa-shield-alt"></i>Personvern</a>
            <a class="logout_referrer"><i class="fa-solid fa-right-from-bracket"></i>Logg ut</a>
        </div>
    </div>

    <div class="topnav">
        <a class="link_with_no_decoration" href="index.html">
            <span class="brand"><i class="fa-solid fa-bolt"></i> perfection</span>
        </a>
        <div>
            <button class="icon-btn" title="Varsler"><i class="fa-regular fa-bell"></i></button>
            <button class="icon-btn" title="Innstillinger"><i class="fa-solid fa-gear"></i></button>
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

    <div id="splash_screen">
        <div class="splash_content">
            <i class="fa-solid fa-bolt splash_logo"></i>
            <div class="splash_title">Perfection</div>
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

/* ================= Dynamisk tema farge =================== */
function settThemeColor(farge) {
    const meta = document.querySelector('meta[name="theme-color"]');
    
    if (meta) {
        meta.setAttribute("content", farge);
    }
}


/* ==================== Splash screen ====================== */
 window.addEventListener("load", () => {
        if (sessionStorage.getItem("splash_vist") === "true") {
            document.getElementById("splash_screen").style.display = "none";
            settThemeColor('white');
            return
        }

    settThemeColor('#1DB874');

    setTimeout(() => {
        document.getElementById("splash_screen").style.display = "none";
        settThemeColor('white');
        sessionStorage.setItem("splash_vist", "true");
    }, 3000); // 3 sekunder
});
