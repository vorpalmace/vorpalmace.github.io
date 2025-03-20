var Co = Object.defineProperty;
var So = (e, t, n) => t in e ? Co(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var Ts = (e, t, n) => So(e, typeof t != "symbol" ? t + "" : t, n);
const Is = {
        "Content-Type": "application/json"
    },
    Xe = e => `${e.replace(/\/?$/,"/")}api/`,
    yt = (e, t = "") => {
        if (typeof e == "object" && e.errno) throw new TypeError(`${t} failed with ${e.errno}: ${e.errmsg}`);
        return e
    },
    Rr = ({
        serverURL: e,
        lang: t,
        paths: n,
        type: r,
        signal: s
    }) => fetch(`${Xe(e)}article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`, {
        signal: s
    }).then(i => i.json()).then(i => yt(i, "Get counter").data),
    zn = ({
        serverURL: e,
        lang: t,
        path: n,
        type: r,
        action: s
    }) => fetch(`${Xe(e)}article?lang=${t}`, {
        method: "POST",
        headers: Is,
        body: JSON.stringify({
            path: n,
            type: r,
            action: s
        })
    }).then(i => i.json()).then(i => yt(i, "Update counter").data),
    Ls = ({
        serverURL: e,
        lang: t,
        path: n,
        page: r,
        pageSize: s,
        sortBy: i,
        signal: l,
        token: o
    }) => {
        const a = {};
        return o && (a.Authorization = `Bearer ${o}`), fetch(`${Xe(e)}comment?path=${encodeURIComponent(n)}&pageSize=${s}&page=${r}&lang=${t}&sortBy=${i}`, {
            signal: l,
            headers: a
        }).then(c => c.json()).then(c => yt(c, "Get comment data").data)
    },
    Ms = ({
        serverURL: e,
        lang: t,
        token: n,
        comment: r
    }) => {
        const s = {
            "Content-Type": "application/json"
        };
        return n && (s.Authorization = `Bearer ${n}`), fetch(`${Xe(e)}comment?lang=${t}`, {
            method: "POST",
            headers: s,
            body: JSON.stringify(r)
        }).then(i => i.json())
    },
    Ps = ({
        serverURL: e,
        lang: t,
        token: n,
        objectId: r
    }) => fetch(`${Xe(e)}comment/${r}?lang=${t}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${n}`
        }
    }).then(s => s.json()).then(s => yt(s, "Delete comment")),
    nn = ({
        serverURL: e,
        lang: t,
        token: n,
        objectId: r,
        comment: s
    }) => fetch(`${Xe(e)}comment/${r}?lang=${t}`, {
        method: "PUT",
        headers: {
            ...Is,
            Authorization: `Bearer ${n}`
        },
        body: JSON.stringify(s)
    }).then(i => i.json()).then(i => yt(i, "Update comment")),
    Os = ({
        serverURL: e,
        lang: t,
        paths: n,
        signal: r
    }) => fetch(`${Xe(e)}comment?type=count&url=${encodeURIComponent(n.join(","))}&lang=${t}`, {
        signal: r
    }).then(s => s.json()).then(s => yt(s, "Get comment count").data),
    js = ({
        lang: e,
        serverURL: t
    }) => {
        const n = (window.innerWidth - 450) / 2,
            r = (window.innerHeight - 450) / 2,
            s = window.open(`${t.replace(/\/$/,"")}/ui/login?lng=${encodeURIComponent(e)}`, "_blank", `width=450,height=450,left=${n},top=${r},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
        return s == null || s.postMessage({
            type: "TOKEN",
            data: null
        }, "*"), new Promise(i => {
            const l = ({
                data: o
            }) => {
                !o || typeof o != "object" || o.type !== "userInfo" || o.data.token && (s == null || s.close(), window.removeEventListener("message", l), i(o.data))
            };
            window.addEventListener("message", l)
        })
    },
    zs = ({
        serverURL: e,
        lang: t,
        paths: n,
        signal: r
    }) => Rr({
        serverURL: e,
        lang: t,
        paths: n,
        type: ["time"],
        signal: r
    }),
    Ds = e => zn({
        ...e,
        type: "time",
        action: "inc"
    }),
    Fs = ({
        serverURL: e,
        lang: t,
        count: n,
        signal: r,
        token: s
    }) => {
        const i = {};
        return s && (i.Authorization = `Bearer ${s}`), fetch(`${Xe(e)}comment?type=recent&count=${n}&lang=${t}`, {
            signal: r,
            headers: i
        }).then(l => l.json())
    },
    Hs = ({
        serverURL: e,
        signal: t,
        pageSize: n,
        lang: r
    }) => fetch(`${Xe(e)}user?pageSize=${n}&lang=${r}`, {
        signal: t
    }).then(s => s.json()).then(s => yt(s, "user list")).then(s => s.data),
    $o = ["nick", "mail", "link"],
    Us = e => e.filter(t => $o.includes(t)),
    Ns = ["//unpkg.com/@waline/emojis@1.1.0/weibo"],
    Ro = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"],
    Ao = e => new Promise((t, n) => {
        if (e.size > 128e3) return n(new Error("File too large! File size limit 128KB"));
        const r = new FileReader;
        r.readAsDataURL(e), r.onload = () => t(r.result), r.onerror = n
    }),
    Eo = e => e ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>',
    To = e => {
        const t = async (n, r = {}) => fetch(`https://api.giphy.com/v1/gifs/${n}?${new URLSearchParams({lang:e,limit:"20",rating:"g",api_key:"6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp",...r}).toString()}`).then(s => s.json()).then(({
            data: s
        }) => s.map(i => ({
            title: i.title,
            src: i.images.downsized_medium.url
        })));
        return {
            search: n => t("search", {
                q: n,
                offset: "0"
            }),
            default: () => t("trending", {}),
            more: (n, r = 0) => t("search", {
                q: n,
                offset: r.toString()
            })
        }
    },
    Io = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/,
    Lo = /</,
    Mo = /(?:^|\s)\/\/(.+?)$/gm,
    Po = /\/\*([\S\s]*?)\*\//gm,
    Oo = new RegExp(`(${Io.source}|${Lo.source})|((?:${Mo.source})|(?:${Po.source}))`, "gmi"),
    Bs = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"],
    Ar = {},
    jo = e => {
        let t = 0;
        return e.replace(Oo, (n, r, s) => {
            if (s) return `<span style="color: slategray">${s}</span>`;
            if (r === "<") return "&lt;";
            let i;
            Ar[r] ? i = Ar[r] : (i = Bs[t], Ar[r] = i);
            const l = `<span style="color: #${i}">${r}</span>`;
            return t = ++t % Bs.length, l
        })
    },
    zo = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"],
    qe = e => Object.fromEntries(e.map((t, n) => [zo[n], t]));
var Do = qe(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte bestÃ¤tigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "GefÃ¤llt mir", "GefÃ¤llt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen lÃ¤uft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "WÃ¶rter", "Bitte geben Sie Kommentare zwischen $0 und $1 WÃ¶rtern ein! Aktuelle Anzahl der WÃ¶rter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "MaÃ¯ar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "LÃ¶sen", "Ã„lteste", "Neueste", "Am beliebtesten", "Was denken Sie?"]),
    Vs = qe(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]),
    Ws = qe(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electrÃ³nico", "Por favor confirma tu direcciÃ³n de correo electrÃ³nico.", "Sitio web", "Opcional", "Comenta aquÃ­...", "Sin comentarios todavÃ­a.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar MÃ¡s...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atrÃ¡s", "minutos atrÃ¡s", "horas atrÃ¡s", "dÃ­as atrÃ¡s", "justo ahora", "Subiendo", "Iniciar sesiÃ³n", "cerrar sesiÃ³n", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras!
 El nÃºmero actual de palabras: $2`, "AnÃ³nimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "MÃ¡s antiguos", "MÃ¡s recientes", "MÃ¡s vistos", "Â¿QuÃ© piensas?"]),
    qs = qe(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "RÃ©pondre", "Annuler la rÃ©ponse", "Commentaires", "Actualiser", "Charger plus...", "AperÃ§u", "Emoji", "TÃ©lÃ©charger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "Ã€ l'instant", "TÃ©lÃ©chargement en cours", "Connexion", "DÃ©connexion", "Admin", "Ã‰pinglÃ©", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "MaÃ¯ar", "GIF", "Rechercher un GIF", "Profil", "ApprouvÃ©", "En attente", "IndÃ©sirable", "DÃ©tacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]),
    Ks = qe(["ãƒ‹ãƒƒã‚¯ãƒãƒ¼ãƒ ", "3ãƒã‚¤ãƒˆä»¥ä¸Šã®ãƒ‹ãƒƒã‚¯ãƒãƒ¼ãƒ ã‚’ã”å…¥åŠ›ãã ã•ã„.", "ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹", "ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹ã‚’ã”ç¢ºèªãã ã•ã„.", "ã‚µã‚¤ãƒˆ", "ã‚ªãƒ—ã‚·ãƒ§ãƒ³", "ã“ã“ã«ã‚³ãƒ¡ãƒ³ãƒˆ", "ã‚³ãƒ¡ãƒ³ãƒˆã—ã¾ã—ã‚‡ã†~", "æå‡ºã™ã‚‹", "Like", "Cancel like", "è¿”ä¿¡ã™ã‚‹", "ã‚­ãƒ£ãƒ³ã‚»ãƒ«", "ã‚³ãƒ¡ãƒ³ãƒˆ", "æ›´æ–°", "ã•ã‚‰ã«èª­ã¿è¾¼ã‚€", "ãƒ—ãƒ¬ãƒ“ãƒ¥ãƒ¼", "çµµæ–‡å­—", "ç”»åƒã‚’ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰", "ç§’å‰", "åˆ†å‰", "æ™‚é–“å‰", "æ—¥å‰", "ãŸã£ã ä»Š", "ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰", "ãƒ­ã‚°ã‚¤ãƒ³ã™ã‚‹", "ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ", "ç®¡ç†è€…", "ãƒˆãƒƒãƒ—ã«ç½®ã", "ãƒ¯ãƒ¼ãƒ‰", `ã‚³ãƒ¡ãƒ³ãƒˆã¯ $0 ã‹ã‚‰ $1 ãƒ¯ãƒ¼ãƒ‰ã®é–“ã§ãªã‘ã‚Œã°ãªã‚Šã¾ã›ã‚“!
 ç¾åœ¨ã®å˜èªžç•ªå·: $2`, "åŒ¿å", "ã†ãˆã«ã‚“", "ãªã‹ã«ã‚“", "ã—ã‚‚ãŠã—", "ç‰¹ã«ã—ã‚‚ãŠã—", "ã‹ã’", "ãªã¬ã—", "GIF", "æŽ¢ã™ GIF", "å€‹äººæƒ…å ±", "æ‰¿èªæ¸ˆã¿", "å¾…ã£ã¦ã„ã‚‹", "ã‚¹ãƒ‘ãƒ ", "ã¹ãŸã¤ã‹ãªã„", "é€†é †", "æ­£é †", "äººæ°—é †", "ã©ã†æ€ã„ã¾ã™ã‹ï¼Ÿ"]),
    Fo = qe(["Apelido", "Apelido nÃ£o pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereÃ§o de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentÃ¡rio, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "ComentÃ¡rios", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrÃ¡s", "minutos atrÃ¡s", "horas atrÃ¡s", "dias atrÃ¡s", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentÃ¡rio com $0 a $1 palavras!
 NÃºmero de palavras atuais: $2`, "AnÃ´nimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informaÃ§Ã£o pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que vocÃª acha?"]),
    Gs = qe(["ÐŸÑÐµÐ²Ð´Ð¾Ð½Ð¸Ð¼", "ÐÐ¸ÐºÐ½ÐµÐ¹Ð¼ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ð¼ÐµÐ½ÑŒÑˆÐµ 3 Ð±Ð°Ð¹Ñ‚.", "Ð­Ð». Ð°Ð´Ñ€ÐµÑ", "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð´Ð¸Ñ‚Ðµ Ð°Ð´Ñ€ÐµÑ Ð²Ð°ÑˆÐµÐ¹ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ñ‹.", "Ð’ÐµÐ±-ÑÐ°Ð¹Ñ‚", "ÐÐµÐ¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ð¹", "ÐšÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¹ Ð·Ð´ÐµÑÑŒ...", "ÐŸÐ¾ÐºÐ° Ð½ÐµÑ‚ ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸ÐµÐ².", "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ", "Like", "Cancel like", "ÐžÑ‚Ð²ÐµÑ‡Ð°Ñ‚ÑŒ", "ÐžÑ‚Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ð¾Ñ‚Ð²ÐµÑ‚", "ÐšÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¸", "ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ", "Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸ Ð±Ð¾Ð»ÑŒÑˆÐµ...", "ÐŸÑ€ÐµÐ²ÑŒÑŽ", "ÑÐ¼Ð¾Ð´Ð·Ð¸", "Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ", "ÑÐµÐºÑƒÐ½Ð´ Ð½Ð°Ð·Ð°Ð´", "Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð¼Ð¸Ð½ÑƒÑ‚ Ð½Ð°Ð·Ð°Ð´", "Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ñ‡Ð°ÑÐ¾Ð² Ð½Ð°Ð·Ð°Ð´", "Ð´Ð½ÐµÐ¹ Ð½Ð°Ð·Ð°Ð´", "Ð¿Ñ€ÑÐ¼Ð¾ ÑÐµÐ¹Ñ‡Ð°Ñ", "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°", "ÐÐ²Ñ‚Ð¾Ñ€Ð¸Ð·Ð¾Ð²Ð°Ñ‚ÑŒÑÑ", "Ð’Ñ‹Ñ…Ð¾Ð´ Ð¸Ð· ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹", "ÐÐ´Ð¼Ð¸Ð½", "Ð›Ð¸Ð¿ÐºÐ¸Ð¹", "Ð¡Ð»Ð¾Ð²Ð°", `ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ð¸ Ð¾Ñ‚ $0 Ð´Ð¾ $1 ÑÐ»Ð¾Ð²!
ÐÐ¾Ð¼ÐµÑ€ Ñ‚ÐµÐºÑƒÑ‰ÐµÐ³Ð¾ ÑÐ»Ð¾Ð²Ð°: $2`, "ÐÐ½Ð¾Ð½Ð¸Ð¼Ð½Ñ‹Ð¹", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "ÐŸÐ¾Ð¸ÑÐº GIF", "ÐŸÐµÑ€ÑÐ¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ", "ÐžÐ´Ð¾Ð±Ñ€ÐµÐ½Ð½Ñ‹Ð¹", "ÐžÐ¶Ð¸Ð´Ð°ÑŽÑ‰Ð¸Ð¹", "Ð¡Ð¿Ð°Ð¼", "ÐÐµÐ»Ð¸Ð¿ÐºÐ¸Ð¹", "ÑÐ°Ð¼Ñ‹Ð¹ ÑÑ‚Ð°Ñ€Ñ‹Ð¹", "Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ð¹", "ÑÐ°Ð¼Ñ‹Ð¹ Ð³Ð¾Ñ€ÑÑ‡Ð¸Ð¹", "Ð§Ñ‚Ð¾ Ð²Ñ‹ Ð´ÑƒÐ¼Ð°ÐµÑ‚Ðµ?"]),
    Zs = qe(["TÃªn", "TÃªn khÃ´ng Ä‘Æ°á»£c nhá» hÆ¡n 3 kÃ½ tá»±.", "E-Mail", "Vui lÃ²ng xÃ¡c nháº­p Ä‘á»‹a chá»‰ email cá»§a báº¡n.", "Website", "TÃ¹y chá»n", "HÃ£y bÃ¬nh luáº­n cÃ³ vÄƒn hoÃ¡!", "ChÆ°a cÃ³ bÃ¬nh luáº­n", "Gá»­i", "ThÃ­ch", "Bá» thÃ­ch", "Tráº£ lá»i", "Há»§y bá»", "bÃ¬nh luáº­n", "LÃ m má»›i", "Táº£i thÃªm...", "Xem trÆ°á»›c", "Emoji", "Táº£i lÃªn hÃ¬nh áº£nh", "giÃ¢y trÆ°á»›c", "phÃºt trÆ°á»›c", "giá» trÆ°á»›c", "ngÃ y trÆ°á»›c", "Vá»«a xong", "Äang táº£i lÃªn", "ÄÄƒng nháº­p", "Ä‘Äƒng xuáº¥t", "Quáº£n trá»‹ viÃªn", "DÃ­nh", "tá»«", `BÃ¬nh luáº­n pháº£i cÃ³ Ä‘á»™ dÃ i giá»¯a $0 vÃ  $1 tá»«!
 Sá»‘ tá»« hiá»‡n táº¡i: $2`, "VÃ´ danh", "NgÆ°á»i lÃ¹n", "NgÆ°á»i tÃ­ hon", "Tháº§n rá»«ng", "PhÃ¡p sÆ°", "TiÃªn tá»™c", "Maiar", "áº¢nh GIF", "TÃ¬m kiáº¿m áº£nh GIF", "thÃ´ng tin cÃ¡ nhÃ¢n", "ÄÃ£ Ä‘Æ°á»£c phÃª duyá»‡t", "Äang chá» Ä‘á»£i", "ThÆ° rÃ¡c", "KhÃ´ng dÃ­nh", "lÃ¢u Ä‘á»i nháº¥t", "muá»™n nháº¥t", "nÃ³ng nháº¥t", "What do you think?"]),
    Js = qe(["æ˜µç§°", "æ˜µç§°ä¸èƒ½å°‘äºŽ3ä¸ªå­—ç¬¦", "é‚®ç®±", "è¯·å¡«å†™æ­£ç¡®çš„é‚®ä»¶åœ°å€", "ç½‘å€", "å¯é€‰", "æ¬¢è¿Žè¯„è®º", "æ¥å‘è¯„è®ºå§~", "æäº¤", "å–œæ¬¢", "å–æ¶ˆå–œæ¬¢", "å›žå¤", "å–æ¶ˆå›žå¤", "è¯„è®º", "åˆ·æ–°", "åŠ è½½æ›´å¤š...", "é¢„è§ˆ", "è¡¨æƒ…", "ä¸Šä¼ å›¾ç‰‡", "ç§’å‰", "åˆ†é’Ÿå‰", "å°æ—¶å‰", "å¤©å‰", "åˆšåˆš", "æ­£åœ¨ä¸Šä¼ ", "ç™»å½•", "é€€å‡º", "åšä¸»", "ç½®é¡¶", "å­—", `è¯„è®ºå­—æ•°åº”åœ¨ $0 åˆ° $1 å­—ä¹‹é—´ï¼
å½“å‰å­—æ•°ï¼š$2`, "åŒ¿å", "æ½œæ°´", "å†’æ³¡", "åæ§½", "æ´»è·ƒ", "è¯ç—¨", "ä¼ è¯´", "è¡¨æƒ…åŒ…", "æœç´¢è¡¨æƒ…åŒ…", "ä¸ªäººèµ„æ–™", "é€šè¿‡", "å¾…å®¡æ ¸", "åžƒåœ¾", "å–æ¶ˆç½®é¡¶", "æŒ‰å€’åº", "æŒ‰æ­£åº", "æŒ‰çƒ­åº¦", "ä½ è®¤ä¸ºè¿™ç¯‡æ–‡ç« æ€Žä¹ˆæ ·ï¼Ÿ"]),
    Ho = qe(["æš±ç¨±", "æš±ç¨±ä¸èƒ½å°‘æ–¼3å€‹å­—å…ƒ", "éƒµç®±", "è«‹å¡«å¯«æ­£ç¢ºçš„éƒµä»¶åœ°å€", "ç¶²å€", "å¯é¸", "æ­¡è¿Žç•™è¨€", "ä¾†ç™¼ç•™è¨€å§~", "é€å‡º", "å–œæ­¡", "å–æ¶ˆå–œæ­¡", "å›žè¦†", "å–æ¶ˆå›žè¦†", "ç•™è¨€", "é‡æ•´", "è¼‰å…¥æ›´å¤š...", "é è¦½", "è¡¨æƒ…", "ä¸Šå‚³åœ–ç‰‡", "ç§’å‰", "åˆ†é˜å‰", "å°æ™‚å‰", "å¤©å‰", "å‰›å‰›", "æ­£åœ¨ä¸Šå‚³", "ç™»å…¥", "ç™»å‡º", "ç®¡ç†è€…", "ç½®é ‚", "å­—", `ç•™è¨€å­—æ•¸æ‡‰åœ¨ $0 åˆ° $1 å­—ä¹‹é–“ï¼
ç›®å‰å­—æ•¸ï¼š$2`, "åŒ¿å", "æ½›æ°´", "å†’æ³¡", "åæ§½", "æ´»èº", "å¤šè©±", "å‚³èªª", "è¡¨æƒ…åŒ…", "æœå°‹è¡¨æƒ…åŒ…", "å€‹äººè³‡æ–™", "é€šéŽ", "å¾…å¯©æ ¸", "åžƒåœ¾", "å–æ¶ˆç½®é ‚", "æœ€æ—©", "æœ€æ–°", "ç†±é–€", "ä½ èªç‚ºé€™ç¯‡æ–‡ç« æ€Žéº¼æ¨£ï¼Ÿ"]);
const Ys = "en-US",
    Dn = {
        zh: Js,
        "zh-cn": Js,
        "zh-tw": Ho,
        en: Vs,
        "en-us": Vs,
        fr: qs,
        "fr-fr": qs,
        jp: Ks,
        "jp-jp": Ks,
        "pt-br": Fo,
        ru: Gs,
        "ru-ru": Gs,
        vi: Zs,
        "vi-vn": Zs,
        de: Do,
        es: Ws,
        "es-mx": Ws
    },
    Qs = e => Dn[e.toLowerCase()] || Dn[Ys.toLowerCase()],
    Xs = e => Object.keys(Dn).includes(e.toLowerCase()) ? e : Ys,
    ei = {
        latest: "insertedAt_desc",
        oldest: "insertedAt_asc",
        hottest: "like_desc"
    },
    Uo = Object.keys(ei),
    Fn = Symbol("waline-config"),
    ti = e => {
        try {
            e = decodeURI(e)
        } catch {}
        return e
    },
    ni = (e = "") => e.replace(/\/$/u, ""),
    ri = e => /^(https?:)?\/\//.test(e),
    Hn = e => {
        const t = ni(e);
        return ri(t) ? t : `https://${t}`
    },
    No = e => Array.isArray(e) ? e : e ? [0, e] : !1,
    zt = (e, t) => e == null || e === !0 ? t : e === !1 ? null : e,
    Bo = ({
        serverURL: e,
        path: t = location.pathname,
        lang: n = typeof navigator > "u" ? "en-US" : navigator.language,
        locale: r,
        meta: s = ["nick", "mail", "link"],
        requiredMeta: i = [],
        dark: l = !1,
        pageSize: o = 10,
        wordLimit: a,
        noCopyright: c = !1,
        login: u = "enable",
        recaptchaV3Key: f = "",
        turnstileKey: d = "",
        commentSorting: m = "latest",
        emoji: x = Ns,
        imageUploader: b,
        highlighter: T,
        texRenderer: w,
        search: C,
        reaction: N,
        ...I
    }) => ({
        serverURL: Hn(e),
        path: ti(t),
        lang: Xs(n),
        locale: {
            ...Qs(Xs(n)),
            ...typeof r == "object" ? r : {}
        },
        wordLimit: No(a),
        meta: Us(s),
        requiredMeta: Us(i),
        dark: l,
        pageSize: o,
        commentSorting: m,
        login: u,
        noCopyright: c,
        recaptchaV3Key: f,
        turnstileKey: d,
        ...I,
        reaction: zt(N, Ro),
        imageUploader: zt(b, Ao),
        highlighter: zt(T, jo),
        texRenderer: zt(w, Eo),
        emoji: zt(x, Ns),
        search: zt(C, To(n))
    }),
    Dt = e => typeof e == "string",
    Er = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}",
    Vo = e => Dt(e) ? e === "auto" ? `@media(prefers-color-scheme:dark){body${Er}}` : `${e}${Er}` : e === !0 ? `:root${Er}` : "",
    Tr = (e, t) => {
        let n = e.toString();
        for (; n.length < t;) n = "0" + n;
        return n
    },
    Wo = e => {
        const t = Tr(e.getDate(), 2),
            n = Tr(e.getMonth() + 1, 2);
        return `${Tr(e.getFullYear(),2)}-${n}-${t}`
    },
    qo = (e, t, n) => {
        if (!e) return "";
        const r = Dt(e) ? new Date(e.includes(" ") ? e.replace(/-/g, "/") : e) : e,
            s = t.getTime() - r.getTime(),
            i = Math.floor(s / (24 * 3600 * 1e3));
        if (i === 0) {
            const l = s % 864e5,
                o = Math.floor(l / (3600 * 1e3));
            if (o === 0) {
                const a = l % 36e5,
                    c = Math.floor(a / (60 * 1e3));
                if (c === 0) {
                    const u = a % 6e4;
                    return `${Math.round(u/1e3)} ${n.seconds}`
                }
                return `${c} ${n.minutes}`
            }
            return `${o} ${n.hours}`
        }
        return i < 0 ? n.now : i < 8 ? `${i} ${n.days}` : Wo(r)
    },
    Ko = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    Go = e => Ko.test(e);
/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
/*! #__NO_SIDE_EFFECTS__ */
function Ir(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return n => n in t
}
const ie = {},
    Ft = [],
    wt = () => {},
    Zo = () => !1,
    Un = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Lr = e => e.startsWith("onUpdate:"),
    je = Object.assign,
    si = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    Jo = Object.prototype.hasOwnProperty,
    X = (e, t) => Jo.call(e, t),
    q = Array.isArray,
    Ht = e => rn(e) === "[object Map]",
    Ut = e => rn(e) === "[object Set]",
    ii = e => rn(e) === "[object Date]",
    ee = e => typeof e == "function",
    ye = e => typeof e == "string",
    Ke = e => typeof e == "symbol",
    he = e => e !== null && typeof e == "object",
    li = e => (he(e) || ee(e)) && ee(e.then) && ee(e.catch),
    oi = Object.prototype.toString,
    rn = e => oi.call(e),
    Yo = e => rn(e).slice(8, -1),
    ai = e => rn(e) === "[object Object]",
    Mr = e => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    sn = Ir(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Nn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    Qo = /-(\w)/g,
    ze = Nn(e => e.replace(Qo, (t, n) => n ? n.toUpperCase() : "")),
    Xo = /\B([A-Z])/g,
    kt = Nn(e => e.replace(Xo, "-$1").toLowerCase()),
    Bn = Nn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Pr = Nn(e => e ? `on${Bn(e)}` : ""),
    ft = (e, t) => !Object.is(e, t),
    Vn = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t)
    },
    ci = (e, t, n, r = !1) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            writable: r,
            value: n
        })
    },
    Wn = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let ui;
const ln = () => ui || (ui = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function on(e) {
    if (q(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = ye(r) ? ra(r) : on(r);
            if (s)
                for (const i in s) t[i] = s[i]
        }
        return t
    } else if (ye(e) || he(e)) return e
}
const ea = /;(?![^(]*\))/g,
    ta = /:([^]+)/,
    na = /\/\*[^]*?\*\//g;

function ra(e) {
    const t = {};
    return e.replace(na, "").split(ea).forEach(n => {
        if (n) {
            const r = n.split(ta);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function me(e) {
    let t = "";
    if (ye(e)) t = e;
    else if (q(e))
        for (let n = 0; n < e.length; n++) {
            const r = me(e[n]);
            r && (t += r + " ")
        } else if (he(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const sa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    ia = Ir(sa);

function fi(e) {
    return !!e || e === ""
}

function la(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let r = 0; n && r < e.length; r++) n = xt(e[r], t[r]);
    return n
}

function xt(e, t) {
    if (e === t) return !0;
    let n = ii(e),
        r = ii(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
    if (n = Ke(e), r = Ke(t), n || r) return e === t;
    if (n = q(e), r = q(t), n || r) return n && r ? la(e, t) : !1;
    if (n = he(e), r = he(t), n || r) {
        if (!n || !r) return !1;
        const s = Object.keys(e).length,
            i = Object.keys(t).length;
        if (s !== i) return !1;
        for (const l in e) {
            const o = e.hasOwnProperty(l),
                a = t.hasOwnProperty(l);
            if (o && !a || !o && a || !xt(e[l], t[l])) return !1
        }
    }
    return String(e) === String(t)
}

function Or(e, t) {
    return e.findIndex(n => xt(n, t))
}
const hi = e => !!(e && e.__v_isRef === !0),
    Y = e => ye(e) ? e : e == null ? "" : q(e) || he(e) && (e.toString === oi || !ee(e.toString)) ? hi(e) ? Y(e.value) : JSON.stringify(e, pi, 2) : String(e),
    pi = (e, t) => hi(t) ? pi(e, t.value) : Ht(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], i) => (n[jr(r, i) + " =>"] = s, n), {})
    } : Ut(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(n => jr(n))
    } : Ke(t) ? jr(t) : he(t) && !q(t) && !ai(t) ? String(t) : t,
    jr = (e, t = "") => {
        var n;
        return Ke(e) ? `Symbol(${(n=e.description)!=null?n:t})` : e
    };
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let Ce;
class oa {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ce, !t && Ce && (this.index = (Ce.scopes || (Ce.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, n;
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, n;
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
        }
    }
    run(t) {
        if (this._active) {
            const n = Ce;
            try {
                return Ce = this, t()
            } finally {
                Ce = n
            }
        }
    }
    on() {
        Ce = this
    }
    off() {
        Ce = this.parent
    }
    stop(t) {
        if (this._active) {
            this._active = !1;
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.cleanups.length = 0, this.scopes) {
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
                this.scopes.length = 0
            }
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0
        }
    }
}

function di() {
    return Ce
}

function aa(e, t = !1) {
    Ce && Ce.cleanups.push(e)
}
let ue;
const zr = new WeakSet;
class gi {
    constructor(t) {
        this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && Ce.active && Ce.effects.push(this)
    }
    pause() {
        this.flags |= 64
    }
    resume() {
        this.flags & 64 && (this.flags &= -65, zr.has(this) && (zr.delete(this), this.trigger()))
    }
    notify() {
        this.flags & 2 && !(this.flags & 32) || this.flags & 8 || vi(this)
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        this.flags |= 2, xi(this), bi(this);
        const t = ue,
            n = Ne;
        ue = this, Ne = !0;
        try {
            return this.fn()
        } finally {
            yi(this), ue = t, Ne = n, this.flags &= -3
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) Ur(t);
            this.deps = this.depsTail = void 0, xi(this), this.onStop && this.onStop(), this.flags &= -2
        }
    }
    trigger() {
        this.flags & 64 ? zr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }
    runIfDirty() {
        Hr(this) && this.run()
    }
    get dirty() {
        return Hr(this)
    }
}
let mi = 0,
    an, cn;

function vi(e, t = !1) {
    if (e.flags |= 8, t) {
        e.next = cn, cn = e;
        return
    }
    e.next = an, an = e
}

function Dr() {
    mi++
}

function Fr() {
    if (--mi > 0) return;
    if (cn) {
        let t = cn;
        for (cn = void 0; t;) {
            const n = t.next;
            t.next = void 0, t.flags &= -9, t = n
        }
    }
    let e;
    for (; an;) {
        let t = an;
        for (an = void 0; t;) {
            const n = t.next;
            if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
                t.trigger()
            } catch (r) {
                e || (e = r)
            }
            t = n
        }
    }
    if (e) throw e
}

function bi(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t
}

function yi(e) {
    let t, n = e.depsTail,
        r = n;
    for (; r;) {
        const s = r.prevDep;
        r.version === -1 ? (r === n && (n = s), Ur(r), ca(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s
    }
    e.deps = t, e.depsTail = n
}

function Hr(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (t.dep.version !== t.version || t.dep.computed && (wi(t.dep.computed) || t.dep.version !== t.version)) return !0;
    return !!e._dirty
}

function wi(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === un)) return;
    e.globalVersion = un;
    const t = e.dep;
    if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Hr(e)) {
        e.flags &= -3;
        return
    }
    const n = ue,
        r = Ne;
    ue = e, Ne = !0;
    try {
        bi(e);
        const s = e.fn(e._value);
        (t.version === 0 || ft(s, e._value)) && (e._value = s, t.version++)
    } catch (s) {
        throw t.version++, s
    } finally {
        ue = n, Ne = r, yi(e), e.flags &= -3
    }
}

function Ur(e, t = !1) {
    const {
        dep: n,
        prevSub: r,
        nextSub: s
    } = e;
    if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
        n.computed.flags &= -5;
        for (let i = n.computed.deps; i; i = i.nextDep) Ur(i, !0)
    }!t && !--n.sc && n.map && n.map.delete(n.key)
}

function ca(e) {
    const {
        prevDep: t,
        nextDep: n
    } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0)
}
let Ne = !0;
const ki = [];

function _t() {
    ki.push(Ne), Ne = !1
}

function Ct() {
    const e = ki.pop();
    Ne = e === void 0 ? !0 : e
}

function xi(e) {
    const {
        cleanup: t
    } = e;
    if (e.cleanup = void 0, t) {
        const n = ue;
        ue = void 0;
        try {
            t()
        } finally {
            ue = n
        }
    }
}
let un = 0;
class ua {
    constructor(t, n) {
        this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}
class qn {
    constructor(t) {
        this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0
    }
    track(t) {
        if (!ue || !Ne || ue === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== ue) n = this.activeLink = new ua(ue, this), ue.deps ? (n.prevDep = ue.depsTail, ue.depsTail.nextDep = n, ue.depsTail = n) : ue.deps = ue.depsTail = n, _i(n);
        else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
            const r = n.nextDep;
            r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ue.depsTail, n.nextDep = void 0, ue.depsTail.nextDep = n, ue.depsTail = n, ue.deps === n && (ue.deps = r)
        }
        return n
    }
    trigger(t) {
        this.version++, un++, this.notify(t)
    }
    notify(t) {
        Dr();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
        } finally {
            Fr()
        }
    }
}

function _i(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let r = t.deps; r; r = r.nextDep) _i(r)
        }
        const n = e.dep.subs;
        n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e
    }
}
const Kn = new WeakMap,
    St = Symbol(""),
    Nr = Symbol(""),
    fn = Symbol("");

function ke(e, t, n) {
    if (Ne && ue) {
        let r = Kn.get(e);
        r || Kn.set(e, r = new Map);
        let s = r.get(n);
        s || (r.set(n, s = new qn), s.map = r, s.key = n), s.track()
    }
}

function et(e, t, n, r, s, i) {
    const l = Kn.get(e);
    if (!l) {
        un++;
        return
    }
    const o = a => {
        a && a.trigger()
    };
    if (Dr(), t === "clear") l.forEach(o);
    else {
        const a = q(e),
            c = a && Mr(n);
        if (a && n === "length") {
            const u = Number(r);
            l.forEach((f, d) => {
                (d === "length" || d === fn || !Ke(d) && d >= u) && o(f)
            })
        } else switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), c && o(l.get(fn)), t) {
            case "add":
                a ? c && o(l.get("length")) : (o(l.get(St)), Ht(e) && o(l.get(Nr)));
                break;
            case "delete":
                a || (o(l.get(St)), Ht(e) && o(l.get(Nr)));
                break;
            case "set":
                Ht(e) && o(l.get(St));
                break
        }
    }
    Fr()
}

function fa(e, t) {
    const n = Kn.get(e);
    return n && n.get(t)
}

function Nt(e) {
    const t = Q(e);
    return t === e ? t : (ke(t, "iterate", fn), De(e) ? t : t.map(xe))
}

function Gn(e) {
    return ke(e = Q(e), "iterate", fn), e
}
const ha = {
    __proto__: null,
    [Symbol.iterator]() {
        return Br(this, Symbol.iterator, xe)
    },
    concat(...e) {
        return Nt(this).concat(...e.map(t => q(t) ? Nt(t) : t))
    },
    entries() {
        return Br(this, "entries", e => (e[1] = xe(e[1]), e))
    },
    every(e, t) {
        return tt(this, "every", e, t, void 0, arguments)
    },
    filter(e, t) {
        return tt(this, "filter", e, t, n => n.map(xe), arguments)
    },
    find(e, t) {
        return tt(this, "find", e, t, xe, arguments)
    },
    findIndex(e, t) {
        return tt(this, "findIndex", e, t, void 0, arguments)
    },
    findLast(e, t) {
        return tt(this, "findLast", e, t, xe, arguments)
    },
    findLastIndex(e, t) {
        return tt(this, "findLastIndex", e, t, void 0, arguments)
    },
    forEach(e, t) {
        return tt(this, "forEach", e, t, void 0, arguments)
    },
    includes(...e) {
        return Vr(this, "includes", e)
    },
    indexOf(...e) {
        return Vr(this, "indexOf", e)
    },
    join(e) {
        return Nt(this).join(e)
    },
    lastIndexOf(...e) {
        return Vr(this, "lastIndexOf", e)
    },
    map(e, t) {
        return tt(this, "map", e, t, void 0, arguments)
    },
    pop() {
        return hn(this, "pop")
    },
    push(...e) {
        return hn(this, "push", e)
    },
    reduce(e, ...t) {
        return Ci(this, "reduce", e, t)
    },
    reduceRight(e, ...t) {
        return Ci(this, "reduceRight", e, t)
    },
    shift() {
        return hn(this, "shift")
    },
    some(e, t) {
        return tt(this, "some", e, t, void 0, arguments)
    },
    splice(...e) {
        return hn(this, "splice", e)
    },
    toReversed() {
        return Nt(this).toReversed()
    },
    toSorted(e) {
        return Nt(this).toSorted(e)
    },
    toSpliced(...e) {
        return Nt(this).toSpliced(...e)
    },
    unshift(...e) {
        return hn(this, "unshift", e)
    },
    values() {
        return Br(this, "values", xe)
    }
};

function Br(e, t, n) {
    const r = Gn(e),
        s = r[t]();
    return r !== e && !De(e) && (s._next = s.next, s.next = () => {
        const i = s._next();
        return i.value && (i.value = n(i.value)), i
    }), s
}
const pa = Array.prototype;

function tt(e, t, n, r, s, i) {
    const l = Gn(e),
        o = l !== e && !De(e),
        a = l[t];
    if (a !== pa[t]) {
        const f = a.apply(e, i);
        return o ? xe(f) : f
    }
    let c = n;
    l !== e && (o ? c = function(f, d) {
        return n.call(this, xe(f), d, e)
    } : n.length > 2 && (c = function(f, d) {
        return n.call(this, f, d, e)
    }));
    const u = a.call(l, c, r);
    return o && s ? s(u) : u
}

function Ci(e, t, n, r) {
    const s = Gn(e);
    let i = n;
    return s !== e && (De(e) ? n.length > 3 && (i = function(l, o, a) {
        return n.call(this, l, o, a, e)
    }) : i = function(l, o, a) {
        return n.call(this, l, xe(o), a, e)
    }), s[t](i, ...r)
}

function Vr(e, t, n) {
    const r = Q(e);
    ke(r, "iterate", fn);
    const s = r[t](...n);
    return (s === -1 || s === !1) && Gr(n[0]) ? (n[0] = Q(n[0]), r[t](...n)) : s
}

function hn(e, t, n = []) {
    _t(), Dr();
    const r = Q(e)[t].apply(e, n);
    return Fr(), Ct(), r
}
const da = Ir("__proto__,__v_isRef,__isVue"),
    Si = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ke));

function ga(e) {
    Ke(e) || (e = String(e));
    const t = Q(this);
    return ke(t, "has", e), t.hasOwnProperty(e)
}
class $i {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._isShallow = n
    }
    get(t, n, r) {
        if (n === "__v_skip") return t.__v_skip;
        const s = this._isReadonly,
            i = this._isShallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return i;
        if (n === "__v_raw") return r === (s ? i ? Sa : Ti : i ? Ei : Ai).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const l = q(t);
        if (!s) {
            let a;
            if (l && (a = ha[n])) return a;
            if (n === "hasOwnProperty") return ga
        }
        const o = Reflect.get(t, n, ve(t) ? t : r);
        return (Ke(n) ? Si.has(n) : da(n)) || (s || ke(t, "get", n), i) ? o : ve(o) ? l && Mr(n) ? o : o.value : he(o) ? s ? Bt(o) : pn(o) : o
    }
}
class Ri extends $i {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, n, r, s) {
        let i = t[n];
        if (!this._isShallow) {
            const a = $t(i);
            if (!De(r) && !$t(r) && (i = Q(i), r = Q(r)), !q(t) && ve(i) && !ve(r)) return a ? !1 : (i.value = r, !0)
        }
        const l = q(t) && Mr(n) ? Number(n) < t.length : X(t, n),
            o = Reflect.set(t, n, r, ve(t) ? t : s);
        return t === Q(s) && (l ? ft(r, i) && et(t, "set", n, r) : et(t, "add", n, r)), o
    }
    deleteProperty(t, n) {
        const r = X(t, n),
            s = Reflect.deleteProperty(t, n);
        return s && r && et(t, "delete", n, void 0), s
    }
    has(t, n) {
        const r = Reflect.has(t, n);
        return (!Ke(n) || !Si.has(n)) && ke(t, "has", n), r
    }
    ownKeys(t) {
        return ke(t, "iterate", q(t) ? "length" : St), Reflect.ownKeys(t)
    }
}
class ma extends $i {
    constructor(t = !1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const va = new Ri,
    ba = new ma,
    ya = new Ri(!0),
    Wr = e => e,
    Zn = e => Reflect.getPrototypeOf(e);

function wa(e, t, n) {
    return function(...r) {
        const s = this.__v_raw,
            i = Q(s),
            l = Ht(i),
            o = e === "entries" || e === Symbol.iterator && l,
            a = e === "keys" && l,
            c = s[e](...r),
            u = n ? Wr : t ? Zr : xe;
        return !t && ke(i, "iterate", a ? Nr : St), {
            next() {
                const {
                    value: f,
                    done: d
                } = c.next();
                return d ? {
                    value: f,
                    done: d
                } : {
                    value: o ? [u(f[0]), u(f[1])] : u(f),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Jn(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function ka(e, t) {
    const n = {
        get(s) {
            const i = this.__v_raw,
                l = Q(i),
                o = Q(s);
            e || (ft(s, o) && ke(l, "get", s), ke(l, "get", o));
            const {
                has: a
            } = Zn(l), c = t ? Wr : e ? Zr : xe;
            if (a.call(l, s)) return c(i.get(s));
            if (a.call(l, o)) return c(i.get(o));
            i !== l && i.get(s)
        },
        get size() {
            const s = this.__v_raw;
            return !e && ke(Q(s), "iterate", St), Reflect.get(s, "size", s)
        },
        has(s) {
            const i = this.__v_raw,
                l = Q(i),
                o = Q(s);
            return e || (ft(s, o) && ke(l, "has", s), ke(l, "has", o)), s === o ? i.has(s) : i.has(s) || i.has(o)
        },
        forEach(s, i) {
            const l = this,
                o = l.__v_raw,
                a = Q(o),
                c = t ? Wr : e ? Zr : xe;
            return !e && ke(a, "iterate", St), o.forEach((u, f) => s.call(i, c(u), c(f), l))
        }
    };
    return je(n, e ? {
        add: Jn("add"),
        set: Jn("set"),
        delete: Jn("delete"),
        clear: Jn("clear")
    } : {
        add(s) {
            !t && !De(s) && !$t(s) && (s = Q(s));
            const i = Q(this);
            return Zn(i).has.call(i, s) || (i.add(s), et(i, "add", s, s)), this
        },
        set(s, i) {
            !t && !De(i) && !$t(i) && (i = Q(i));
            const l = Q(this),
                {
                    has: o,
                    get: a
                } = Zn(l);
            let c = o.call(l, s);
            c || (s = Q(s), c = o.call(l, s));
            const u = a.call(l, s);
            return l.set(s, i), c ? ft(i, u) && et(l, "set", s, i) : et(l, "add", s, i), this
        },
        delete(s) {
            const i = Q(this),
                {
                    has: l,
                    get: o
                } = Zn(i);
            let a = l.call(i, s);
            a || (s = Q(s), a = l.call(i, s)), o && o.call(i, s);
            const c = i.delete(s);
            return a && et(i, "delete", s, void 0), c
        },
        clear() {
            const s = Q(this),
                i = s.size !== 0,
                l = s.clear();
            return i && et(s, "clear", void 0, void 0), l
        }
    }), ["keys", "values", "entries", Symbol.iterator].forEach(s => {
        n[s] = wa(s, e, t)
    }), n
}

function qr(e, t) {
    const n = ka(e, t);
    return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(X(n, s) && s in r ? n : r, s, i)
}
const xa = {
        get: qr(!1, !1)
    },
    _a = {
        get: qr(!1, !0)
    },
    Ca = {
        get: qr(!0, !1)
    },
    Ai = new WeakMap,
    Ei = new WeakMap,
    Ti = new WeakMap,
    Sa = new WeakMap;

function $a(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Ra(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : $a(Yo(e))
}

function pn(e) {
    return $t(e) ? e : Kr(e, !1, va, xa, Ai)
}

function Aa(e) {
    return Kr(e, !1, ya, _a, Ei)
}

function Bt(e) {
    return Kr(e, !0, ba, Ca, Ti)
}

function Kr(e, t, n, r, s) {
    if (!he(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = s.get(e);
    if (i) return i;
    const l = Ra(e);
    if (l === 0) return e;
    const o = new Proxy(e, l === 2 ? r : n);
    return s.set(e, o), o
}

function Vt(e) {
    return $t(e) ? Vt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function $t(e) {
    return !!(e && e.__v_isReadonly)
}

function De(e) {
    return !!(e && e.__v_isShallow)
}

function Gr(e) {
    return e ? !!e.__v_raw : !1
}

function Q(e) {
    const t = e && e.__v_raw;
    return t ? Q(t) : e
}

function Ea(e) {
    return !X(e, "__v_skip") && Object.isExtensible(e) && ci(e, "__v_skip", !0), e
}
const xe = e => he(e) ? pn(e) : e,
    Zr = e => he(e) ? Bt(e) : e;

function ve(e) {
    return e ? e.__v_isRef === !0 : !1
}

function se(e) {
    return Ii(e, !1)
}

function Rt(e) {
    return Ii(e, !0)
}

function Ii(e, t) {
    return ve(e) ? e : new Ta(e, t)
}
class Ta {
    constructor(t, n) {
        this.dep = new qn, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Q(t), this._value = n ? t : xe(t), this.__v_isShallow = n
    }
    get value() {
        return this.dep.track(), this._value
    }
    set value(t) {
        const n = this._rawValue,
            r = this.__v_isShallow || De(t) || $t(t);
        t = r ? t : Q(t), ft(t, n) && (this._rawValue = t, this._value = r ? t : xe(t), this.dep.trigger())
    }
}

function K(e) {
    return ve(e) ? e.value : e
}

function Te(e) {
    return ee(e) ? e() : K(e)
}
const Ia = {
    get: (e, t, n) => t === "__v_raw" ? e : K(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return ve(s) && !ve(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Li(e) {
    return Vt(e) ? e : new Proxy(e, Ia)
}
class La {
    constructor(t) {
        this.__v_isRef = !0, this._value = void 0;
        const n = this.dep = new qn,
            {
                get: r,
                set: s
            } = t(n.track.bind(n), n.trigger.bind(n));
        this._get = r, this._set = s
    }
    get value() {
        return this._value = this._get()
    }
    set value(t) {
        this._set(t)
    }
}

function Ma(e) {
    return new La(e)
}
class Pa {
    constructor(t, n, r) {
        this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0
    }
    get value() {
        const t = this._object[this._key];
        return this._value = t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return fa(Q(this._object), this._key)
    }
}
class Oa {
    constructor(t) {
        this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0
    }
    get value() {
        return this._value = this._getter()
    }
}

function ja(e, t, n) {
    return ve(e) ? e : ee(e) ? new Oa(e) : he(e) && arguments.length > 1 ? za(e, t, n) : se(e)
}

function za(e, t, n) {
    const r = e[t];
    return ve(r) ? r : new Pa(e, t, n)
}
class Da {
    constructor(t, n, r) {
        this.fn = t, this.setter = n, this._value = void 0, this.dep = new qn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = un - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r
    }
    notify() {
        if (this.flags |= 16, !(this.flags & 8) && ue !== this) return vi(this, !0), !0
    }
    get value() {
        const t = this.dep.track();
        return wi(this), t && (t.version = this.dep.version), this._value
    }
    set value(t) {
        this.setter && this.setter(t)
    }
}

function Fa(e, t, n = !1) {
    let r, s;
    return ee(e) ? r = e : (r = e.get, s = e.set), new Da(r, s, n)
}
const Yn = {},
    Qn = new WeakMap;
let At;

function Ha(e, t = !1, n = At) {
    if (n) {
        let r = Qn.get(n);
        r || Qn.set(n, r = []), r.push(e)
    }
}

function Ua(e, t, n = ie) {
    const {
        immediate: r,
        deep: s,
        once: i,
        scheduler: l,
        augmentJob: o,
        call: a
    } = n, c = I => s ? I : De(I) || s === !1 || s === 0 ? nt(I, 1) : nt(I);
    let u, f, d, m, x = !1,
        b = !1;
    if (ve(e) ? (f = () => e.value, x = De(e)) : Vt(e) ? (f = () => c(e), x = !0) : q(e) ? (b = !0, x = e.some(I => Vt(I) || De(I)), f = () => e.map(I => {
            if (ve(I)) return I.value;
            if (Vt(I)) return c(I);
            if (ee(I)) return a ? a(I, 2) : I()
        })) : ee(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
            if (d) {
                _t();
                try {
                    d()
                } finally {
                    Ct()
                }
            }
            const I = At;
            At = u;
            try {
                return a ? a(e, 3, [m]) : e(m)
            } finally {
                At = I
            }
        } : f = wt, t && s) {
        const I = f,
            O = s === !0 ? 1 / 0 : s;
        f = () => nt(I(), O)
    }
    const T = di(),
        w = () => {
            u.stop(), T && T.active && si(T.effects, u)
        };
    if (i && t) {
        const I = t;
        t = (...O) => {
            I(...O), w()
        }
    }
    let C = b ? new Array(e.length).fill(Yn) : Yn;
    const N = I => {
        if (!(!(u.flags & 1) || !u.dirty && !I))
            if (t) {
                const O = u.run();
                if (s || x || (b ? O.some((G, j) => ft(G, C[j])) : ft(O, C))) {
                    d && d();
                    const G = At;
                    At = u;
                    try {
                        const j = [O, C === Yn ? void 0 : b && C[0] === Yn ? [] : C, m];
                        a ? a(t, 3, j) : t(...j), C = O
                    } finally {
                        At = G
                    }
                }
            } else u.run()
    };
    return o && o(N), u = new gi(f), u.scheduler = l ? () => l(N, !1) : N, m = I => Ha(I, !1, u), d = u.onStop = () => {
        const I = Qn.get(u);
        if (I) {
            if (a) a(I, 4);
            else
                for (const O of I) O();
            Qn.delete(u)
        }
    }, t ? r ? N(!0) : C = u.run() : l ? l(N.bind(null, !0), !0) : u.run(), w.pause = u.pause.bind(u), w.resume = u.resume.bind(u), w.stop = w, w
}

function nt(e, t = 1 / 0, n) {
    if (t <= 0 || !he(e) || e.__v_skip || (n = n || new Set, n.has(e))) return e;
    if (n.add(e), t--, ve(e)) nt(e.value, t, n);
    else if (q(e))
        for (let r = 0; r < e.length; r++) nt(e[r], t, n);
    else if (Ut(e) || Ht(e)) e.forEach(r => {
        nt(r, t, n)
    });
    else if (ai(e)) {
        for (const r in e) nt(e[r], t, n);
        for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && nt(e[r], t, n)
    }
    return e
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function dn(e, t, n, r) {
    try {
        return r ? e(...r) : e()
    } catch (s) {
        Xn(s, t, n)
    }
}

function rt(e, t, n, r) {
    if (ee(e)) {
        const s = dn(e, t, n, r);
        return s && li(s) && s.catch(i => {
            Xn(i, t, n)
        }), s
    }
    if (q(e)) {
        const s = [];
        for (let i = 0; i < e.length; i++) s.push(rt(e[i], t, n, r));
        return s
    }
}

function Xn(e, t, n, r = !0) {
    const s = t ? t.vnode : null,
        {
            errorHandler: i,
            throwUnhandledErrorInProduction: l
        } = t && t.appContext.config || ie;
    if (t) {
        let o = t.parent;
        const a = t.proxy,
            c = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; o;) {
            const u = o.ec;
            if (u) {
                for (let f = 0; f < u.length; f++)
                    if (u[f](e, a, c) === !1) return
            }
            o = o.parent
        }
        if (i) {
            _t(), dn(i, null, 10, [e, a, c]), Ct();
            return
        }
    }
    Na(e, n, s, r, l)
}

function Na(e, t, n, r = !0, s = !1) {
    if (s) throw e;
    console.error(e)
}
const Se = [];
let Ge = -1;
const Wt = [];
let ht = null,
    qt = 0;
const Mi = Promise.resolve();
let er = null;

function Kt(e) {
    const t = er || Mi;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Ba(e) {
    let t = Ge + 1,
        n = Se.length;
    for (; t < n;) {
        const r = t + n >>> 1,
            s = Se[r],
            i = gn(s);
        i < e || i === e && s.flags & 2 ? t = r + 1 : n = r
    }
    return t
}

function Jr(e) {
    if (!(e.flags & 1)) {
        const t = gn(e),
            n = Se[Se.length - 1];
        !n || !(e.flags & 2) && t >= gn(n) ? Se.push(e) : Se.splice(Ba(t), 0, e), e.flags |= 1, Pi()
    }
}

function Pi() {
    er || (er = Mi.then(zi))
}

function Va(e) {
    q(e) ? Wt.push(...e) : ht && e.id === -1 ? ht.splice(qt + 1, 0, e) : e.flags & 1 || (Wt.push(e), e.flags |= 1), Pi()
}

function Oi(e, t, n = Ge + 1) {
    for (; n < Se.length; n++) {
        const r = Se[n];
        if (r && r.flags & 2) {
            if (e && r.id !== e.uid) continue;
            Se.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2)
        }
    }
}

function ji(e) {
    if (Wt.length) {
        const t = [...new Set(Wt)].sort((n, r) => gn(n) - gn(r));
        if (Wt.length = 0, ht) {
            ht.push(...t);
            return
        }
        for (ht = t, qt = 0; qt < ht.length; qt++) {
            const n = ht[qt];
            n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2
        }
        ht = null, qt = 0
    }
}
const gn = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;

function zi(e) {
    try {
        for (Ge = 0; Ge < Se.length; Ge++) {
            const t = Se[Ge];
            t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), dn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
        }
    } finally {
        for (; Ge < Se.length; Ge++) {
            const t = Se[Ge];
            t && (t.flags &= -2)
        }
        Ge = -1, Se.length = 0, ji(), er = null, (Se.length || Wt.length) && zi()
    }
}
let Ae = null,
    Di = null;

function tr(e) {
    const t = Ae;
    return Ae = e, Di = e && e.type.__scopeId || null, t
}

function Wa(e, t = Ae, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && sl(-1);
        const i = tr(t);
        let l;
        try {
            l = e(...s)
        } finally {
            tr(i), r._d && sl(1)
        }
        return l
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function nr(e, t) {
    if (Ae === null) return e;
    const n = ur(Ae),
        r = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
        let [i, l, o, a = ie] = t[s];
        i && (ee(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && nt(l), r.push({
            dir: i,
            instance: n,
            value: l,
            oldValue: void 0,
            arg: o,
            modifiers: a
        }))
    }
    return e
}

function Et(e, t, n, r) {
    const s = e.dirs,
        i = t && t.dirs;
    for (let l = 0; l < s.length; l++) {
        const o = s[l];
        i && (o.oldValue = i[l].value);
        let a = o.dir[r];
        a && (_t(), rt(a, n, 8, [e.el, o, e, t]), Ct())
    }
}
const qa = Symbol("_vte"),
    Ka = e => e.__isTeleport;

function Yr(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Yr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
} /*! #__NO_SIDE_EFFECTS__ */
function mn(e, t) {
    return ee(e) ? je({
        name: e.name
    }, t, {
        setup: e
    }) : e
}

function Ga(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
}

function pt(e) {
    const t = ol(),
        n = Rt(null);
    if (t) {
        const s = t.refs === ie ? t.refs = {} : t.refs;
        Object.defineProperty(s, e, {
            enumerable: !0,
            get: () => n.value,
            set: i => n.value = i
        })
    }
    return n
}

function rr(e, t, n, r, s = !1) {
    if (q(e)) {
        e.forEach((x, b) => rr(x, t && (q(t) ? t[b] : t), n, r, s));
        return
    }
    if (vn(r) && !s) {
        r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && rr(e, t, n, r.component.subTree);
        return
    }
    const i = r.shapeFlag & 4 ? ur(r.component) : r.el,
        l = s ? null : i,
        {
            i: o,
            r: a
        } = e,
        c = t && t.r,
        u = o.refs === ie ? o.refs = {} : o.refs,
        f = o.setupState,
        d = Q(f),
        m = f === ie ? () => !1 : x => X(d, x);
    if (c != null && c !== a && (ye(c) ? (u[c] = null, m(c) && (f[c] = null)) : ve(c) && (c.value = null)), ee(a)) dn(a, o, 12, [l, u]);
    else {
        const x = ye(a),
            b = ve(a);
        if (x || b) {
            const T = () => {
                if (e.f) {
                    const w = x ? m(a) ? f[a] : u[a] : a.value;
                    s ? q(w) && si(w, i) : q(w) ? w.includes(i) || w.push(i) : x ? (u[a] = [i], m(a) && (f[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value))
                } else x ? (u[a] = l, m(a) && (f[a] = l)) : b && (a.value = l, e.k && (u[e.k] = l))
            };
            l ? (T.id = -1, Ie(T, n)) : T()
        }
    }
}
ln().requestIdleCallback, ln().cancelIdleCallback;
const vn = e => !!e.type.__asyncLoader,
    Za = e => e.type.__isKeepAlive;

function Ja(e, t, n = $e, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            i = t.__weh || (t.__weh = (...l) => {
                _t();
                const o = as(n),
                    a = rt(t, n, e, l);
                return o(), Ct(), a
            });
        return r ? s.unshift(i) : s.push(i), i
    }
}
const Qr = e => (t, n = $e) => {
        (!_n || e === "sp") && Ja(e, (...r) => t(...r), n)
    },
    bn = Qr("m"),
    Ya = Qr("bum"),
    Xr = Qr("um"),
    Qa = "components";

function Xa(e, t) {
    return tc(Qa, e, !0, t) || e
}
const ec = Symbol.for("v-ndc");

function tc(e, t, n = !0, r = !1) {
    const s = Ae || $e;
    if (s) {
        const i = s.type;
        {
            const o = Dc(i, !1);
            if (o && (o === t || o === ze(t) || o === Bn(ze(t)))) return i
        }
        const l = Fi(s[e] || i[e], t) || Fi(s.appContext[e], t);
        return !l && r ? i : l
    }
}

function Fi(e, t) {
    return e && (e[t] || e[ze(t)] || e[Bn(ze(t))])
}

function Fe(e, t, n, r) {
    let s;
    const i = n,
        l = q(e);
    if (l || ye(e)) {
        const o = l && Vt(e);
        let a = !1;
        o && (a = !De(e), e = Gn(e)), s = new Array(e.length);
        for (let c = 0, u = e.length; c < u; c++) s[c] = t(a ? xe(e[c]) : e[c], c, void 0, i)
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i)
    } else if (he(e))
        if (e[Symbol.iterator]) s = Array.from(e, (o, a) => t(o, a, void 0, i));
        else {
            const o = Object.keys(e);
            s = new Array(o.length);
            for (let a = 0, c = o.length; a < c; a++) {
                const u = o[a];
                s[a] = t(e[u], u, a, i)
            }
        }
    else s = [];
    return s
}
const es = e => e ? cl(e) ? ur(e) : es(e.parent) : null,
    yn = je(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => es(e.parent),
        $root: e => es(e.root),
        $host: e => e.ce,
        $emit: e => e.emit,
        $options: e => e.type,
        $forceUpdate: e => e.f || (e.f = () => {
            Jr(e.update)
        }),
        $nextTick: e => e.n || (e.n = Kt.bind(e.proxy)),
        $watch: e => wt
    }),
    ts = (e, t) => e !== ie && !e.__isScriptSetup && X(e, t),
    nc = {
        get({
            _: e
        }, t) {
            if (t === "__v_skip") return !0;
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: i,
                accessCache: l,
                type: o,
                appContext: a
            } = e;
            let c;
            if (t[0] !== "$") {
                const m = l[t];
                if (m !== void 0) switch (m) {
                    case 1:
                        return r[t];
                    case 2:
                        return s[t];
                    case 4:
                        return n[t];
                    case 3:
                        return i[t]
                } else {
                    if (ts(r, t)) return l[t] = 1, r[t];
                    if (s !== ie && X(s, t)) return l[t] = 2, s[t];
                    if ((c = e.propsOptions[0]) && X(c, t)) return l[t] = 3, i[t];
                    if (n !== ie && X(n, t)) return l[t] = 4, n[t];
                    l[t] = 0
                }
            }
            const u = yn[t];
            let f, d;
            if (u) return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
            if ((f = o.__cssModules) && (f = f[t])) return f;
            if (n !== ie && X(n, t)) return l[t] = 4, n[t];
            if (d = a.config.globalProperties, X(d, t)) return d[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: r,
                setupState: s,
                ctx: i
            } = e;
            return ts(s, t) ? (s[t] = n, !0) : r !== ie && X(r, t) ? (r[t] = n, !0) : X(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: r,
                appContext: s,
                propsOptions: i
            }
        }, l) {
            let o;
            return !!n[l] || e !== ie && X(e, l) || ts(t, l) || (o = i[0]) && X(o, l) || X(r, l) || X(yn, l) || X(s.config.globalProperties, l)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : X(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function Hi() {
    return {
        app: null,
        config: {
            isNativeTag: Zo,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let rc = 0;

function sc(e, t) {
    return function(r, s = null) {
        ee(r) || (r = je({}, r)), s != null && !he(s) && (s = null);
        const i = Hi(),
            l = new WeakSet,
            o = [];
        let a = !1;
        const c = i.app = {
            _uid: rc++,
            _component: r,
            _props: s,
            _container: null,
            _context: i,
            _instance: null,
            version: Hc,
            get config() {
                return i.config
            },
            set config(u) {},
            use(u, ...f) {
                return l.has(u) || (u && ee(u.install) ? (l.add(u), u.install(c, ...f)) : ee(u) && (l.add(u), u(c, ...f))), c
            },
            mixin(u) {
                return c
            },
            component(u, f) {
                return f ? (i.components[u] = f, c) : i.components[u]
            },
            directive(u, f) {
                return f ? (i.directives[u] = f, c) : i.directives[u]
            },
            mount(u, f, d) {
                if (!a) {
                    const m = c._ceVNode || le(r, s);
                    return m.appContext = i, d === !0 ? d = "svg" : d === !1 && (d = void 0), e(m, u, d), a = !0, c._container = u, u.__vue_app__ = c, ur(m.component)
                }
            },
            onUnmount(u) {
                o.push(u)
            },
            unmount() {
                a && (rt(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__)
            },
            provide(u, f) {
                return i.provides[u] = f, c
            },
            runWithContext(u) {
                const f = Gt;
                Gt = c;
                try {
                    return u()
                } finally {
                    Gt = f
                }
            }
        };
        return c
    }
}
let Gt = null;

function ic(e, t) {
    if ($e) {
        let n = $e.provides;
        const r = $e.parent && $e.parent.provides;
        r === n && (n = $e.provides = Object.create(r)), n[e] = t
    }
}

function sr(e, t, n = !1) {
    const r = $e || Ae;
    if (r || Gt) {
        const s = Gt ? Gt._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && ee(t) ? t.call(r && r.proxy) : t
    }
}
const Ui = {},
    Ni = () => Object.create(Ui),
    Bi = e => Object.getPrototypeOf(e) === Ui;

function lc(e, t, n, r = !1) {
    const s = {},
        i = Ni();
    e.propsDefaults = Object.create(null), Vi(e, t, s, i);
    for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
    n ? e.props = r ? s : Aa(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i
}

function oc(e, t, n, r) {
    const {
        props: s,
        attrs: i,
        vnode: {
            patchFlag: l
        }
    } = e, o = Q(s), [a] = e.propsOptions;
    let c = !1;
    if ((r || l > 0) && !(l & 16)) {
        if (l & 8) {
            const u = e.vnode.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                let d = u[f];
                if (ir(e.emitsOptions, d)) continue;
                const m = t[d];
                if (a)
                    if (X(i, d)) m !== i[d] && (i[d] = m, c = !0);
                    else {
                        const x = ze(d);
                        s[x] = ns(a, o, x, m, e, !1)
                    }
                else m !== i[d] && (i[d] = m, c = !0)
            }
        }
    } else {
        Vi(e, t, s, i) && (c = !0);
        let u;
        for (const f in o)(!t || !X(t, f) && ((u = kt(f)) === f || !X(t, u))) && (a ? n && (n[f] !== void 0 || n[u] !== void 0) && (s[f] = ns(a, o, f, void 0, e, !0)) : delete s[f]);
        if (i !== o)
            for (const f in i)(!t || !X(t, f)) && (delete i[f], c = !0)
    }
    c && et(e.attrs, "set", "")
}

function Vi(e, t, n, r) {
    const [s, i] = e.propsOptions;
    let l = !1,
        o;
    if (t)
        for (let a in t) {
            if (sn(a)) continue;
            const c = t[a];
            let u;
            s && X(s, u = ze(a)) ? !i || !i.includes(u) ? n[u] = c : (o || (o = {}))[u] = c : ir(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = !0)
        }
    if (i) {
        const a = Q(n),
            c = o || ie;
        for (let u = 0; u < i.length; u++) {
            const f = i[u];
            n[f] = ns(s, a, f, c[f], e, !X(c, f))
        }
    }
    return l
}

function ns(e, t, n, r, s, i) {
    const l = e[n];
    if (l != null) {
        const o = X(l, "default");
        if (o && r === void 0) {
            const a = l.default;
            if (l.type !== Function && !l.skipFactory && ee(a)) {
                const {
                    propsDefaults: c
                } = s;
                if (n in c) r = c[n];
                else {
                    const u = as(s);
                    r = c[n] = a.call(null, t), u()
                }
            } else r = a;
            s.ce && s.ce._setProp(n, r)
        }
        l[0] && (i && !o ? r = !1 : l[1] && (r === "" || r === kt(n)) && (r = !0))
    }
    return r
}

function ac(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const i = e.props,
        l = {},
        o = [];
    if (!i) return he(e) && r.set(e, Ft), Ft;
    if (q(i))
        for (let c = 0; c < i.length; c++) {
            const u = ze(i[c]);
            Wi(u) && (l[u] = ie)
        } else if (i)
            for (const c in i) {
                const u = ze(c);
                if (Wi(u)) {
                    const f = i[c],
                        d = l[u] = q(f) || ee(f) ? {
                            type: f
                        } : je({}, f),
                        m = d.type;
                    let x = !1,
                        b = !0;
                    if (q(m))
                        for (let T = 0; T < m.length; ++T) {
                            const w = m[T],
                                C = ee(w) && w.name;
                            if (C === "Boolean") {
                                x = !0;
                                break
                            } else C === "String" && (b = !1)
                        } else x = ee(m) && m.name === "Boolean";
                    d[0] = x, d[1] = b, (x || X(d, "default")) && o.push(u)
                }
            }
    const a = [l, o];
    return he(e) && r.set(e, a), a
}

function Wi(e) {
    return e[0] !== "$" && !sn(e)
}
const qi = e => e[0] === "_" || e === "$stable",
    rs = e => q(e) ? e.map(Ze) : [Ze(e)],
    cc = (e, t, n) => {
        if (t._n) return t;
        const r = Wa((...s) => rs(t(...s)), n);
        return r._c = !1, r
    },
    Ki = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (qi(s)) continue;
            const i = e[s];
            if (ee(i)) t[s] = cc(s, i, r);
            else if (i != null) {
                const l = rs(i);
                t[s] = () => l
            }
        }
    },
    Gi = (e, t) => {
        const n = rs(t);
        e.slots.default = () => n
    },
    Zi = (e, t, n) => {
        for (const r in t)(n || r !== "_") && (e[r] = t[r])
    },
    uc = (e, t, n) => {
        const r = e.slots = Ni();
        if (e.vnode.shapeFlag & 32) {
            const s = t._;
            s ? (Zi(r, t, n), n && ci(r, "_", s, !0)) : Ki(t, r)
        } else t && Gi(e, t)
    },
    fc = (e, t, n) => {
        const {
            vnode: r,
            slots: s
        } = e;
        let i = !0,
            l = ie;
        if (r.shapeFlag & 32) {
            const o = t._;
            o ? n && o === 1 ? i = !1 : Zi(s, t, n) : (i = !t.$stable, Ki(t, s)), l = t
        } else t && (Gi(e, t), l = {
            default: 1
        });
        if (i)
            for (const o in s) !qi(o) && l[o] == null && delete s[o]
    };

function hc() {
    typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (ln().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1)
}
const Ie = $c;

function pc(e) {
    return dc(e)
}

function dc(e, t) {
    hc();
    const n = ln();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: i,
        createElement: l,
        createText: o,
        createComment: a,
        setText: c,
        setElementText: u,
        parentNode: f,
        nextSibling: d,
        setScopeId: m = wt,
        insertStaticContent: x
    } = e, b = (h, p, g, y = null, k = null, v = null, A = void 0, S = null, $ = !!p.dynamicChildren) => {
        if (h === p) return;
        h && !xn(h, p) && (y = bt(h), Ue(h, k, v, !0), h = null), p.patchFlag === -2 && ($ = !1, p.dynamicChildren = null);
        const {
            type: _,
            ref: U,
            shapeFlag: M
        } = p;
        switch (_) {
            case lr:
                T(h, p, g, y);
                break;
            case It:
                w(h, p, g, y);
                break;
            case is:
                h == null && C(p, g, y, A);
                break;
            case fe:
                B(h, p, g, y, k, v, A, S, $);
                break;
            default:
                M & 1 ? O(h, p, g, y, k, v, A, S, $) : M & 6 ? F(h, p, g, y, k, v, A, S, $) : (M & 64 || M & 128) && _.process(h, p, g, y, k, v, A, S, $, R)
        }
        U != null && k && rr(U, h && h.ref, v, p || h, !p)
    }, T = (h, p, g, y) => {
        if (h == null) r(p.el = o(p.children), g, y);
        else {
            const k = p.el = h.el;
            p.children !== h.children && c(k, p.children)
        }
    }, w = (h, p, g, y) => {
        h == null ? r(p.el = a(p.children || ""), g, y) : p.el = h.el
    }, C = (h, p, g, y) => {
        [h.el, h.anchor] = x(h.children, p, g, y, h.el, h.anchor)
    }, N = ({
        el: h,
        anchor: p
    }, g, y) => {
        let k;
        for (; h && h !== p;) k = d(h), r(h, g, y), h = k;
        r(p, g, y)
    }, I = ({
        el: h,
        anchor: p
    }) => {
        let g;
        for (; h && h !== p;) g = d(h), s(h), h = g;
        s(p)
    }, O = (h, p, g, y, k, v, A, S, $) => {
        p.type === "svg" ? A = "svg" : p.type === "math" && (A = "mathml"), h == null ? G(p, g, y, k, v, A, S, $) : ae(h, p, k, v, A, S, $)
    }, G = (h, p, g, y, k, v, A, S) => {
        let $, _;
        const {
            props: U,
            shapeFlag: M,
            transition: H,
            dirs: V
        } = h;
        if ($ = h.el = l(h.type, v, U && U.is, U), M & 8 ? u($, h.children) : M & 16 && oe(h.children, $, null, y, k, ss(h, v), A, S), V && Et(h, null, y, "created"), j($, h, h.scopeId, A, y), U) {
            for (const re in U) re !== "value" && !sn(re) && i($, re, null, U[re], v, y);
            "value" in U && i($, "value", null, U.value, v), (_ = U.onVnodeBeforeMount) && Je(_, y, h)
        }
        V && Et(h, null, y, "beforeMount");
        const Z = gc(k, H);
        Z && H.beforeEnter($), r($, p, g), ((_ = U && U.onVnodeMounted) || Z || V) && Ie(() => {
            _ && Je(_, y, h), Z && H.enter($), V && Et(h, null, y, "mounted")
        }, k)
    }, j = (h, p, g, y, k) => {
        if (g && m(h, g), y)
            for (let v = 0; v < y.length; v++) m(h, y[v]);
        if (k) {
            let v = k.subTree;
            if (p === v || rl(v.type) && (v.ssContent === p || v.ssFallback === p)) {
                const A = k.vnode;
                j(h, A, A.scopeId, A.slotScopeIds, k.parent)
            }
        }
    }, oe = (h, p, g, y, k, v, A, S, $ = 0) => {
        for (let _ = $; _ < h.length; _++) {
            const U = h[_] = S ? gt(h[_]) : Ze(h[_]);
            b(null, U, p, g, y, k, v, A, S)
        }
    }, ae = (h, p, g, y, k, v, A) => {
        const S = p.el = h.el;
        let {
            patchFlag: $,
            dynamicChildren: _,
            dirs: U
        } = p;
        $ |= h.patchFlag & 16;
        const M = h.props || ie,
            H = p.props || ie;
        let V;
        if (g && Tt(g, !1), (V = H.onVnodeBeforeUpdate) && Je(V, g, p, h), U && Et(p, h, g, "beforeUpdate"), g && Tt(g, !0), (M.innerHTML && H.innerHTML == null || M.textContent && H.textContent == null) && u(S, ""), _ ? Me(h.dynamicChildren, _, S, g, y, ss(p, k), v) : A || ut(h, p, S, null, g, y, ss(p, k), v, !1), $ > 0) {
            if ($ & 16) E(S, M, H, g, k);
            else if ($ & 2 && M.class !== H.class && i(S, "class", null, H.class, k), $ & 4 && i(S, "style", M.style, H.style, k), $ & 8) {
                const Z = p.dynamicProps;
                for (let re = 0; re < Z.length; re++) {
                    const ce = Z[re],
                        Pe = M[ce],
                        _e = H[ce];
                    (_e !== Pe || ce === "value") && i(S, ce, Pe, _e, k, g)
                }
            }
            $ & 1 && h.children !== p.children && u(S, p.children)
        } else !A && _ == null && E(S, M, H, g, k);
        ((V = H.onVnodeUpdated) || U) && Ie(() => {
            V && Je(V, g, p, h), U && Et(p, h, g, "updated")
        }, y)
    }, Me = (h, p, g, y, k, v, A) => {
        for (let S = 0; S < p.length; S++) {
            const $ = h[S],
                _ = p[S],
                U = $.el && ($.type === fe || !xn($, _) || $.shapeFlag & 70) ? f($.el) : g;
            b($, _, U, null, y, k, v, A, !0)
        }
    }, E = (h, p, g, y, k) => {
        if (p !== g) {
            if (p !== ie)
                for (const v in p) !sn(v) && !(v in g) && i(h, v, p[v], null, k, y);
            for (const v in g) {
                if (sn(v)) continue;
                const A = g[v],
                    S = p[v];
                A !== S && v !== "value" && i(h, v, S, A, k, y)
            }
            "value" in g && i(h, "value", p.value, g.value, k)
        }
    }, B = (h, p, g, y, k, v, A, S, $) => {
        const _ = p.el = h ? h.el : o(""),
            U = p.anchor = h ? h.anchor : o("");
        let {
            patchFlag: M,
            dynamicChildren: H,
            slotScopeIds: V
        } = p;
        V && (S = S ? S.concat(V) : V), h == null ? (r(_, g, y), r(U, g, y), oe(p.children || [], g, U, k, v, A, S, $)) : M > 0 && M & 64 && H && h.dynamicChildren ? (Me(h.dynamicChildren, H, g, k, v, A, S), (p.key != null || k && p === k.subTree) && Ji(h, p, !0)) : ut(h, p, g, U, k, v, A, S, $)
    }, F = (h, p, g, y, k, v, A, S, $) => {
        p.slotScopeIds = S, h == null ? p.shapeFlag & 512 ? k.ctx.activate(p, g, y, A, $) : de(p, g, y, k, v, A, $) : we(h, p, $)
    }, de = (h, p, g, y, k, v, A) => {
        const S = h.component = Mc(h, y, k);
        if (Za(h) && (S.ctx.renderer = R), Pc(S, !1, A), S.asyncDep) {
            if (k && k.registerDep(S, be, A), !h.el) {
                const $ = S.subTree = le(It);
                w(null, $, p, g)
            }
        } else be(S, h, p, g, k, v, A)
    }, we = (h, p, g) => {
        const y = p.component = h.component;
        if (Cc(h, p, g))
            if (y.asyncDep && !y.asyncResolved) {
                Qe(y, p, g);
                return
            } else y.next = p, y.update();
        else p.el = h.el, y.vnode = p
    }, be = (h, p, g, y, k, v, A) => {
        const S = () => {
            if (h.isMounted) {
                let {
                    next: M,
                    bu: H,
                    u: V,
                    parent: Z,
                    vnode: re
                } = h;
                {
                    const en = Yi(h);
                    if (en) {
                        M && (M.el = re.el, Qe(h, M, A)), en.asyncDep.then(() => {
                            h.isUnmounted || S()
                        });
                        return
                    }
                }
                let ce = M,
                    Pe;
                Tt(h, !1), M ? (M.el = re.el, Qe(h, M, A)) : M = re, H && Vn(H), (Pe = M.props && M.props.onVnodeBeforeUpdate) && Je(Pe, Z, M, re), Tt(h, !0);
                const _e = tl(h),
                    Oe = h.subTree;
                h.subTree = _e, b(Oe, _e, f(Oe.el), bt(Oe), h, k, v), M.el = _e.el, ce === null && Sc(h, _e.el), V && Ie(V, k), (Pe = M.props && M.props.onVnodeUpdated) && Ie(() => Je(Pe, Z, M, re), k)
            } else {
                let M;
                const {
                    props: H
                } = p, {
                    bm: V,
                    m: Z,
                    parent: re,
                    root: ce,
                    type: Pe
                } = h, _e = vn(p);
                Tt(h, !1), V && Vn(V), !_e && (M = H && H.onVnodeBeforeMount) && Je(M, re, p), Tt(h, !0);
                {
                    ce.ce && ce.ce._injectChildStyle(Pe);
                    const Oe = h.subTree = tl(h);
                    b(null, Oe, g, y, h, k, v), p.el = Oe.el
                }
                if (Z && Ie(Z, k), !_e && (M = H && H.onVnodeMounted)) {
                    const Oe = p;
                    Ie(() => Je(M, re, Oe), k)
                }(p.shapeFlag & 256 || re && vn(re.vnode) && re.vnode.shapeFlag & 256) && h.a && Ie(h.a, k), h.isMounted = !0, p = g = y = null
            }
        };
        h.scope.on();
        const $ = h.effect = new gi(S);
        h.scope.off();
        const _ = h.update = $.run.bind($),
            U = h.job = $.runIfDirty.bind($);
        U.i = h, U.id = h.uid, $.scheduler = () => Jr(U), Tt(h, !0), _()
    }, Qe = (h, p, g) => {
        p.component = h;
        const y = h.vnode.props;
        h.vnode = p, h.next = null, oc(h, p.props, y, g), fc(h, p.children, g), _t(), Oi(h), Ct()
    }, ut = (h, p, g, y, k, v, A, S, $ = !1) => {
        const _ = h && h.children,
            U = h ? h.shapeFlag : 0,
            M = p.children,
            {
                patchFlag: H,
                shapeFlag: V
            } = p;
        if (H > 0) {
            if (H & 128) {
                Pn(_, M, g, y, k, v, A, S, $);
                return
            } else if (H & 256) {
                Xt(_, M, g, y, k, v, A, S, $);
                return
            }
        }
        V & 8 ? (U & 16 && vt(_, k, v), M !== _ && u(g, M)) : U & 16 ? V & 16 ? Pn(_, M, g, y, k, v, A, S, $) : vt(_, k, v, !0) : (U & 8 && u(g, ""), V & 16 && oe(M, g, y, k, v, A, S, $))
    }, Xt = (h, p, g, y, k, v, A, S, $) => {
        h = h || Ft, p = p || Ft;
        const _ = h.length,
            U = p.length,
            M = Math.min(_, U);
        let H;
        for (H = 0; H < M; H++) {
            const V = p[H] = $ ? gt(p[H]) : Ze(p[H]);
            b(h[H], V, g, null, k, v, A, S, $)
        }
        _ > U ? vt(h, k, v, !0, !1, M) : oe(p, g, y, k, v, A, S, $, M)
    }, Pn = (h, p, g, y, k, v, A, S, $) => {
        let _ = 0;
        const U = p.length;
        let M = h.length - 1,
            H = U - 1;
        for (; _ <= M && _ <= H;) {
            const V = h[_],
                Z = p[_] = $ ? gt(p[_]) : Ze(p[_]);
            if (xn(V, Z)) b(V, Z, g, null, k, v, A, S, $);
            else break;
            _++
        }
        for (; _ <= M && _ <= H;) {
            const V = h[M],
                Z = p[H] = $ ? gt(p[H]) : Ze(p[H]);
            if (xn(V, Z)) b(V, Z, g, null, k, v, A, S, $);
            else break;
            M--, H--
        }
        if (_ > M) {
            if (_ <= H) {
                const V = H + 1,
                    Z = V < U ? p[V].el : y;
                for (; _ <= H;) b(null, p[_] = $ ? gt(p[_]) : Ze(p[_]), g, Z, k, v, A, S, $), _++
            }
        } else if (_ > H)
            for (; _ <= M;) Ue(h[_], k, v, !0), _++;
        else {
            const V = _,
                Z = _,
                re = new Map;
            for (_ = Z; _ <= H; _++) {
                const Ee = p[_] = $ ? gt(p[_]) : Ze(p[_]);
                Ee.key != null && re.set(Ee.key, _)
            }
            let ce, Pe = 0;
            const _e = H - Z + 1;
            let Oe = !1,
                en = 0;
            const tn = new Array(_e);
            for (_ = 0; _ < _e; _++) tn[_] = 0;
            for (_ = V; _ <= M; _++) {
                const Ee = h[_];
                if (Pe >= _e) {
                    Ue(Ee, k, v, !0);
                    continue
                }
                let We;
                if (Ee.key != null) We = re.get(Ee.key);
                else
                    for (ce = Z; ce <= H; ce++)
                        if (tn[ce - Z] === 0 && xn(Ee, p[ce])) {
                            We = ce;
                            break
                        } We === void 0 ? Ue(Ee, k, v, !0) : (tn[We - Z] = _ + 1, We >= en ? en = We : Oe = !0, b(Ee, p[We], g, null, k, v, A, S, $), Pe++)
            }
            const As = Oe ? mc(tn) : Ft;
            for (ce = As.length - 1, _ = _e - 1; _ >= 0; _--) {
                const Ee = Z + _,
                    We = p[Ee],
                    Es = Ee + 1 < U ? p[Ee + 1].el : y;
                tn[_] === 0 ? b(null, We, g, Es, k, v, A, S, $) : Oe && (ce < 0 || _ !== As[ce] ? Ot(We, g, Es, 2) : ce--)
            }
        }
    }, Ot = (h, p, g, y, k = null) => {
        const {
            el: v,
            type: A,
            transition: S,
            children: $,
            shapeFlag: _
        } = h;
        if (_ & 6) {
            Ot(h.component.subTree, p, g, y);
            return
        }
        if (_ & 128) {
            h.suspense.move(p, g, y);
            return
        }
        if (_ & 64) {
            A.move(h, p, g, R);
            return
        }
        if (A === fe) {
            r(v, p, g);
            for (let M = 0; M < $.length; M++) Ot($[M], p, g, y);
            r(h.anchor, p, g);
            return
        }
        if (A === is) {
            N(h, p, g);
            return
        }
        if (y !== 2 && _ & 1 && S)
            if (y === 0) S.beforeEnter(v), r(v, p, g), Ie(() => S.enter(v), k);
            else {
                const {
                    leave: M,
                    delayLeave: H,
                    afterLeave: V
                } = S, Z = () => r(v, p, g), re = () => {
                    M(v, () => {
                        Z(), V && V()
                    })
                };
                H ? H(v, Z, re) : re()
            }
        else r(v, p, g)
    }, Ue = (h, p, g, y = !1, k = !1) => {
        const {
            type: v,
            props: A,
            ref: S,
            children: $,
            dynamicChildren: _,
            shapeFlag: U,
            patchFlag: M,
            dirs: H,
            cacheIndex: V
        } = h;
        if (M === -2 && (k = !1), S != null && rr(S, null, g, h, !0), V != null && (p.renderCache[V] = void 0), U & 256) {
            p.ctx.deactivate(h);
            return
        }
        const Z = U & 1 && H,
            re = !vn(h);
        let ce;
        if (re && (ce = A && A.onVnodeBeforeUnmount) && Je(ce, p, h), U & 6) jn(h.component, g, y);
        else {
            if (U & 128) {
                h.suspense.unmount(g, y);
                return
            }
            Z && Et(h, null, p, "beforeUnmount"), U & 64 ? h.type.remove(h, p, g, R, y) : _ && !_.hasOnce && (v !== fe || M > 0 && M & 64) ? vt(_, p, g, !1, !0) : (v === fe && M & 384 || !k && U & 16) && vt($, p, g), y && On(h)
        }(re && (ce = A && A.onVnodeUnmounted) || Z) && Ie(() => {
            ce && Je(ce, p, h), Z && Et(h, null, p, "unmounted")
        }, g)
    }, On = h => {
        const {
            type: p,
            el: g,
            anchor: y,
            transition: k
        } = h;
        if (p === fe) {
            $r(g, y);
            return
        }
        if (p === is) {
            I(h);
            return
        }
        const v = () => {
            s(g), k && !k.persisted && k.afterLeave && k.afterLeave()
        };
        if (h.shapeFlag & 1 && k && !k.persisted) {
            const {
                leave: A,
                delayLeave: S
            } = k, $ = () => A(g, v);
            S ? S(h.el, v, $) : $()
        } else v()
    }, $r = (h, p) => {
        let g;
        for (; h !== p;) g = d(h), s(h), h = g;
        s(p)
    }, jn = (h, p, g) => {
        const {
            bum: y,
            scope: k,
            job: v,
            subTree: A,
            um: S,
            m: $,
            a: _
        } = h;
        Qi($), Qi(_), y && Vn(y), k.stop(), v && (v.flags |= 8, Ue(A, h, p, g)), S && Ie(S, p), Ie(() => {
            h.isUnmounted = !0
        }, p), p && p.pendingBranch && !p.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve())
    }, vt = (h, p, g, y = !1, k = !1, v = 0) => {
        for (let A = v; A < h.length; A++) Ue(h[A], p, g, y, k)
    }, bt = h => {
        if (h.shapeFlag & 6) return bt(h.component.subTree);
        if (h.shapeFlag & 128) return h.suspense.next();
        const p = d(h.anchor || h.el),
            g = p && p[qa];
        return g ? d(g) : p
    };
    let jt = !1;
    const z = (h, p, g) => {
            h == null ? p._vnode && Ue(p._vnode, null, null, !0) : b(p._vnode || null, h, p, null, null, null, g), p._vnode = h, jt || (jt = !0, Oi(), ji(), jt = !1)
        },
        R = {
            p: b,
            um: Ue,
            m: Ot,
            r: On,
            mt: de,
            mc: oe,
            pc: ut,
            pbc: Me,
            n: bt,
            o: e
        };
    return {
        render: z,
        hydrate: void 0,
        createApp: sc(z)
    }
}

function ss({
    type: e,
    props: t
}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function Tt({
    effect: e,
    job: t
}, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5)
}

function gc(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function Ji(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (q(r) && q(s))
        for (let i = 0; i < r.length; i++) {
            const l = r[i];
            let o = s[i];
            o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = s[i] = gt(s[i]), o.el = l.el), !n && o.patchFlag !== -2 && Ji(l, o)), o.type === lr && (o.el = l.el)
        }
}

function mc(e) {
    const t = e.slice(),
        n = [0];
    let r, s, i, l, o;
    const a = e.length;
    for (r = 0; r < a; r++) {
        const c = e[r];
        if (c !== 0) {
            if (s = n[n.length - 1], e[s] < c) {
                t[r] = s, n.push(r);
                continue
            }
            for (i = 0, l = n.length - 1; i < l;) o = i + l >> 1, e[n[o]] < c ? i = o + 1 : l = o;
            c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
        }
    }
    for (i = n.length, l = n[i - 1]; i-- > 0;) n[i] = l, l = t[l];
    return n
}

function Yi(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Yi(t)
}

function Qi(e) {
    if (e)
        for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
const vc = Symbol.for("v-scx"),
    bc = () => sr(vc);

function Xi(e, t) {
    return el(e, null, t)
}

function dt(e, t, n) {
    return el(e, t, n)
}

function el(e, t, n = ie) {
    const {
        immediate: r,
        flush: s
    } = n, i = je({}, n), l = t && r || !t && s !== "post";
    let o;
    if (_n) {
        if (s === "sync") {
            const f = bc();
            o = f.__watcherHandles || (f.__watcherHandles = [])
        } else if (!l) {
            const f = () => {};
            return f.stop = wt, f.resume = wt, f.pause = wt, f
        }
    }
    const a = $e;
    i.call = (f, d, m) => rt(f, a, d, m);
    let c = !1;
    s === "post" ? i.scheduler = f => {
        Ie(f, a && a.suspense)
    } : s !== "sync" && (c = !0, i.scheduler = (f, d) => {
        d ? f() : Jr(f)
    }), i.augmentJob = f => {
        t && (f.flags |= 4), c && (f.flags |= 2, a && (f.id = a.uid, f.i = a))
    };
    const u = Ua(e, t, i);
    return _n && (o ? o.push(u) : l && u()), u
}
const yc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ze(t)}Modifiers`] || e[`${kt(t)}Modifiers`];

function wc(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || ie;
    let s = n;
    const i = t.startsWith("update:"),
        l = i && yc(r, t.slice(7));
    l && (l.trim && (s = n.map(u => ye(u) ? u.trim() : u)), l.number && (s = n.map(Wn)));
    let o, a = r[o = Pr(t)] || r[o = Pr(ze(t))];
    !a && i && (a = r[o = Pr(kt(t))]), a && rt(a, e, 6, s);
    const c = r[o + "Once"];
    if (c) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[o]) return;
        e.emitted[o] = !0, rt(c, e, 6, s)
    }
}

function kc(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const i = e.emits;
    let l = {};
    return i ? (q(i) ? i.forEach(o => l[o] = null) : je(l, i), he(e) && r.set(e, l), l) : (he(e) && r.set(e, null), null)
}

function ir(e, t) {
    return !e || !Un(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, kt(t)) || X(e, t))
}

function tl(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        propsOptions: [i],
        slots: l,
        attrs: o,
        emit: a,
        render: c,
        renderCache: u,
        props: f,
        data: d,
        setupState: m,
        ctx: x,
        inheritAttrs: b
    } = e, T = tr(e);
    let w, C;
    try {
        if (n.shapeFlag & 4) {
            const I = s || r,
                O = I;
            w = Ze(c.call(O, I, u, f, m, d, x)), C = o
        } else {
            const I = t;
            w = Ze(I.length > 1 ? I(f, {
                attrs: o,
                slots: l,
                emit: a
            }) : I(f, null)), C = t.props ? o : xc(o)
        }
    } catch (I) {
        wn.length = 0, Xn(I, e, 1), w = le(It)
    }
    let N = w;
    if (C && b !== !1) {
        const I = Object.keys(C),
            {
                shapeFlag: O
            } = N;
        I.length && O & 7 && (i && I.some(Lr) && (C = _c(C, i)), N = Zt(N, C, !1, !0))
    }
    return n.dirs && (N = Zt(N, null, !1, !0), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && Yr(N, n.transition), w = N, tr(T), w
}
const xc = e => {
        let t;
        for (const n in e)(n === "class" || n === "style" || Un(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    _c = (e, t) => {
        const n = {};
        for (const r in e)(!Lr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };

function Cc(e, t, n) {
    const {
        props: r,
        children: s,
        component: i
    } = e, {
        props: l,
        children: o,
        patchFlag: a
    } = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return r ? nl(r, l, c) : !!l;
        if (a & 8) {
            const u = t.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                const d = u[f];
                if (l[d] !== r[d] && !ir(c, d)) return !0
            }
        }
    } else return (s || o) && (!o || !o.$stable) ? !0 : r === l ? !1 : r ? l ? nl(r, l, c) : !0 : !!l;
    return !1
}

function nl(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const i = r[s];
        if (t[i] !== e[i] && !ir(n, i)) return !0
    }
    return !1
}

function Sc({
    vnode: e,
    parent: t
}, n) {
    for (; t;) {
        const r = t.subTree;
        if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)(e = t.vnode).el = n, t = t.parent;
        else break
    }
}
const rl = e => e.__isSuspense;

function $c(e, t) {
    t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Va(e)
}
const fe = Symbol.for("v-fgt"),
    lr = Symbol.for("v-txt"),
    It = Symbol.for("v-cmt"),
    is = Symbol.for("v-stc"),
    wn = [];
let Le = null;

function L(e = !1) {
    wn.push(Le = e ? null : [])
}

function Rc() {
    wn.pop(), Le = wn[wn.length - 1] || null
}
let kn = 1;

function sl(e, t = !1) {
    kn += e, e < 0 && Le && t && (Le.hasOnce = !0)
}

function il(e) {
    return e.dynamicChildren = kn > 0 ? Le || Ft : null, Rc(), kn > 0 && Le && Le.push(e), e
}

function P(e, t, n, r, s, i) {
    return il(D(e, t, n, r, s, i, !0))
}

function st(e, t, n, r, s) {
    return il(le(e, t, n, r, s, !0))
}

function or(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function xn(e, t) {
    return e.type === t.type && e.key === t.key
}
const ll = ({
        key: e
    }) => e ?? null,
    ar = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? ye(e) || ve(e) || ee(e) ? {
        i: Ae,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function D(e, t = null, n = null, r = 0, s = null, i = e === fe ? 0 : 1, l = !1, o = !1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ll(t),
        ref: t && ar(t),
        scopeId: Di,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: Ae
    };
    return o ? (ls(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16), kn > 0 && !l && Le && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Le.push(a), a
}
const le = Ac;

function Ac(e, t = null, n = null, r = 0, s = null, i = !1) {
    if ((!e || e === ec) && (e = It), or(e)) {
        const o = Zt(e, t, !0);
        return n && ls(o, n), kn > 0 && !i && Le && (o.shapeFlag & 6 ? Le[Le.indexOf(e)] = o : Le.push(o)), o.patchFlag = -2, o
    }
    if (Fc(e) && (e = e.__vccOpts), t) {
        t = Ec(t);
        let {
            class: o,
            style: a
        } = t;
        o && !ye(o) && (t.class = me(o)), he(a) && (Gr(a) && !q(a) && (a = je({}, a)), t.style = on(a))
    }
    const l = ye(e) ? 1 : rl(e) ? 128 : Ka(e) ? 64 : he(e) ? 4 : ee(e) ? 2 : 0;
    return D(e, t, n, r, s, l, i, !0)
}

function Ec(e) {
    return e ? Gr(e) || Bi(e) ? je({}, e) : e : null
}

function Zt(e, t, n = !1, r = !1) {
    const {
        props: s,
        ref: i,
        patchFlag: l,
        children: o,
        transition: a
    } = e, c = t ? Tc(s || {}, t) : s, u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && ll(c),
        ref: t && t.ref ? n && i ? q(i) ? i.concat(ar(t)) : [i, ar(t)] : ar(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== fe ? l === -1 ? 16 : l | 16 : l,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: a,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Zt(e.ssContent),
        ssFallback: e.ssFallback && Zt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return a && r && Yr(u, a.clone(u)), u
}

function it(e = " ", t = 0) {
    return le(lr, null, e, t)
}

function J(e = "", t = !1) {
    return t ? (L(), st(It, null, e)) : le(It, null, e)
}

function Ze(e) {
    return e == null || typeof e == "boolean" ? le(It) : q(e) ? le(fe, null, e.slice()) : or(e) ? gt(e) : le(lr, null, String(e))
}

function gt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Zt(e)
}

function ls(e, t) {
    let n = 0;
    const {
        shapeFlag: r
    } = e;
    if (t == null) t = null;
    else if (q(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), ls(e, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !Bi(t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else ee(t) ? (t = {
        default: t,
        _ctx: Ae
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [it(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Tc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = me([t.class, r.class]));
            else if (s === "style") t.style = on([t.style, r.style]);
        else if (Un(s)) {
            const i = t[s],
                l = r[s];
            l && i !== l && !(q(i) && i.includes(l)) && (t[s] = i ? [].concat(i, l) : l)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function Je(e, t, n, r = null) {
    rt(e, t, 7, [n, r])
}
const Ic = Hi();
let Lc = 0;

function Mc(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || Ic,
        i = {
            uid: Lc++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new oa(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            ids: t ? t.ids : ["", 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: ac(r, s),
            emitsOptions: kc(r, s),
            emit: null,
            emitted: null,
            propsDefaults: ie,
            inheritAttrs: r.inheritAttrs,
            ctx: ie,
            data: ie,
            props: ie,
            attrs: ie,
            slots: ie,
            refs: ie,
            setupState: ie,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return i.ctx = {
        _: i
    }, i.root = t ? t.root : i, i.emit = wc.bind(null, i), e.ce && e.ce(i), i
}
let $e = null;
const ol = () => $e || Ae;
let cr, os;
{
    const e = ln(),
        t = (n, r) => {
            let s;
            return (s = e[n]) || (s = e[n] = []), s.push(r), i => {
                s.length > 1 ? s.forEach(l => l(i)) : s[0](i)
            }
        };
    cr = t("__VUE_INSTANCE_SETTERS__", n => $e = n), os = t("__VUE_SSR_SETTERS__", n => _n = n)
}
const as = e => {
        const t = $e;
        return cr(e), e.scope.on(), () => {
            e.scope.off(), cr(t)
        }
    },
    al = () => {
        $e && $e.scope.off(), cr(null)
    };

function cl(e) {
    return e.vnode.shapeFlag & 4
}
let _n = !1;

function Pc(e, t = !1, n = !1) {
    t && os(t);
    const {
        props: r,
        children: s
    } = e.vnode, i = cl(e);
    lc(e, r, i, t), uc(e, s, n);
    const l = i ? Oc(e, t) : void 0;
    return t && os(!1), l
}

function Oc(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, nc);
    const {
        setup: r
    } = n;
    if (r) {
        _t();
        const s = e.setupContext = r.length > 1 ? zc(e) : null,
            i = as(e),
            l = dn(r, e, 0, [e.props, s]),
            o = li(l);
        if (Ct(), i(), (o || e.sp) && !vn(e) && Ga(e), o) {
            if (l.then(al, al), t) return l.then(a => {
                ul(e, a, t)
            }).catch(a => {
                Xn(a, e, 0)
            });
            e.asyncDep = l
        } else ul(e, l, t)
    } else hl(e, t)
}

function ul(e, t, n) {
    ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) && (e.setupState = Li(t)), hl(e, n)
}
let fl;

function hl(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && fl && !r.render) {
            const s = r.template || !1;
            if (s) {
                const {
                    isCustomElement: i,
                    compilerOptions: l
                } = e.appContext.config, {
                    delimiters: o,
                    compilerOptions: a
                } = r, c = je(je({
                    isCustomElement: i,
                    delimiters: o
                }, l), a);
                r.render = fl(s, c)
            }
        }
        e.render = r.render || wt
    }
}
const jc = {
    get(e, t) {
        return ke(e, "get", ""), e[t]
    }
};

function zc(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        attrs: new Proxy(e.attrs, jc),
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function ur(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Li(Ea(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in yn) return yn[n](e)
        },
        has(t, n) {
            return n in t || n in yn
        }
    })) : e.proxy
}

function Dc(e, t = !0) {
    return ee(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Fc(e) {
    return ee(e) && "__vccOpts" in e
}
const ge = (e, t) => Fa(e, t, _n);

function te(e, t, n) {
    const r = arguments.length;
    return r === 2 ? he(t) && !q(t) ? or(t) ? le(e, null, [t]) : le(e, t) : le(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && or(n) && (n = [n]), le(e, t, n))
}
const Hc = "3.5.13";
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let cs;
const pl = typeof window < "u" && window.trustedTypes;
if (pl) try {
    cs = pl.createPolicy("vue", {
        createHTML: e => e
    })
} catch {}
const dl = cs ? e => cs.createHTML(e) : e => e,
    Uc = "http://www.w3.org/2000/svg",
    Nc = "http://www.w3.org/1998/Math/MathML",
    lt = typeof document < "u" ? document : null,
    gl = lt && lt.createElement("template"),
    Bc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t === "svg" ? lt.createElementNS(Uc, e) : t === "mathml" ? lt.createElementNS(Nc, e) : n ? lt.createElement(e, {
                is: n
            }) : lt.createElement(e);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => lt.createTextNode(e),
        createComment: e => lt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => lt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, i) {
            const l = n ? n.previousSibling : t.lastChild;
            if (s && (s === i || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)););
            else {
                gl.innerHTML = dl(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
                const o = gl.content;
                if (r === "svg" || r === "mathml") {
                    const a = o.firstChild;
                    for (; a.firstChild;) o.appendChild(a.firstChild);
                    o.removeChild(a)
                }
                t.insertBefore(o, n)
            }
            return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    Vc = Symbol("_vtc");

function Wc(e, t, n) {
    const r = e[Vc];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const fr = Symbol("_vod"),
    ml = Symbol("_vsh"),
    vl = {
        beforeMount(e, {
            value: t
        }, {
            transition: n
        }) {
            e[fr] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Cn(e, t)
        },
        mounted(e, {
            value: t
        }, {
            transition: n
        }) {
            n && t && n.enter(e)
        },
        updated(e, {
            value: t,
            oldValue: n
        }, {
            transition: r
        }) {
            !t != !n && (r ? t ? (r.beforeEnter(e), Cn(e, !0), r.enter(e)) : r.leave(e, () => {
                Cn(e, !1)
            }) : Cn(e, t))
        },
        beforeUnmount(e, {
            value: t
        }) {
            Cn(e, t)
        }
    };

function Cn(e, t) {
    e.style.display = t ? e[fr] : "none", e[ml] = !t
}
const qc = Symbol(""),
    Kc = /(^|;)\s*display\s*:/;

function Gc(e, t, n) {
    const r = e.style,
        s = ye(n);
    let i = !1;
    if (n && !s) {
        if (t)
            if (ye(t))
                for (const l of t.split(";")) {
                    const o = l.slice(0, l.indexOf(":")).trim();
                    n[o] == null && hr(r, o, "")
                } else
                    for (const l in t) n[l] == null && hr(r, l, "");
        for (const l in n) l === "display" && (i = !0), hr(r, l, n[l])
    } else if (s) {
        if (t !== n) {
            const l = r[qc];
            l && (n += ";" + l), r.cssText = n, i = Kc.test(n)
        }
    } else t && e.removeAttribute("style");
    fr in e && (e[fr] = i ? r.display : "", e[ml] && (r.display = "none"))
}
const bl = /\s*!important$/;

function hr(e, t, n) {
    if (q(n)) n.forEach(r => hr(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const r = Zc(e, t);
        bl.test(n) ? e.setProperty(kt(r), n.replace(bl, ""), "important") : e[r] = n
    }
}
const yl = ["Webkit", "Moz", "ms"],
    us = {};

function Zc(e, t) {
    const n = us[t];
    if (n) return n;
    let r = ze(t);
    if (r !== "filter" && r in e) return us[t] = r;
    r = Bn(r);
    for (let s = 0; s < yl.length; s++) {
        const i = yl[s] + r;
        if (i in e) return us[t] = i
    }
    return t
}
const wl = "http://www.w3.org/1999/xlink";

function kl(e, t, n, r, s, i = ia(t)) {
    r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(wl, t.slice(6, t.length)) : e.setAttributeNS(wl, t, n) : n == null || i && !fi(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Ke(n) ? String(n) : n)
}

function xl(e, t, n, r, s) {
    if (t === "innerHTML" || t === "textContent") {
        n != null && (e[t] = t === "innerHTML" ? dl(n) : n);
        return
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
        const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
            a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
        (o !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const o = typeof e[t];
        o === "boolean" ? n = fi(n) : n == null && o === "string" ? (n = "", l = !0) : o === "number" && (n = 0, l = !0)
    }
    try {
        e[t] = n
    } catch {}
    l && e.removeAttribute(s || t)
}

function ot(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function Jc(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
const _l = Symbol("_vei");

function Yc(e, t, n, r, s = null) {
    const i = e[_l] || (e[_l] = {}),
        l = i[t];
    if (r && l) l.value = r;
    else {
        const [o, a] = Qc(t);
        if (r) {
            const c = i[t] = tu(r, s);
            ot(e, o, c, a)
        } else l && (Jc(e, o, l, a), i[t] = void 0)
    }
}
const Cl = /(?:Once|Passive|Capture)$/;

function Qc(e) {
    let t;
    if (Cl.test(e)) {
        t = {};
        let r;
        for (; r = e.match(Cl);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : kt(e.slice(2)), t]
}
let fs = 0;
const Xc = Promise.resolve(),
    eu = () => fs || (Xc.then(() => fs = 0), fs = Date.now());

function tu(e, t) {
    const n = r => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        rt(nu(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = eu(), n
}

function nu(e, t) {
    if (q(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}
const Sl = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    ru = (e, t, n, r, s, i) => {
        const l = s === "svg";
        t === "class" ? Wc(e, r, l) : t === "style" ? Gc(e, n, r) : Un(t) ? Lr(t) || Yc(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : su(e, t, r, l)) ? (xl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && kl(e, t, r, l, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !ye(r)) ? xl(e, ze(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), kl(e, t, r, l))
    };

function su(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Sl(t) && ee(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return Sl(t) && ye(n) ? !1 : t in e
}
const mt = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return q(t) ? n => Vn(t, n) : t
};

function iu(e) {
    e.target.composing = !0
}

function $l(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const He = Symbol("_assign"),
    hs = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: r
            }
        }, s) {
            e[He] = mt(s);
            const i = r || s.props && s.props.type === "number";
            ot(e, t ? "change" : "input", l => {
                if (l.target.composing) return;
                let o = e.value;
                n && (o = o.trim()), i && (o = Wn(o)), e[He](o)
            }), n && ot(e, "change", () => {
                e.value = e.value.trim()
            }), t || (ot(e, "compositionstart", iu), ot(e, "compositionend", $l), ot(e, "change", $l))
        },
        mounted(e, {
            value: t
        }) {
            e.value = t ?? ""
        },
        beforeUpdate(e, {
            value: t,
            oldValue: n,
            modifiers: {
                lazy: r,
                trim: s,
                number: i
            }
        }, l) {
            if (e[He] = mt(l), e.composing) return;
            const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Wn(e.value) : e.value,
                a = t ?? "";
            o !== a && (document.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === a) || (e.value = a))
        }
    },
    lu = {
        deep: !0,
        created(e, t, n) {
            e[He] = mt(n), ot(e, "change", () => {
                const r = e._modelValue,
                    s = Jt(e),
                    i = e.checked,
                    l = e[He];
                if (q(r)) {
                    const o = Or(r, s),
                        a = o !== -1;
                    if (i && !a) l(r.concat(s));
                    else if (!i && a) {
                        const c = [...r];
                        c.splice(o, 1), l(c)
                    }
                } else if (Ut(r)) {
                    const o = new Set(r);
                    i ? o.add(s) : o.delete(s), l(o)
                } else l(El(e, i))
            })
        },
        mounted: Rl,
        beforeUpdate(e, t, n) {
            e[He] = mt(n), Rl(e, t, n)
        }
    };

function Rl(e, {
    value: t,
    oldValue: n
}, r) {
    e._modelValue = t;
    let s;
    if (q(t)) s = Or(t, r.props.value) > -1;
    else if (Ut(t)) s = t.has(r.props.value);
    else {
        if (t === n) return;
        s = xt(t, El(e, !0))
    }
    e.checked !== s && (e.checked = s)
}
const ou = {
        created(e, {
            value: t
        }, n) {
            e.checked = xt(t, n.props.value), e[He] = mt(n), ot(e, "change", () => {
                e[He](Jt(e))
            })
        },
        beforeUpdate(e, {
            value: t,
            oldValue: n
        }, r) {
            e[He] = mt(r), t !== n && (e.checked = xt(t, r.props.value))
        }
    },
    au = {
        deep: !0,
        created(e, {
            value: t,
            modifiers: {
                number: n
            }
        }, r) {
            const s = Ut(t);
            ot(e, "change", () => {
                const i = Array.prototype.filter.call(e.options, l => l.selected).map(l => n ? Wn(Jt(l)) : Jt(l));
                e[He](e.multiple ? s ? new Set(i) : i : i[0]), e._assigning = !0, Kt(() => {
                    e._assigning = !1
                })
            }), e[He] = mt(r)
        },
        mounted(e, {
            value: t
        }) {
            Al(e, t)
        },
        beforeUpdate(e, t, n) {
            e[He] = mt(n)
        },
        updated(e, {
            value: t
        }) {
            e._assigning || Al(e, t)
        }
    };

function Al(e, t) {
    const n = e.multiple,
        r = q(t);
    if (!(n && !r && !Ut(t))) {
        for (let s = 0, i = e.options.length; s < i; s++) {
            const l = e.options[s],
                o = Jt(l);
            if (n)
                if (r) {
                    const a = typeof o;
                    a === "string" || a === "number" ? l.selected = t.some(c => String(c) === String(o)) : l.selected = Or(t, o) > -1
                } else l.selected = t.has(o);
            else if (xt(Jt(l), t)) {
                e.selectedIndex !== s && (e.selectedIndex = s);
                return
            }
        }!n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}

function Jt(e) {
    return "_value" in e ? e._value : e.value
}

function El(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}
const cu = {
    created(e, t, n) {
        pr(e, t, n, null, "created")
    },
    mounted(e, t, n) {
        pr(e, t, n, null, "mounted")
    },
    beforeUpdate(e, t, n, r) {
        pr(e, t, n, r, "beforeUpdate")
    },
    updated(e, t, n, r) {
        pr(e, t, n, r, "updated")
    }
};

function uu(e, t) {
    switch (e) {
        case "SELECT":
            return au;
        case "TEXTAREA":
            return hs;
        default:
            switch (t) {
                case "checkbox":
                    return lu;
                case "radio":
                    return ou;
                default:
                    return hs
            }
    }
}

function pr(e, t, n, r, s) {
    const l = uu(e.tagName, n.props && n.props.type)[s];
    l && l(e, t, n, r)
}
const fu = je({
    patchProp: ru
}, Bc);
let Tl;

function hu() {
    return Tl || (Tl = pc(fu))
}
const pu = (...e) => {
    const t = hu().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = r => {
        const s = gu(r);
        if (!s) return;
        const i = t._component;
        !ee(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
        const l = n(s, !1, du(s));
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l
    }, t
};

function du(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function gu(e) {
    return ye(e) ? document.querySelector(e) : e
}

function Sn(e) {
    return di() ? (aa(e), !0) : !1
}
const dr = typeof window < "u" && typeof document < "u",
    mu = e => typeof e < "u",
    vu = Object.prototype.toString,
    bu = e => vu.call(e) === "[object Object]",
    gr = () => {};

function yu(...e) {
    if (e.length !== 1) return ja(...e);
    const t = e[0];
    return typeof t == "function" ? Bt(Ma(() => ({
        get: t,
        set: gr
    }))) : se(t)
}

function Il(e, t) {
    function n(...r) {
        return new Promise((s, i) => {
            Promise.resolve(e(() => t.apply(this, r), {
                fn: t,
                thisArg: this,
                args: r
            })).then(s).catch(i)
        })
    }
    return n
}
const Ll = e => e();

function wu(e, t = {}) {
    let n, r, s = gr;
    const i = a => {
        clearTimeout(a), s(), s = gr
    };
    let l;
    return a => {
        const c = Te(e),
            u = Te(t.maxWait);
        return n && i(n), c <= 0 || u !== void 0 && u <= 0 ? (r && (i(r), r = null), Promise.resolve(a())) : new Promise((f, d) => {
            s = t.rejectOnCancel ? d : f, l = a, u && !r && (r = setTimeout(() => {
                n && i(n), r = null, f(l())
            }, u)), n = setTimeout(() => {
                r && i(r), r = null, f(a())
            }, c)
        })
    }
}

function ku(e = Ll, t = {}) {
    const {
        initialState: n = "active"
    } = t, r = yu(n === "active");

    function s() {
        r.value = !1
    }

    function i() {
        r.value = !0
    }
    const l = (...o) => {
        r.value && e(...o)
    };
    return {
        isActive: Bt(r),
        pause: s,
        resume: i,
        eventFilter: l
    }
}

function ps(e) {
    return Array.isArray(e) ? e : [e]
}

function Ml(e) {
    return ol()
}

function xu(e, t = 200, n = {}) {
    return Il(wu(t, n), e)
}

function _u(e, t, n = {}) {
    const {
        eventFilter: r = Ll,
        ...s
    } = n;
    return dt(e, Il(r, t), s)
}

function Cu(e, t, n = {}) {
    const {
        eventFilter: r,
        initialState: s = "active",
        ...i
    } = n, {
        eventFilter: l,
        pause: o,
        resume: a,
        isActive: c
    } = ku(r, {
        initialState: s
    });
    return {
        stop: _u(e, t, {
            ...i,
            eventFilter: l
        }),
        pause: o,
        resume: a,
        isActive: c
    }
}

function ds(e, t = !0, n) {
    Ml() ? bn(e, n) : t ? e() : Kt(e)
}

function Su(e, t) {
    Ml() && Xr(e, t)
}

function $u(e, t = 1e3, n = {}) {
    const {
        immediate: r = !0,
        immediateCallback: s = !1
    } = n;
    let i = null;
    const l = Rt(!1);

    function o() {
        i && (clearInterval(i), i = null)
    }

    function a() {
        l.value = !1, o()
    }

    function c() {
        const u = Te(t);
        u <= 0 || (l.value = !0, s && e(), o(), l.value && (i = setInterval(e, u)))
    }
    if (r && dr && c(), ve(t) || typeof t == "function") {
        const u = dt(t, () => {
            l.value && dr && c()
        });
        Sn(u)
    }
    return Sn(a), {
        isActive: l,
        pause: a,
        resume: c
    }
}

function Yt(e, t, n) {
    return dt(e, t, {
        ...n,
        immediate: !0
    })
}
const mr = dr ? window : void 0,
    Pl = dr ? window.document : void 0;

function Ru(e) {
    var t;
    const n = Te(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}

function Lt(...e) {
    const t = [],
        n = () => {
            t.forEach(o => o()), t.length = 0
        },
        r = (o, a, c, u) => (o.addEventListener(a, c, u), () => o.removeEventListener(a, c, u)),
        s = ge(() => {
            const o = ps(Te(e[0])).filter(a => a != null);
            return o.every(a => typeof a != "string") ? o : void 0
        }),
        i = Yt(() => {
            var o, a;
            return [(a = (o = s.value) == null ? void 0 : o.map(c => Ru(c))) != null ? a : [mr].filter(c => c != null), ps(Te(s.value ? e[1] : e[0])), ps(K(s.value ? e[2] : e[1])), Te(s.value ? e[3] : e[2])]
        }, ([o, a, c, u]) => {
            if (n(), !(o != null && o.length) || !(a != null && a.length) || !(c != null && c.length)) return;
            const f = bu(u) ? {
                ...u
            } : u;
            t.push(...o.flatMap(d => a.flatMap(m => c.map(x => r(d, m, x, f)))))
        }, {
            flush: "post"
        }),
        l = () => {
            i(), n()
        };
    return Sn(n), l
}

function Au(e, t = {}) {
    const {
        immediate: n = !0,
        fpsLimit: r = void 0,
        window: s = mr,
        once: i = !1
    } = t, l = Rt(!1), o = ge(() => r ? 1e3 / Te(r) : null);
    let a = 0,
        c = null;

    function u(m) {
        if (!l.value || !s) return;
        a || (a = m);
        const x = m - a;
        if (o.value && x < o.value) {
            c = s.requestAnimationFrame(u);
            return
        }
        if (a = m, e({
                delta: x,
                timestamp: m
            }), i) {
            l.value = !1, c = null;
            return
        }
        c = s.requestAnimationFrame(u)
    }

    function f() {
        !l.value && s && (l.value = !0, a = 0, c = s.requestAnimationFrame(u))
    }

    function d() {
        l.value = !1, c != null && s && (s.cancelAnimationFrame(c), c = null)
    }
    return n && f(), Sn(d), {
        isActive: Bt(l),
        pause: d,
        resume: f
    }
}
const vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    br = "__vueuse_ssr_handlers__",
    Eu = Tu();

function Tu() {
    return br in vr || (vr[br] = vr[br] || {}), vr[br]
}

function Iu(e, t) {
    return Eu[e] || t
}

function Lu(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number"
}
const Mu = {
        boolean: {
            read: e => e === "true",
            write: e => String(e)
        },
        object: {
            read: e => JSON.parse(e),
            write: e => JSON.stringify(e)
        },
        number: {
            read: e => Number.parseFloat(e),
            write: e => String(e)
        },
        any: {
            read: e => e,
            write: e => String(e)
        },
        string: {
            read: e => e,
            write: e => String(e)
        },
        map: {
            read: e => new Map(JSON.parse(e)),
            write: e => JSON.stringify(Array.from(e.entries()))
        },
        set: {
            read: e => new Set(JSON.parse(e)),
            write: e => JSON.stringify(Array.from(e))
        },
        date: {
            read: e => new Date(e),
            write: e => e.toISOString()
        }
    },
    Ol = "vueuse-storage";

function Qt(e, t, n, r = {}) {
    var s;
    const {
        flush: i = "pre",
        deep: l = !0,
        listenToStorageChanges: o = !0,
        writeDefaults: a = !0,
        mergeDefaults: c = !1,
        shallow: u,
        window: f = mr,
        eventFilter: d,
        onError: m = E => {
            console.error(E)
        },
        initOnMounted: x
    } = r, b = (u ? Rt : se)(typeof t == "function" ? t() : t), T = ge(() => Te(e));
    if (!n) try {
        n = Iu("getDefaultStorage", () => {
            var E;
            return (E = mr) == null ? void 0 : E.localStorage
        })()
    } catch (E) {
        m(E)
    }
    if (!n) return b;
    const w = Te(t),
        C = Lu(w),
        N = (s = r.serializer) != null ? s : Mu[C],
        {
            pause: I,
            resume: O
        } = Cu(b, () => j(b.value), {
            flush: i,
            deep: l,
            eventFilter: d
        });
    dt(T, () => ae(), {
        flush: i
    }), f && o && ds(() => {
        n instanceof Storage ? Lt(f, "storage", ae, {
            passive: !0
        }) : Lt(f, Ol, Me), x && ae()
    }), x || ae();

    function G(E, B) {
        if (f) {
            const F = {
                key: T.value,
                oldValue: E,
                newValue: B,
                storageArea: n
            };
            f.dispatchEvent(n instanceof Storage ? new StorageEvent("storage", F) : new CustomEvent(Ol, {
                detail: F
            }))
        }
    }

    function j(E) {
        try {
            const B = n.getItem(T.value);
            if (E == null) G(B, null), n.removeItem(T.value);
            else {
                const F = N.write(E);
                B !== F && (n.setItem(T.value, F), G(B, F))
            }
        } catch (B) {
            m(B)
        }
    }

    function oe(E) {
        const B = E ? E.newValue : n.getItem(T.value);
        if (B == null) return a && w != null && n.setItem(T.value, N.write(w)), w;
        if (!E && c) {
            const F = N.read(B);
            return typeof c == "function" ? c(F, w) : C === "object" && !Array.isArray(F) ? {
                ...w,
                ...F
            } : F
        } else return typeof B != "string" ? B : N.read(B)
    }

    function ae(E) {
        if (!(E && E.storageArea !== n)) {
            if (E && E.key == null) {
                b.value = w;
                return
            }
            if (!(E && E.key !== T.value)) {
                I();
                try {
                    (E == null ? void 0 : E.newValue) !== N.write(b.value) && (b.value = oe(E))
                } catch (B) {
                    m(B)
                } finally {
                    E ? Kt(O) : O()
                }
            }
        }
    }

    function Me(E) {
        ae(E.detail)
    }
    return b
}

function Pu(e = {}) {
    const {
        controls: t = !1,
        interval: n = "requestAnimationFrame"
    } = e, r = se(new Date), s = () => r.value = new Date, i = n === "requestAnimationFrame" ? Au(s, {
        immediate: !0
    }) : $u(s, n, {
        immediate: !0
    });
    return t ? {
        now: r,
        ...i
    } : r
}

function Ou(e, t = gr, n = {}) {
    const {
        immediate: r = !0,
        manual: s = !1,
        type: i = "text/javascript",
        async: l = !0,
        crossOrigin: o,
        referrerPolicy: a,
        noModule: c,
        defer: u,
        document: f = Pl,
        attrs: d = {}
    } = n, m = Rt(null);
    let x = null;
    const b = C => new Promise((N, I) => {
            const O = ae => (m.value = ae, N(ae), ae);
            if (!f) {
                N(!1);
                return
            }
            let G = !1,
                j = f.querySelector(`script[src="${Te(e)}"]`);
            j ? j.hasAttribute("data-loaded") && O(j) : (j = f.createElement("script"), j.type = i, j.async = l, j.src = Te(e), u && (j.defer = u), o && (j.crossOrigin = o), c && (j.noModule = c), a && (j.referrerPolicy = a), Object.entries(d).forEach(([ae, Me]) => j == null ? void 0 : j.setAttribute(ae, Me)), G = !0);
            const oe = {
                passive: !0
            };
            Lt(j, "error", ae => I(ae), oe), Lt(j, "abort", ae => I(ae), oe), Lt(j, "load", () => {
                j.setAttribute("data-loaded", "true"), t(j), O(j)
            }, oe), G && (j = f.head.appendChild(j)), C || O(j)
        }),
        T = (C = !0) => (x || (x = b(C)), x),
        w = () => {
            if (!f) return;
            x = null, m.value && (m.value = null);
            const C = f.querySelector(`script[src="${Te(e)}"]`);
            C && f.head.removeChild(C)
        };
    return r && !s && ds(T), s || Su(w), {
        scriptTag: m,
        load: T,
        unload: w
    }
}
let ju = 0;

function zu(e, t = {}) {
    const n = Rt(!1),
        {
            document: r = Pl,
            immediate: s = !0,
            manual: i = !1,
            id: l = `vueuse_styletag_${++ju}`
        } = t,
        o = Rt(e);
    let a = () => {};
    const c = () => {
            if (!r) return;
            const f = r.getElementById(l) || r.createElement("style");
            f.isConnected || (f.id = l, t.media && (f.media = t.media), r.head.appendChild(f)), !n.value && (a = dt(o, d => {
                f.textContent = d
            }, {
                immediate: !0
            }), n.value = !0)
        },
        u = () => {
            !r || !n.value || (a(), r.head.removeChild(r.getElementById(l)), n.value = !1)
        };
    return s && !i && ds(c), i || Sn(u), {
        id: l,
        css: o,
        unload: u,
        load: c,
        isLoaded: Bt(n)
    }
}
const Du = "WALINE_EMOJI",
    jl = Qt(Du, {}),
    Fu = e => !!/@[0-9]+\.[0-9]+\.[0-9]+/.test(e),
    Hu = e => {
        const t = Fu(e);
        if (t) {
            const n = jl.value[e];
            if (n) return Promise.resolve(n)
        }
        return fetch(`${e}/info.json`).then(n => n.json()).then(n => {
            const r = {
                folder: e,
                ...n
            };
            return t && (jl.value[e] = r), r
        })
    },
    zl = (e, t = "", n = "", r = "") => `${t?`${t}/`:""}${n}${e}${r?`.${r}`:""}`,
    Uu = e => Promise.all(e ? e.map(t => Dt(t) ? Hu(ni(t)) : Promise.resolve(t)) : []).then(t => {
        const n = {
            tabs: [],
            map: {}
        };
        return t.forEach(r => {
            const {
                name: s,
                folder: i,
                icon: l,
                prefix: o = "",
                type: a,
                items: c
            } = r;
            n.tabs.push({
                name: s,
                icon: zl(l, i, o, a),
                items: c.map(u => {
                    const f = `${o}${u}`;
                    return n.map[f] = zl(u, i, o, a), f
                })
            })
        }), n
    }),
    Dl = e => {
        e.name !== "AbortError" && console.error(e.message)
    },
    gs = e => e instanceof HTMLElement ? e : Dt(e) ? document.querySelector(e) : null,
    Nu = e => e.type.includes("image"),
    Fl = e => {
        const t = Array.from(e).find(Nu);
        return t ? t.getAsFile() : null
    };

function ms() {
    return {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    }
}
let Mt = ms();

function Hl(e) {
    Mt = e
}
const $n = {
    exec: () => null
};

function ne(e, t = "") {
    let n = typeof e == "string" ? e : e.source;
    const r = {
        replace: (s, i) => {
            let l = typeof i == "string" ? i : i.source;
            return l = l.replace(Re.caret, "$1"), n = n.replace(s, l), r
        },
        getRegex: () => new RegExp(n, t)
    };
    return r
}
const Re = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] /,
        listReplaceTask: /^\[[ xX]\] +/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: e => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: e => new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
        hrRegex: e => new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: e => new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: e => new RegExp(`^ {0,${Math.min(3,e-1)}}#`),
        htmlBeginRegex: e => new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`, "i")
    },
    Bu = /^(?:[ \t]*(?:\n|$))+/,
    Vu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
    Wu = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    Rn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    qu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    vs = /(?:[*+-]|\d{1,9}[.)])/,
    Ul = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    Nl = ne(Ul).replace(/bull/g, vs).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(),
    Ku = ne(Ul).replace(/bull/g, vs).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),
    bs = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    Gu = /^[^\n]+/,
    ys = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    Zu = ne(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ys).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
    Ju = ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, vs).getRegex(),
    yr = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    ws = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
    Yu = ne("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ws).replace("tag", yr).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    Bl = ne(bs).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", yr).getRegex(),
    Qu = ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Bl).getRegex(),
    ks = {
        blockquote: Qu,
        code: Vu,
        def: Zu,
        fences: Wu,
        heading: qu,
        hr: Rn,
        html: Yu,
        lheading: Nl,
        list: Ju,
        newline: Bu,
        paragraph: Bl,
        table: $n,
        text: Gu
    },
    Vl = ne("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", yr).getRegex(),
    Xu = {
        ...ks,
        lheading: Ku,
        table: Vl,
        paragraph: ne(bs).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Vl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", yr).getRegex()
    },
    ef = {
        ...ks,
        html: ne(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ws).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: $n,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: ne(bs).replace("hr", Rn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Nl).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    },
    tf = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    nf = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    Wl = /^( {2,}|\\)\n(?!\s*$)/,
    rf = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    wr = /[\p{P}\p{S}]/u,
    xs = /[\s\p{P}\p{S}]/u,
    ql = /[^\s\p{P}\p{S}]/u,
    sf = ne(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, xs).getRegex(),
    Kl = /(?!~)[\p{P}\p{S}]/u,
    lf = /(?!~)[\s\p{P}\p{S}]/u,
    of = /(?:[^\s\p{P}\p{S}]|~)/u,
    af = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,
    Gl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
    cf = ne(Gl, "u").replace(/punct/g, wr).getRegex(),
    uf = ne(Gl, "u").replace(/punct/g, Kl).getRegex(),
    Zl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
    ff = ne(Zl, "gu").replace(/notPunctSpace/g, ql).replace(/punctSpace/g, xs).replace(/punct/g, wr).getRegex(),
    hf = ne(Zl, "gu").replace(/notPunctSpace/g, of).replace(/punctSpace/g, lf).replace(/punct/g, Kl).getRegex(),
    pf = ne("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ql).replace(/punctSpace/g, xs).replace(/punct/g, wr).getRegex(),
    df = ne(/\\(punct)/, "gu").replace(/punct/g, wr).getRegex(),
    gf = ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
    mf = ne(ws).replace("(?:-->|$)", "-->").getRegex(),
    vf = ne("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mf).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
    kr = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    bf = ne(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", kr).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
    Jl = ne(/^!?\[(label)\]\[(ref)\]/).replace("label", kr).replace("ref", ys).getRegex(),
    Yl = ne(/^!?\[(ref)\](?:\[\])?/).replace("ref", ys).getRegex(),
    yf = ne("reflink|nolink(?!\\()", "g").replace("reflink", Jl).replace("nolink", Yl).getRegex(),
    _s = {
        _backpedal: $n,
        anyPunctuation: df,
        autolink: gf,
        blockSkip: af,
        br: Wl,
        code: nf,
        del: $n,
        emStrongLDelim: cf,
        emStrongRDelimAst: ff,
        emStrongRDelimUnd: pf,
        escape: tf,
        link: bf,
        nolink: Yl,
        punctuation: sf,
        reflink: Jl,
        reflinkSearch: yf,
        tag: vf,
        text: rf,
        url: $n
    },
    wf = {
        ..._s,
        link: ne(/^!?\[(label)\]\((.*?)\)/).replace("label", kr).getRegex(),
        reflink: ne(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", kr).getRegex()
    },
    Cs = {
        ..._s,
        emStrongRDelimAst: hf,
        emStrongLDelim: uf,
        url: ne(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    },
    kf = {
        ...Cs,
        br: ne(Wl).replace("{2,}", "*").getRegex(),
        text: ne(Cs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    },
    xr = {
        normal: ks,
        gfm: Xu,
        pedantic: ef
    },
    An = {
        normal: _s,
        gfm: Cs,
        breaks: kf,
        pedantic: wf
    },
    xf = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    Ql = e => xf[e];

function Ye(e, t) {
    if (t) {
        if (Re.escapeTest.test(e)) return e.replace(Re.escapeReplace, Ql)
    } else if (Re.escapeTestNoEncode.test(e)) return e.replace(Re.escapeReplaceNoEncode, Ql);
    return e
}

function Xl(e) {
    try {
        e = encodeURI(e).replace(Re.percentDecode, "%")
    } catch {
        return null
    }
    return e
}

function eo(e, t) {
    var i;
    const n = e.replace(Re.findPipe, (l, o, a) => {
            let c = !1,
                u = o;
            for (; --u >= 0 && a[u] === "\\";) c = !c;
            return c ? "|" : " |"
        }),
        r = n.split(Re.splitPipe);
    let s = 0;
    if (r[0].trim() || r.shift(), r.length > 0 && !((i = r.at(-1)) != null && i.trim()) && r.pop(), t)
        if (r.length > t) r.splice(t);
        else
            for (; r.length < t;) r.push("");
    for (; s < r.length; s++) r[s] = r[s].trim().replace(Re.slashPipe, "|");
    return r
}

function En(e, t, n) {
    const r = e.length;
    if (r === 0) return "";
    let s = 0;
    for (; s < r && e.charAt(r - s - 1) === t;) s++;
    return e.slice(0, r - s)
}

function _f(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let r = 0; r < e.length; r++)
        if (e[r] === "\\") r++;
        else if (e[r] === t[0]) n++;
    else if (e[r] === t[1] && (n--, n < 0)) return r;
    return -1
}

function to(e, t, n, r, s) {
    const i = t.href,
        l = t.title || null,
        o = e[1].replace(s.other.outputLinkReplace, "$1");
    if (e[0].charAt(0) !== "!") {
        r.state.inLink = !0;
        const a = {
            type: "link",
            raw: n,
            href: i,
            title: l,
            text: o,
            tokens: r.inlineTokens(o)
        };
        return r.state.inLink = !1, a
    }
    return {
        type: "image",
        raw: n,
        href: i,
        title: l,
        text: o
    }
}

function Cf(e, t, n) {
    const r = e.match(n.other.indentCodeCompensation);
    if (r === null) return t;
    const s = r[1];
    return t.split(`
`).map(i => {
        const l = i.match(n.other.beginningSpace);
        if (l === null) return i;
        const [o] = l;
        return o.length >= s.length ? i.slice(s.length) : i
    }).join(`
`)
}
class _r {
    options;
    rules;
    lexer;
    constructor(t) {
        this.options = t || Mt
    }
    space(t) {
        const n = this.rules.block.newline.exec(t);
        if (n && n[0].length > 0) return {
            type: "space",
            raw: n[0]
        }
    }
    code(t) {
        const n = this.rules.block.code.exec(t);
        if (n) {
            const r = n[0].replace(this.rules.other.codeRemoveIndent, "");
            return {
                type: "code",
                raw: n[0],
                codeBlockStyle: "indented",
                text: this.options.pedantic ? r : En(r, `
`)
            }
        }
    }
    fences(t) {
        const n = this.rules.block.fences.exec(t);
        if (n) {
            const r = n[0],
                s = Cf(r, n[3] || "", this.rules);
            return {
                type: "code",
                raw: r,
                lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
                text: s
            }
        }
    }
    heading(t) {
        const n = this.rules.block.heading.exec(t);
        if (n) {
            let r = n[2].trim();
            if (this.rules.other.endingHash.test(r)) {
                const s = En(r, "#");
                (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (r = s.trim())
            }
            return {
                type: "heading",
                raw: n[0],
                depth: n[1].length,
                text: r,
                tokens: this.lexer.inline(r)
            }
        }
    }
    hr(t) {
        const n = this.rules.block.hr.exec(t);
        if (n) return {
            type: "hr",
            raw: En(n[0], `
`)
        }
    }
    blockquote(t) {
        const n = this.rules.block.blockquote.exec(t);
        if (n) {
            let r = En(n[0], `
`).split(`
`),
                s = "",
                i = "";
            const l = [];
            for (; r.length > 0;) {
                let o = !1;
                const a = [];
                let c;
                for (c = 0; c < r.length; c++)
                    if (this.rules.other.blockquoteStart.test(r[c])) a.push(r[c]), o = !0;
                    else if (!o) a.push(r[c]);
                else break;
                r = r.slice(c);
                const u = a.join(`
`),
                    f = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
                s = s ? `${s}
${u}` : u, i = i ? `${i}
${f}` : f;
                const d = this.lexer.state.top;
                if (this.lexer.state.top = !0, this.lexer.blockTokens(f, l, !0), this.lexer.state.top = d, r.length === 0) break;
                const m = l.at(-1);
                if ((m == null ? void 0 : m.type) === "code") break;
                if ((m == null ? void 0 : m.type) === "blockquote") {
                    const x = m,
                        b = x.raw + `
` + r.join(`
`),
                        T = this.blockquote(b);
                    l[l.length - 1] = T, s = s.substring(0, s.length - x.raw.length) + T.raw, i = i.substring(0, i.length - x.text.length) + T.text;
                    break
                } else if ((m == null ? void 0 : m.type) === "list") {
                    const x = m,
                        b = x.raw + `
` + r.join(`
`),
                        T = this.list(b);
                    l[l.length - 1] = T, s = s.substring(0, s.length - m.raw.length) + T.raw, i = i.substring(0, i.length - x.raw.length) + T.raw, r = b.substring(l.at(-1).raw.length).split(`
`);
                    continue
                }
            }
            return {
                type: "blockquote",
                raw: s,
                tokens: l,
                text: i
            }
        }
    }
    list(t) {
        let n = this.rules.block.list.exec(t);
        if (n) {
            let r = n[1].trim();
            const s = r.length > 1,
                i = {
                    type: "list",
                    raw: "",
                    ordered: s,
                    start: s ? +r.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
            r = s ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = s ? r : "[*+-]");
            const l = this.rules.other.listItemRegex(r);
            let o = !1;
            for (; t;) {
                let c = !1,
                    u = "",
                    f = "";
                if (!(n = l.exec(t)) || this.rules.block.hr.test(t)) break;
                u = n[0], t = t.substring(u.length);
                let d = n[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, C => " ".repeat(3 * C.length)),
                    m = t.split(`
`, 1)[0],
                    x = !d.trim(),
                    b = 0;
                if (this.options.pedantic ? (b = 2, f = d.trimStart()) : x ? b = n[1].length + 1 : (b = n[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, f = d.slice(b), b += n[1].length), x && this.rules.other.blankLine.test(m) && (u += m + `
`, t = t.substring(m.length + 1), c = !0), !c) {
                    const C = this.rules.other.nextBulletRegex(b),
                        N = this.rules.other.hrRegex(b),
                        I = this.rules.other.fencesBeginRegex(b),
                        O = this.rules.other.headingBeginRegex(b),
                        G = this.rules.other.htmlBeginRegex(b);
                    for (; t;) {
                        const j = t.split(`
`, 1)[0];
                        let oe;
                        if (m = j, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), oe = m) : oe = m.replace(this.rules.other.tabCharGlobal, "    "), I.test(m) || O.test(m) || G.test(m) || C.test(m) || N.test(m)) break;
                        if (oe.search(this.rules.other.nonSpaceChar) >= b || !m.trim()) f += `
` + oe.slice(b);
                        else {
                            if (x || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || I.test(d) || O.test(d) || N.test(d)) break;
                            f += `
` + m
                        }!x && !m.trim() && (x = !0), u += j + `
`, t = t.substring(j.length + 1), d = oe.slice(b)
                    }
                }
                i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
                let T = null,
                    w;
                this.options.gfm && (T = this.rules.other.listIsTask.exec(f), T && (w = T[0] !== "[ ] ", f = f.replace(this.rules.other.listReplaceTask, ""))), i.items.push({
                    type: "list_item",
                    raw: u,
                    task: !!T,
                    checked: w,
                    loose: !1,
                    text: f,
                    tokens: []
                }), i.raw += u
            }
            const a = i.items.at(-1);
            if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
            else return;
            i.raw = i.raw.trimEnd();
            for (let c = 0; c < i.items.length; c++)
                if (this.lexer.state.top = !1, i.items[c].tokens = this.lexer.blockTokens(i.items[c].text, []), !i.loose) {
                    const u = i.items[c].tokens.filter(d => d.type === "space"),
                        f = u.length > 0 && u.some(d => this.rules.other.anyLine.test(d.raw));
                    i.loose = f
                } if (i.loose)
                for (let c = 0; c < i.items.length; c++) i.items[c].loose = !0;
            return i
        }
    }
    html(t) {
        const n = this.rules.block.html.exec(t);
        if (n) return {
            type: "html",
            block: !0,
            raw: n[0],
            pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
            text: n[0]
        }
    }
    def(t) {
        const n = this.rules.block.def.exec(t);
        if (n) {
            const r = n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "),
                s = n[2] ? n[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                i = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
            return {
                type: "def",
                tag: r,
                raw: n[0],
                href: s,
                title: i
            }
        }
    }
    table(t) {
        var o;
        const n = this.rules.block.table.exec(t);
        if (!n || !this.rules.other.tableDelimiter.test(n[2])) return;
        const r = eo(n[1]),
            s = n[2].replace(this.rules.other.tableAlignChars, "").split("|"),
            i = (o = n[3]) != null && o.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [],
            l = {
                type: "table",
                raw: n[0],
                header: [],
                align: [],
                rows: []
            };
        if (r.length === s.length) {
            for (const a of s) this.rules.other.tableAlignRight.test(a) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? l.align.push("left") : l.align.push(null);
            for (let a = 0; a < r.length; a++) l.header.push({
                text: r[a],
                tokens: this.lexer.inline(r[a]),
                header: !0,
                align: l.align[a]
            });
            for (const a of i) l.rows.push(eo(a, l.header.length).map((c, u) => ({
                text: c,
                tokens: this.lexer.inline(c),
                header: !1,
                align: l.align[u]
            })));
            return l
        }
    }
    lheading(t) {
        const n = this.rules.block.lheading.exec(t);
        if (n) return {
            type: "heading",
            raw: n[0],
            depth: n[2].charAt(0) === "=" ? 1 : 2,
            text: n[1],
            tokens: this.lexer.inline(n[1])
        }
    }
    paragraph(t) {
        const n = this.rules.block.paragraph.exec(t);
        if (n) {
            const r = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
            return {
                type: "paragraph",
                raw: n[0],
                text: r,
                tokens: this.lexer.inline(r)
            }
        }
    }
    text(t) {
        const n = this.rules.block.text.exec(t);
        if (n) return {
            type: "text",
            raw: n[0],
            text: n[0],
            tokens: this.lexer.inline(n[0])
        }
    }
    escape(t) {
        const n = this.rules.inline.escape.exec(t);
        if (n) return {
            type: "escape",
            raw: n[0],
            text: n[1]
        }
    }
    tag(t) {
        const n = this.rules.inline.tag.exec(t);
        if (n) return !this.lexer.state.inLink && this.rules.other.startATag.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
            type: "html",
            raw: n[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: n[0]
        }
    }
    link(t) {
        const n = this.rules.inline.link.exec(t);
        if (n) {
            const r = n[2].trim();
            if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
                if (!this.rules.other.endAngleBracket.test(r)) return;
                const l = En(r.slice(0, -1), "\\");
                if ((r.length - l.length) % 2 === 0) return
            } else {
                const l = _f(n[2], "()");
                if (l > -1) {
                    const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + l;
                    n[2] = n[2].substring(0, l), n[0] = n[0].substring(0, a).trim(), n[3] = ""
                }
            }
            let s = n[2],
                i = "";
            if (this.options.pedantic) {
                const l = this.rules.other.pedanticHrefTitle.exec(s);
                l && (s = l[1], i = l[3])
            } else i = n[3] ? n[3].slice(1, -1) : "";
            return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? s = s.slice(1) : s = s.slice(1, -1)), to(n, {
                href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
                title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
            }, n[0], this.lexer, this.rules)
        }
    }
    reflink(t, n) {
        let r;
        if ((r = this.rules.inline.reflink.exec(t)) || (r = this.rules.inline.nolink.exec(t))) {
            const s = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
                i = n[s.toLowerCase()];
            if (!i) {
                const l = r[0].charAt(0);
                return {
                    type: "text",
                    raw: l,
                    text: l
                }
            }
            return to(r, i, r[0], this.lexer, this.rules)
        }
    }
    emStrong(t, n, r = "") {
        let s = this.rules.inline.emStrongLDelim.exec(t);
        if (!s || s[3] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
        if (!(s[1] || s[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
            const l = [...s[0]].length - 1;
            let o, a, c = l,
                u = 0;
            const f = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            for (f.lastIndex = 0, n = n.slice(-1 * t.length + l);
                (s = f.exec(n)) != null;) {
                if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
                if (a = [...o].length, s[3] || s[4]) {
                    c += a;
                    continue
                } else if ((s[5] || s[6]) && l % 3 && !((l + a) % 3)) {
                    u += a;
                    continue
                }
                if (c -= a, c > 0) continue;
                a = Math.min(a, a + c + u);
                const d = [...s[0]][0].length,
                    m = t.slice(0, l + s.index + d + a);
                if (Math.min(l, a) % 2) {
                    const b = m.slice(1, -1);
                    return {
                        type: "em",
                        raw: m,
                        text: b,
                        tokens: this.lexer.inlineTokens(b)
                    }
                }
                const x = m.slice(2, -2);
                return {
                    type: "strong",
                    raw: m,
                    text: x,
                    tokens: this.lexer.inlineTokens(x)
                }
            }
        }
    }
    codespan(t) {
        const n = this.rules.inline.code.exec(t);
        if (n) {
            let r = n[2].replace(this.rules.other.newLineCharGlobal, " ");
            const s = this.rules.other.nonSpaceChar.test(r),
                i = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
            return s && i && (r = r.substring(1, r.length - 1)), {
                type: "codespan",
                raw: n[0],
                text: r
            }
        }
    }
    br(t) {
        const n = this.rules.inline.br.exec(t);
        if (n) return {
            type: "br",
            raw: n[0]
        }
    }
    del(t) {
        const n = this.rules.inline.del.exec(t);
        if (n) return {
            type: "del",
            raw: n[0],
            text: n[2],
            tokens: this.lexer.inlineTokens(n[2])
        }
    }
    autolink(t) {
        const n = this.rules.inline.autolink.exec(t);
        if (n) {
            let r, s;
            return n[2] === "@" ? (r = n[1], s = "mailto:" + r) : (r = n[1], s = r), {
                type: "link",
                raw: n[0],
                text: r,
                href: s,
                tokens: [{
                    type: "text",
                    raw: r,
                    text: r
                }]
            }
        }
    }
    url(t) {
        var r;
        let n;
        if (n = this.rules.inline.url.exec(t)) {
            let s, i;
            if (n[2] === "@") s = n[0], i = "mailto:" + s;
            else {
                let l;
                do l = n[0], n[0] = ((r = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : r[0]) ?? ""; while (l !== n[0]);
                s = n[0], n[1] === "www." ? i = "http://" + n[0] : i = n[0]
            }
            return {
                type: "link",
                raw: n[0],
                text: s,
                href: i,
                tokens: [{
                    type: "text",
                    raw: s,
                    text: s
                }]
            }
        }
    }
    inlineText(t) {
        const n = this.rules.inline.text.exec(t);
        if (n) {
            const r = this.lexer.state.inRawBlock;
            return {
                type: "text",
                raw: n[0],
                text: n[0],
                escaped: r
            }
        }
    }
}
class Be {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(t) {
        this.tokens = [], this.tokens.links = Object.create(null), this.options = t || Mt, this.options.tokenizer = this.options.tokenizer || new _r, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        const n = {
            other: Re,
            block: xr.normal,
            inline: An.normal
        };
        this.options.pedantic ? (n.block = xr.pedantic, n.inline = An.pedantic) : this.options.gfm && (n.block = xr.gfm, this.options.breaks ? n.inline = An.breaks : n.inline = An.gfm), this.tokenizer.rules = n
    }
    static get rules() {
        return {
            block: xr,
            inline: An
        }
    }
    static lex(t, n) {
        return new Be(n).lex(t)
    }
    static lexInline(t, n) {
        return new Be(n).inlineTokens(t)
    }
    lex(t) {
        t = t.replace(Re.carriageReturn, `
`), this.blockTokens(t, this.tokens);
        for (let n = 0; n < this.inlineQueue.length; n++) {
            const r = this.inlineQueue[n];
            this.inlineTokens(r.src, r.tokens)
        }
        return this.inlineQueue = [], this.tokens
    }
    blockTokens(t, n = [], r = !1) {
        var s, i, l;
        for (this.options.pedantic && (t = t.replace(Re.tabCharGlobal, "    ").replace(Re.spaceLine, "")); t;) {
            let o;
            if ((i = (s = this.options.extensions) == null ? void 0 : s.block) != null && i.some(c => (o = c.call({
                    lexer: this
                }, t, n)) ? (t = t.substring(o.raw.length), n.push(o), !0) : !1)) continue;
            if (o = this.tokenizer.space(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                o.raw.length === 1 && c !== void 0 ? c.raw += `
` : n.push(o);
                continue
            }
            if (o = this.tokenizer.code(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.at(-1).src = c.text) : n.push(o);
                continue
            }
            if (o = this.tokenizer.fences(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.heading(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.hr(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.blockquote(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.list(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.html(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.def(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = {
                    href: o.href,
                    title: o.title
                });
                continue
            }
            if (o = this.tokenizer.table(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.lheading(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            let a = t;
            if ((l = this.options.extensions) != null && l.startBlock) {
                let c = 1 / 0;
                const u = t.slice(1);
                let f;
                this.options.extensions.startBlock.forEach(d => {
                    f = d.call({
                        lexer: this
                    }, u), typeof f == "number" && f >= 0 && (c = Math.min(c, f))
                }), c < 1 / 0 && c >= 0 && (a = t.substring(0, c + 1))
            }
            if (this.state.top && (o = this.tokenizer.paragraph(a))) {
                const c = n.at(-1);
                r && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o), r = a.length !== t.length, t = t.substring(o.raw.length);
                continue
            }
            if (o = this.tokenizer.text(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o);
                continue
            }
            if (t) {
                const c = "Infinite loop on byte: " + t.charCodeAt(0);
                if (this.options.silent) {
                    console.error(c);
                    break
                } else throw new Error(c)
            }
        }
        return this.state.top = !0, n
    }
    inline(t, n = []) {
        return this.inlineQueue.push({
            src: t,
            tokens: n
        }), n
    }
    inlineTokens(t, n = []) {
        var o, a, c;
        let r = t,
            s = null;
        if (this.tokens.links) {
            const u = Object.keys(this.tokens.links);
            if (u.length > 0)
                for (;
                    (s = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null;) u.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
        }
        for (;
            (s = this.tokenizer.rules.inline.blockSkip.exec(r)) != null;) r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (;
            (s = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null;) r = r.slice(0, s.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        let i = !1,
            l = "";
        for (; t;) {
            i || (l = ""), i = !1;
            let u;
            if ((a = (o = this.options.extensions) == null ? void 0 : o.inline) != null && a.some(d => (u = d.call({
                    lexer: this
                }, t, n)) ? (t = t.substring(u.raw.length), n.push(u), !0) : !1)) continue;
            if (u = this.tokenizer.escape(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.tag(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.link(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.reflink(t, this.tokens.links)) {
                t = t.substring(u.raw.length);
                const d = n.at(-1);
                u.type === "text" && (d == null ? void 0 : d.type) === "text" ? (d.raw += u.raw, d.text += u.text) : n.push(u);
                continue
            }
            if (u = this.tokenizer.emStrong(t, r, l)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.codespan(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.br(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.del(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.autolink(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (!this.state.inLink && (u = this.tokenizer.url(t))) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            let f = t;
            if ((c = this.options.extensions) != null && c.startInline) {
                let d = 1 / 0;
                const m = t.slice(1);
                let x;
                this.options.extensions.startInline.forEach(b => {
                    x = b.call({
                        lexer: this
                    }, m), typeof x == "number" && x >= 0 && (d = Math.min(d, x))
                }), d < 1 / 0 && d >= 0 && (f = t.substring(0, d + 1))
            }
            if (u = this.tokenizer.inlineText(f)) {
                t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (l = u.raw.slice(-1)), i = !0;
                const d = n.at(-1);
                (d == null ? void 0 : d.type) === "text" ? (d.raw += u.raw, d.text += u.text) : n.push(u);
                continue
            }
            if (t) {
                const d = "Infinite loop on byte: " + t.charCodeAt(0);
                if (this.options.silent) {
                    console.error(d);
                    break
                } else throw new Error(d)
            }
        }
        return n
    }
}
class Cr {
    options;
    parser;
    constructor(t) {
        this.options = t || Mt
    }
    space(t) {
        return ""
    }
    code({
        text: t,
        lang: n,
        escaped: r
    }) {
        var l;
        const s = (l = (n || "").match(Re.notSpaceStart)) == null ? void 0 : l[0],
            i = t.replace(Re.endingNewline, "") + `
`;
        return s ? '<pre><code class="language-' + Ye(s) + '">' + (r ? i : Ye(i, !0)) + `</code></pre>
` : "<pre><code>" + (r ? i : Ye(i, !0)) + `</code></pre>
`
    }
    blockquote({
        tokens: t
    }) {
        return `<blockquote>
${this.parser.parse(t)}</blockquote>
`
    }
    html({
        text: t
    }) {
        return t
    }
    heading({
        tokens: t,
        depth: n
    }) {
        return `<h${n}>${this.parser.parseInline(t)}</h${n}>
`
    }
    hr(t) {
        return `<hr>
`
    }
    list(t) {
        const n = t.ordered,
            r = t.start;
        let s = "";
        for (let o = 0; o < t.items.length; o++) {
            const a = t.items[o];
            s += this.listitem(a)
        }
        const i = n ? "ol" : "ul",
            l = n && r !== 1 ? ' start="' + r + '"' : "";
        return "<" + i + l + `>
` + s + "</" + i + `>
`
    }
    listitem(t) {
        var r;
        let n = "";
        if (t.task) {
            const s = this.checkbox({
                checked: !!t.checked
            });
            t.loose ? ((r = t.tokens[0]) == null ? void 0 : r.type) === "paragraph" ? (t.tokens[0].text = s + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = s + " " + Ye(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({
                type: "text",
                raw: s + " ",
                text: s + " ",
                escaped: !0
            }) : n += s + " "
        }
        return n += this.parser.parse(t.tokens, !!t.loose), `<li>${n}</li>
`
    }
    checkbox({
        checked: t
    }) {
        return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }
    paragraph({
        tokens: t
    }) {
        return `<p>${this.parser.parseInline(t)}</p>
`
    }
    table(t) {
        let n = "",
            r = "";
        for (let i = 0; i < t.header.length; i++) r += this.tablecell(t.header[i]);
        n += this.tablerow({
            text: r
        });
        let s = "";
        for (let i = 0; i < t.rows.length; i++) {
            const l = t.rows[i];
            r = "";
            for (let o = 0; o < l.length; o++) r += this.tablecell(l[o]);
            s += this.tablerow({
                text: r
            })
        }
        return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + n + `</thead>
` + s + `</table>
`
    }
    tablerow({
        text: t
    }) {
        return `<tr>
${t}</tr>
`
    }
    tablecell(t) {
        const n = this.parser.parseInline(t.tokens),
            r = t.header ? "th" : "td";
        return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + n + `</${r}>
`
    }
    strong({
        tokens: t
    }) {
        return `<strong>${this.parser.parseInline(t)}</strong>`
    }
    em({
        tokens: t
    }) {
        return `<em>${this.parser.parseInline(t)}</em>`
    }
    codespan({
        text: t
    }) {
        return `<code>${Ye(t,!0)}</code>`
    }
    br(t) {
        return "<br>"
    }
    del({
        tokens: t
    }) {
        return `<del>${this.parser.parseInline(t)}</del>`
    }
    link({
        href: t,
        title: n,
        tokens: r
    }) {
        const s = this.parser.parseInline(r),
            i = Xl(t);
        if (i === null) return s;
        t = i;
        let l = '<a href="' + t + '"';
        return n && (l += ' title="' + Ye(n) + '"'), l += ">" + s + "</a>", l
    }
    image({
        href: t,
        title: n,
        text: r
    }) {
        const s = Xl(t);
        if (s === null) return Ye(r);
        t = s;
        let i = `<img src="${t}" alt="${r}"`;
        return n && (i += ` title="${Ye(n)}"`), i += ">", i
    }
    text(t) {
        return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Ye(t.text)
    }
}
class Ss {
    strong({
        text: t
    }) {
        return t
    }
    em({
        text: t
    }) {
        return t
    }
    codespan({
        text: t
    }) {
        return t
    }
    del({
        text: t
    }) {
        return t
    }
    html({
        text: t
    }) {
        return t
    }
    text({
        text: t
    }) {
        return t
    }
    link({
        text: t
    }) {
        return "" + t
    }
    image({
        text: t
    }) {
        return "" + t
    }
    br() {
        return ""
    }
}
class Ve {
    options;
    renderer;
    textRenderer;
    constructor(t) {
        this.options = t || Mt, this.options.renderer = this.options.renderer || new Cr, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ss
    }
    static parse(t, n) {
        return new Ve(n).parse(t)
    }
    static parseInline(t, n) {
        return new Ve(n).parseInline(t)
    }
    parse(t, n = !0) {
        var s, i;
        let r = "";
        for (let l = 0; l < t.length; l++) {
            const o = t[l];
            if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
                const c = o,
                    u = this.options.extensions.renderers[c.type].call({
                        parser: this
                    }, c);
                if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(c.type)) {
                    r += u || "";
                    continue
                }
            }
            const a = o;
            switch (a.type) {
                case "space": {
                    r += this.renderer.space(a);
                    continue
                }
                case "hr": {
                    r += this.renderer.hr(a);
                    continue
                }
                case "heading": {
                    r += this.renderer.heading(a);
                    continue
                }
                case "code": {
                    r += this.renderer.code(a);
                    continue
                }
                case "table": {
                    r += this.renderer.table(a);
                    continue
                }
                case "blockquote": {
                    r += this.renderer.blockquote(a);
                    continue
                }
                case "list": {
                    r += this.renderer.list(a);
                    continue
                }
                case "html": {
                    r += this.renderer.html(a);
                    continue
                }
                case "paragraph": {
                    r += this.renderer.paragraph(a);
                    continue
                }
                case "text": {
                    let c = a,
                        u = this.renderer.text(c);
                    for (; l + 1 < t.length && t[l + 1].type === "text";) c = t[++l], u += `
` + this.renderer.text(c);
                    n ? r += this.renderer.paragraph({
                        type: "paragraph",
                        raw: u,
                        text: u,
                        tokens: [{
                            type: "text",
                            raw: u,
                            text: u,
                            escaped: !0
                        }]
                    }) : r += u;
                    continue
                }
                default: {
                    const c = 'Token with "' + a.type + '" type was not found.';
                    if (this.options.silent) return console.error(c), "";
                    throw new Error(c)
                }
            }
        }
        return r
    }
    parseInline(t, n = this.renderer) {
        var s, i;
        let r = "";
        for (let l = 0; l < t.length; l++) {
            const o = t[l];
            if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
                const c = this.options.extensions.renderers[o.type].call({
                    parser: this
                }, o);
                if (c !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
                    r += c || "";
                    continue
                }
            }
            const a = o;
            switch (a.type) {
                case "escape": {
                    r += n.text(a);
                    break
                }
                case "html": {
                    r += n.html(a);
                    break
                }
                case "link": {
                    r += n.link(a);
                    break
                }
                case "image": {
                    r += n.image(a);
                    break
                }
                case "strong": {
                    r += n.strong(a);
                    break
                }
                case "em": {
                    r += n.em(a);
                    break
                }
                case "codespan": {
                    r += n.codespan(a);
                    break
                }
                case "br": {
                    r += n.br(a);
                    break
                }
                case "del": {
                    r += n.del(a);
                    break
                }
                case "text": {
                    r += n.text(a);
                    break
                }
                default: {
                    const c = 'Token with "' + a.type + '" type was not found.';
                    if (this.options.silent) return console.error(c), "";
                    throw new Error(c)
                }
            }
        }
        return r
    }
}
class Tn {
    options;
    block;
    constructor(t) {
        this.options = t || Mt
    }
    preprocess(t) {
        return t
    }
    postprocess(t) {
        return t
    }
    processAllTokens(t) {
        return t
    }
    provideLexer() {
        return this.block ? Be.lex : Be.lexInline
    }
    provideParser() {
        return this.block ? Ve.parse : Ve.parseInline
    }
}
Ts(Tn, "passThroughHooks", new Set(["preprocess", "postprocess", "processAllTokens"]));
class no {
    defaults = ms();
    options = this.setOptions;
    parse = this.parseMarkdown(!0);
    parseInline = this.parseMarkdown(!1);
    Parser = Ve;
    Renderer = Cr;
    TextRenderer = Ss;
    Lexer = Be;
    Tokenizer = _r;
    Hooks = Tn;
    constructor(...t) {
        this.use(...t)
    }
    walkTokens(t, n) {
        var s, i;
        let r = [];
        for (const l of t) switch (r = r.concat(n.call(this, l)), l.type) {
            case "table": {
                const o = l;
                for (const a of o.header) r = r.concat(this.walkTokens(a.tokens, n));
                for (const a of o.rows)
                    for (const c of a) r = r.concat(this.walkTokens(c.tokens, n));
                break
            }
            case "list": {
                const o = l;
                r = r.concat(this.walkTokens(o.items, n));
                break
            }
            default: {
                const o = l;
                (i = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && i[o.type] ? this.defaults.extensions.childTokens[o.type].forEach(a => {
                    const c = o[a].flat(1 / 0);
                    r = r.concat(this.walkTokens(c, n))
                }) : o.tokens && (r = r.concat(this.walkTokens(o.tokens, n)))
            }
        }
        return r
    }
    use(...t) {
        const n = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        return t.forEach(r => {
            const s = {
                ...r
            };
            if (s.async = this.defaults.async || s.async || !1, r.extensions && (r.extensions.forEach(i => {
                    if (!i.name) throw new Error("extension name required");
                    if ("renderer" in i) {
                        const l = n.renderers[i.name];
                        l ? n.renderers[i.name] = function(...o) {
                            let a = i.renderer.apply(this, o);
                            return a === !1 && (a = l.apply(this, o)), a
                        } : n.renderers[i.name] = i.renderer
                    }
                    if ("tokenizer" in i) {
                        if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                        const l = n[i.level];
                        l ? l.unshift(i.tokenizer) : n[i.level] = [i.tokenizer], i.start && (i.level === "block" ? n.startBlock ? n.startBlock.push(i.start) : n.startBlock = [i.start] : i.level === "inline" && (n.startInline ? n.startInline.push(i.start) : n.startInline = [i.start]))
                    }
                    "childTokens" in i && i.childTokens && (n.childTokens[i.name] = i.childTokens)
                }), s.extensions = n), r.renderer) {
                const i = this.defaults.renderer || new Cr(this.defaults);
                for (const l in r.renderer) {
                    if (!(l in i)) throw new Error(`renderer '${l}' does not exist`);
                    if (["options", "parser"].includes(l)) continue;
                    const o = l,
                        a = r.renderer[o],
                        c = i[o];
                    i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f || ""
                    }
                }
                s.renderer = i
            }
            if (r.tokenizer) {
                const i = this.defaults.tokenizer || new _r(this.defaults);
                for (const l in r.tokenizer) {
                    if (!(l in i)) throw new Error(`tokenizer '${l}' does not exist`);
                    if (["options", "rules", "lexer"].includes(l)) continue;
                    const o = l,
                        a = r.tokenizer[o],
                        c = i[o];
                    i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f
                    }
                }
                s.tokenizer = i
            }
            if (r.hooks) {
                const i = this.defaults.hooks || new Tn;
                for (const l in r.hooks) {
                    if (!(l in i)) throw new Error(`hook '${l}' does not exist`);
                    if (["options", "block"].includes(l)) continue;
                    const o = l,
                        a = r.hooks[o],
                        c = i[o];
                    Tn.passThroughHooks.has(l) ? i[o] = u => {
                        if (this.defaults.async) return Promise.resolve(a.call(i, u)).then(d => c.call(i, d));
                        const f = a.call(i, u);
                        return c.call(i, f)
                    } : i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f
                    }
                }
                s.hooks = i
            }
            if (r.walkTokens) {
                const i = this.defaults.walkTokens,
                    l = r.walkTokens;
                s.walkTokens = function(o) {
                    let a = [];
                    return a.push(l.call(this, o)), i && (a = a.concat(i.call(this, o))), a
                }
            }
            this.defaults = {
                ...this.defaults,
                ...s
            }
        }), this
    }
    setOptions(t) {
        return this.defaults = {
            ...this.defaults,
            ...t
        }, this
    }
    lexer(t, n) {
        return Be.lex(t, n ?? this.defaults)
    }
    parser(t, n) {
        return Ve.parse(t, n ?? this.defaults)
    }
    parseMarkdown(t) {
        return (r, s) => {
            const i = {
                    ...s
                },
                l = {
                    ...this.defaults,
                    ...i
                },
                o = this.onError(!!l.silent, !!l.async);
            if (this.defaults.async === !0 && i.async === !1) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
            if (typeof r > "u" || r === null) return o(new Error("marked(): input parameter is undefined or null"));
            if (typeof r != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
            l.hooks && (l.hooks.options = l, l.hooks.block = t);
            const a = l.hooks ? l.hooks.provideLexer() : t ? Be.lex : Be.lexInline,
                c = l.hooks ? l.hooks.provideParser() : t ? Ve.parse : Ve.parseInline;
            if (l.async) return Promise.resolve(l.hooks ? l.hooks.preprocess(r) : r).then(u => a(u, l)).then(u => l.hooks ? l.hooks.processAllTokens(u) : u).then(u => l.walkTokens ? Promise.all(this.walkTokens(u, l.walkTokens)).then(() => u) : u).then(u => c(u, l)).then(u => l.hooks ? l.hooks.postprocess(u) : u).catch(o);
            try {
                l.hooks && (r = l.hooks.preprocess(r));
                let u = a(r, l);
                l.hooks && (u = l.hooks.processAllTokens(u)), l.walkTokens && this.walkTokens(u, l.walkTokens);
                let f = c(u, l);
                return l.hooks && (f = l.hooks.postprocess(f)), f
            } catch (u) {
                return o(u)
            }
        }
    }
    onError(t, n) {
        return r => {
            if (r.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
                const s = "<p>An error occurred:</p><pre>" + Ye(r.message + "", !0) + "</pre>";
                return n ? Promise.resolve(s) : s
            }
            if (n) return Promise.reject(r);
            throw r
        }
    }
}
const Pt = new no;

function pe(e, t) {
    return Pt.parse(e, t)
}
pe.options = pe.setOptions = function(e) {
    return Pt.setOptions(e), pe.defaults = Pt.defaults, Hl(pe.defaults), pe
}, pe.getDefaults = ms, pe.defaults = Mt, pe.use = function(...e) {
    return Pt.use(...e), pe.defaults = Pt.defaults, Hl(pe.defaults), pe
}, pe.walkTokens = function(e, t) {
    return Pt.walkTokens(e, t)
}, pe.parseInline = Pt.parseInline, pe.Parser = Ve, pe.parser = Ve.parse, pe.Renderer = Cr, pe.TextRenderer = Ss, pe.Lexer = Be, pe.lexer = Be.lex, pe.Tokenizer = _r, pe.Hooks = Tn, pe.parse = pe;

function Sf(e) {
    if (typeof e == "function" && (e = {
            highlight: e
        }), !e || typeof e.highlight != "function") throw new Error("Must provide highlight function");
    return typeof e.langPrefix != "string" && (e.langPrefix = "language-"), typeof e.emptyLangClass != "string" && (e.emptyLangClass = ""), {
        async: !!e.async,
        walkTokens(t) {
            if (t.type !== "code") return;
            const n = ro(t.lang);
            if (e.async) return Promise.resolve(e.highlight(t.text, n, t.lang || "")).then(so(t));
            const r = e.highlight(t.text, n, t.lang || "");
            if (r instanceof Promise) throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
            so(t)(r)
        },
        useNewRenderer: !0,
        renderer: {
            code(t, n, r) {
                typeof t == "object" && (r = t.escaped, n = t.lang, t = t.text);
                const s = ro(n),
                    i = s ? e.langPrefix + ao(s) : e.emptyLangClass,
                    l = i ? ` class="${i}"` : "";
                return t = t.replace(/\n$/, ""), `<pre><code${l}>${r?t:ao(t,!0)}
</code></pre>`
            }
        }
    }
}

function ro(e) {
    return (e || "").match(/\S*/)[0]
}

function so(e) {
    return t => {
        typeof t == "string" && t !== e.text && (e.escaped = !0, e.text = t)
    }
}
const io = /[&<>"']/,
    $f = new RegExp(io.source, "g"),
    lo = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    Rf = new RegExp(lo.source, "g"),
    Af = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    oo = e => Af[e];

function ao(e, t) {
    if (t) {
        if (io.test(e)) return e.replace($f, oo)
    } else if (lo.test(e)) return e.replace(Rf, oo);
    return e
}
const Ef = /\$.*?\$/,
    Tf = /^\$(.*?)\$/,
    If = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/,
    Lf = e => [{
        name: "blockMath",
        level: "block",
        tokenizer(t) {
            const n = If.exec(t);
            if (n !== null) return {
                type: "html",
                raw: n[0],
                text: e(!0, n[1])
            }
        }
    }, {
        name: "inlineMath",
        level: "inline",
        start(t) {
            const n = t.search(Ef);
            return n !== -1 ? n : t.length
        },
        tokenizer(t) {
            const n = Tf.exec(t);
            if (n !== null) return {
                type: "html",
                raw: n[0],
                text: e(!1, n[1])
            }
        }
    }],
    co = (e = "", t = {}) => e.replace(/:(.+?):/g, (n, r) => t[r] ? `<img class="wl-emoji" src="${t[r]}" alt="${r}">` : n),
    Mf = (e, {
        emojiMap: t,
        highlighter: n,
        texRenderer: r
    }) => {
        const s = new no;
        if (s.setOptions({
                breaks: !0
            }), n && s.use(Sf({
                highlight: n
            })), r) {
            const i = Lf(r);
            s.use({
                extensions: i
            })
        }
        return s.parse(co(e, t))
    },
    $s = e => {
        const {
            path: t
        } = e.dataset;
        return t != null && t.length ? t : null
    },
    Pf = e => e.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu),
    Of = e => e.match(/[\u4E00-\u9FD5]/gu),
    jf = e => {
        var t, n;
        return (((t = Pf(e)) == null ? void 0 : t.reduce((r, s) => r + (["", ",", "."].includes(s.trim()) ? 0 : s.trim().split(/\s+/u).length), 0)) ?? 0) + (((n = Of(e)) == null ? void 0 : n.length) ?? 0)
    },
    zf = async () => {
        const {
            userAgentData: e
        } = navigator;
        let t = navigator.userAgent;
        if (!e || e.platform !== "Windows") return t;
        const {
            platformVersion: n
        } = await e.getHighEntropyValues(["platformVersion"]);
        return n && parseInt(n.split(".")[0]) >= 13 && (t = t.replace("Windows NT 10.0", "Windows NT 11.0")), t
    }, uo = ({
        serverURL: e,
        path: t = window.location.pathname,
        selector: n = ".waline-comment-count",
        lang: r = navigator.language
    }) => {
        const s = new AbortController,
            i = document.querySelectorAll(n);
        return i.length && Os({
            serverURL: Hn(e),
            paths: Array.from(i).map(l => ti($s(l) ?? t)),
            lang: r,
            signal: s.signal
        }).then(l => {
            i.forEach((o, a) => {
                o.innerText = l[a].toString()
            })
        }).catch(Dl), s.abort.bind(s)
    }, fo = ({
        size: e
    }) => te("svg", {
        class: "wl-close-icon",
        viewBox: "0 0 1024 1024",
        width: e,
        height: e
    }, [te("path", {
        d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z",
        fill: "currentColor"
    }), te("path", {
        d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z",
        fill: "#888"
    })]), Df = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, te("path", {
        d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z",
        fill: "red"
    })), Ff = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, te("path", {
        d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z",
        fill: "currentColor"
    })), Hf = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, [te("path", {
        d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z",
        fill: "currentColor"
    }), te("path", {
        d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z",
        fill: "currentColor"
    })]), Uf = ({
        active: e = !1
    }) => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, [te("path", {
        d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e?"":"M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`,
        fill: e ? "red" : "currentColor"
    })]), Nf = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, [te("path", {
        d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0",
        fill: "currentColor"
    }), te("path", {
        d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0",
        fill: "currentColor"
    })]), Bf = () => te("svg", {
        width: "16",
        height: "16",
        ariaHidden: "true"
    }, te("path", {
        d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z",
        fill: "currentColor"
    })), Vf = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, te("path", {
        d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z",
        fill: "currentColor"
    })), Wf = () => te("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, te("path", {
        d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z",
        fill: "currentColor"
    })), qf = () => te("svg", {
        class: "verified-icon",
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
    }, te("path", {
        d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z",
        fill: "#27ae60"
    })), In = ({
        size: e = 100
    }) => te("svg", {
        width: e,
        height: e,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid"
    }, te("circle", {
        cx: 50,
        cy: 50,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        r: "40",
        "stroke-dasharray": "85 30"
    }, te("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        repeatCount: "indefinite",
        dur: "1s",
        values: "0 50 50;360 50 50",
        keyTimes: "0;1"
    }))), Kf = () => te("svg", {
        width: 24,
        height: 24,
        fill: "currentcolor",
        viewBox: "0 0 24 24"
    }, [te("path", {
        style: "transform: translateY(0.5px)",
        d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z"
    }), te("path", {
        d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z"
    })]), Gf = () => Qt("WALINE_USER_META", {
        nick: "",
        mail: "",
        link: ""
    }), Zf = () => Qt("WALINE_COMMENT_BOX_EDITOR", ""), Jf = "WALINE_LIKE", Yf = Qt(Jf, []), ho = () => Yf, Qf = "WALINE_REACTION", Xf = Qt(Qf, {}), eh = () => Xf;
var Rs = {},
    at = {},
    ct = {},
    po;

function go() {
    if (po) return ct;
    po = 1;
    var e = ct && ct.__awaiter || function(r, s, i, l) {
            function o(a) {
                return a instanceof i ? a : new i(function(c) {
                    c(a)
                })
            }
            return new(i || (i = Promise))(function(a, c) {
                function u(m) {
                    try {
                        d(l.next(m))
                    } catch (x) {
                        c(x)
                    }
                }

                function f(m) {
                    try {
                        d(l.throw(m))
                    } catch (x) {
                        c(x)
                    }
                }

                function d(m) {
                    m.done ? a(m.value) : o(m.value).then(u, f)
                }
                d((l = l.apply(r, s || [])).next())
            })
        },
        t = ct && ct.__generator || function(r, s) {
            var i = {
                    label: 0,
                    sent: function() {
                        if (a[0] & 1) throw a[1];
                        return a[1]
                    },
                    trys: [],
                    ops: []
                },
                l, o, a, c;
            return c = {
                next: u(0),
                throw: u(1),
                return: u(2)
            }, typeof Symbol == "function" && (c[Symbol.iterator] = function() {
                return this
            }), c;

            function u(d) {
                return function(m) {
                    return f([d, m])
                }
            }

            function f(d) {
                if (l) throw new TypeError("Generator is already executing.");
                for (; c && (c = 0, d[0] && (i = 0)), i;) try {
                    if (l = 1, o && (a = d[0] & 2 ? o.return : d[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, d[1])).done) return a;
                    switch (o = 0, a && (d = [d[0] & 2, a.value]), d[0]) {
                        case 0:
                        case 1:
                            a = d;
                            break;
                        case 4:
                            return i.label++, {
                                value: d[1],
                                done: !1
                            };
                        case 5:
                            i.label++, o = d[1], d = [0];
                            continue;
                        case 7:
                            d = i.ops.pop(), i.trys.pop();
                            continue;
                        default:
                            if (a = i.trys, !(a = a.length > 0 && a[a.length - 1]) && (d[0] === 6 || d[0] === 2)) {
                                i = 0;
                                continue
                            }
                            if (d[0] === 3 && (!a || d[1] > a[0] && d[1] < a[3])) {
                                i.label = d[1];
                                break
                            }
                            if (d[0] === 6 && i.label < a[1]) {
                                i.label = a[1], a = d;
                                break
                            }
                            if (a && i.label < a[2]) {
                                i.label = a[2], i.ops.push(d);
                                break
                            }
                            a[2] && i.ops.pop(), i.trys.pop();
                            continue
                    }
                    d = s.call(r, i)
                } catch (m) {
                    d = [6, m], o = 0
                } finally {
                    l = a = 0
                }
                if (d[0] & 5) throw d[1];
                return {
                    value: d[0] ? d[1] : void 0,
                    done: !0
                }
            }
        };
    Object.defineProperty(ct, "__esModule", {
        value: !0
    }), ct.ReCaptchaInstance = void 0;
    var n = function() {
        function r(s, i, l) {
            this.siteKey = s, this.recaptchaID = i, this.recaptcha = l, this.styleContainer = null
        }
        return r.prototype.execute = function(s) {
            return e(this, void 0, void 0, function() {
                var i;
                return t(this, function(l) {
                    switch (l.label) {
                        case 0:
                            return this.recaptcha.enterprise ? [4, this.recaptcha.enterprise.execute(this.recaptchaID, {
                                action: s
                            })] : [3, 2];
                        case 1:
                            return i = l.sent(), [3, 4];
                        case 2:
                            return [4, this.recaptcha.execute(this.recaptchaID, {
                                action: s
                            })];
                        case 3:
                            i = l.sent(), l.label = 4;
                        case 4:
                            return [2, i]
                    }
                })
            })
        }, r.prototype.getSiteKey = function() {
            return this.siteKey
        }, r.prototype.hideBadge = function() {
            this.styleContainer === null && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer))
        }, r.prototype.showBadge = function() {
            this.styleContainer !== null && (document.head.removeChild(this.styleContainer), this.styleContainer = null)
        }, r
    }();
    return ct.ReCaptchaInstance = n, ct
}
var mo;

function th() {
    if (mo) return at;
    mo = 1;
    var e = at && at.__assign || function() {
        return e = Object.assign || function(s) {
            for (var i, l = 1, o = arguments.length; l < o; l++) {
                i = arguments[l];
                for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (s[a] = i[a])
            }
            return s
        }, e.apply(this, arguments)
    };
    Object.defineProperty(at, "__esModule", {
        value: !0
    }), at.getInstance = at.load = void 0;
    var t = go(),
        n;
    (function(s) {
        s[s.NOT_LOADED = 0] = "NOT_LOADED", s[s.LOADING = 1] = "LOADING", s[s.LOADED = 2] = "LOADED"
    })(n || (n = {}));
    var r = function() {
        function s() {}
        return s.load = function(i, l) {
            if (l === void 0 && (l = {}), typeof document > "u") return Promise.reject(new Error("This is a library for the browser!"));
            if (s.getLoadingState() === n.LOADED) return s.instance.getSiteKey() === i ? Promise.resolve(s.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
            if (s.getLoadingState() === n.LOADING) return i !== s.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function(a, c) {
                s.successfulLoadingConsumers.push(function(u) {
                    return a(u)
                }), s.errorLoadingRunnable.push(function(u) {
                    return c(u)
                })
            });
            s.instanceSiteKey = i, s.setLoadingState(n.LOADING);
            var o = new s;
            return new Promise(function(a, c) {
                o.loadScript(i, l.useRecaptchaNet || !1, l.useEnterprise || !1, l.renderParameters ? l.renderParameters : {}, l.customUrl).then(function() {
                    s.setLoadingState(n.LOADED);
                    var u = o.doExplicitRender(grecaptcha, i, l.explicitRenderParameters ? l.explicitRenderParameters : {}, l.useEnterprise || !1),
                        f = new t.ReCaptchaInstance(i, u, grecaptcha);
                    s.successfulLoadingConsumers.forEach(function(d) {
                        return d(f)
                    }), s.successfulLoadingConsumers = [], l.autoHideBadge && f.hideBadge(), s.instance = f, a(f)
                }).catch(function(u) {
                    s.errorLoadingRunnable.forEach(function(f) {
                        return f(u)
                    }), s.errorLoadingRunnable = [], c(u)
                })
            })
        }, s.getInstance = function() {
            return s.instance
        }, s.setLoadingState = function(i) {
            s.loadingState = i
        }, s.getLoadingState = function() {
            return s.loadingState === null ? n.NOT_LOADED : s.loadingState
        }, s.prototype.loadScript = function(i, l, o, a, c) {
            var u = this;
            l === void 0 && (l = !1), o === void 0 && (o = !1), a === void 0 && (a = {}), c === void 0 && (c = "");
            var f = document.createElement("script");
            f.setAttribute("recaptcha-v3-script", ""), f.setAttribute("async", ""), f.setAttribute("defer", "");
            var d = "https://www.google.com/recaptcha/api.js";
            l ? o ? d = "https://recaptcha.net/recaptcha/enterprise.js" : d = "https://recaptcha.net/recaptcha/api.js" : o && (d = "https://www.google.com/recaptcha/enterprise.js"), c && (d = c), a.render && (a.render = void 0);
            var m = this.buildQueryString(a);
            return f.src = d + "?render=explicit" + m, new Promise(function(x, b) {
                f.addEventListener("load", u.waitForScriptToLoad(function() {
                    x(f)
                }, o), !1), f.onerror = function(T) {
                    s.setLoadingState(n.NOT_LOADED), b(T)
                }, document.head.appendChild(f)
            })
        }, s.prototype.buildQueryString = function(i) {
            var l = Object.keys(i);
            return l.length < 1 ? "" : "&" + Object.keys(i).filter(function(o) {
                return !!i[o]
            }).map(function(o) {
                return o + "=" + i[o]
            }).join("&")
        }, s.prototype.waitForScriptToLoad = function(i, l) {
            var o = this;
            return function() {
                window.grecaptcha === void 0 ? setTimeout(function() {
                    o.waitForScriptToLoad(i, l)
                }, s.SCRIPT_LOAD_DELAY) : l ? window.grecaptcha.enterprise.ready(function() {
                    i()
                }) : window.grecaptcha.ready(function() {
                    i()
                })
            }
        }, s.prototype.doExplicitRender = function(i, l, o, a) {
            var c = e({
                sitekey: l
            }, o);
            return o.container ? a ? i.enterprise.render(o.container, c) : i.render(o.container, c) : a ? i.enterprise.render(c) : i.render(c)
        }, s.loadingState = null, s.instance = null, s.instanceSiteKey = null, s.successfulLoadingConsumers = [], s.errorLoadingRunnable = [], s.SCRIPT_LOAD_DELAY = 25, s
    }();
    return at.load = r.load, at.getInstance = r.getInstance, at
}
var vo;

function nh() {
    return vo || (vo = 1, function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.ReCaptchaInstance = e.getInstance = e.load = void 0;
        var t = th();
        Object.defineProperty(e, "load", {
            enumerable: !0,
            get: function() {
                return t.load
            }
        }), Object.defineProperty(e, "getInstance", {
            enumerable: !0,
            get: function() {
                return t.getInstance
            }
        });
        var n = go();
        Object.defineProperty(e, "ReCaptchaInstance", {
            enumerable: !0,
            get: function() {
                return n.ReCaptchaInstance
            }
        })
    }(Rs)), Rs
}
var rh = nh();
const bo = {},
    sh = e => {
        const t = bo[e] ?? (bo[e] = rh.load(e, {
            useRecaptchaNet: !0,
            autoHideBadge: !0
        }));
        return {
            execute: n => t.then(r => r.execute(n))
        }
    },
    ih = e => ({
        execute: async t => {
            const {
                load: n
            } = Ou("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, {
                async: !1
            });
            await n();
            const r = window.turnstile;
            return new Promise(s => {
                r == null || r.ready(() => {
                    r.render(".wl-captcha-container", {
                        sitekey: e,
                        action: t,
                        size: "compact",
                        callback: s
                    })
                })
            })
        }
    }),
    lh = "WALINE_USER",
    oh = Qt(lh, {}),
    Sr = () => oh,
    ah = {
        key: 0,
        class: "wl-reaction"
    },
    ch = ["textContent"],
    uh = {
        class: "wl-reaction-list"
    },
    fh = ["onClick"],
    hh = {
        class: "wl-reaction-img"
    },
    ph = ["src", "alt"],
    dh = ["textContent"],
    gh = ["textContent"];
var mh = mn({
        __name: "ArticleReaction",
        setup(e) {
            const t = eh(),
                n = sr(Fn),
                r = se(-1),
                s = se([]),
                i = ge(() => n.value.locale),
                l = ge(() => {
                    const {
                        reaction: f
                    } = n.value;
                    return f != null && f.length ? f : null
                }),
                o = ge(() => {
                    var f;
                    const {
                        path: d
                    } = n.value;
                    return ((f = l.value) == null ? void 0 : f.map((m, x) => ({
                        icon: m,
                        desc: i.value[`reaction${x}`],
                        active: t.value[d] === x
                    }))) ?? null
                });
            let a;
            const c = async () => {
                const {
                    serverURL: f,
                    lang: d,
                    path: m
                } = n.value;
                if (!l.value) return;
                const x = new AbortController;
                a = x.abort.bind(x);
                const [b] = await Rr({
                    serverURL: f,
                    lang: d,
                    paths: [m],
                    type: l.value.map((T, w) => `reaction${w}`),
                    signal: x.signal
                });
                s.value = l.value.map((T, w) => b[`reaction${w}`])
            }, u = async f => {
                if (r.value !== -1) return;
                const {
                    serverURL: d,
                    lang: m,
                    path: x
                } = n.value, b = t.value[x];
                r.value = f, b !== void 0 && (await zn({
                    serverURL: d,
                    lang: m,
                    path: x,
                    type: `reaction${b}`,
                    action: "desc"
                }), s.value[b] = Math.max(s.value[b] - 1, 0)), b !== f && (await zn({
                    serverURL: d,
                    lang: m,
                    path: x,
                    type: `reaction${f}`
                }), s.value[f] = (s.value[f] || 0) + 1), b === f ? delete t.value[x] : t.value[x] = f, r.value = -1
            };
            return bn(() => {
                Yt(() => [n.value.serverURL, n.value.path], () => c())
            }), Xr(() => {
                a == null || a()
            }), (f, d) => o.value ? (L(), P("div", ah, [D("div", {
                class: "wl-reaction-title",
                textContent: Y(i.value.reactionTitle)
            }, null, 8, ch), D("ul", uh, [(L(!0), P(fe, null, Fe(o.value, ({
                active: m,
                icon: x,
                desc: b
            }, T) => (L(), P("li", {
                key: T,
                class: me(["wl-reaction-item", {
                    active: m
                }]),
                onClick: w => u(T)
            }, [D("div", hh, [D("img", {
                src: x,
                alt: b
            }, null, 8, ph), r.value === T ? (L(), st(K(In), {
                key: 0,
                class: "wl-reaction-loading"
            })) : (L(), P("div", {
                key: 1,
                class: "wl-reaction-votes",
                textContent: Y(s.value[T] || 0)
            }, null, 8, dh))]), D("div", {
                class: "wl-reaction-text",
                textContent: Y(b)
            }, null, 8, gh)], 10, fh))), 128))])])) : J("v-if", !0)
        }
    }),
    Ln = new Map;

function vh(e) {
    var t = Ln.get(e);
    t && t.destroy()
}

function bh(e) {
    var t = Ln.get(e);
    t && t.update()
}
var Mn = null;
typeof window > "u" ? ((Mn = function(e) {
    return e
}).destroy = function(e) {
    return e
}, Mn.update = function(e) {
    return e
}) : ((Mn = function(e, t) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], function(n) {
        return function(r) {
            if (r && r.nodeName && r.nodeName === "TEXTAREA" && !Ln.has(r)) {
                var s, i = null,
                    l = window.getComputedStyle(r),
                    o = (s = r.value, function() {
                        c({
                            testForHeightReduction: s === "" || !r.value.startsWith(s),
                            restoreTextAlign: null
                        }), s = r.value
                    }),
                    a = (function(f) {
                        r.removeEventListener("autosize:destroy", a), r.removeEventListener("autosize:update", u), r.removeEventListener("input", o), window.removeEventListener("resize", u), Object.keys(f).forEach(function(d) {
                            return r.style[d] = f[d]
                        }), Ln.delete(r)
                    }).bind(r, {
                        height: r.style.height,
                        resize: r.style.resize,
                        textAlign: r.style.textAlign,
                        overflowY: r.style.overflowY,
                        overflowX: r.style.overflowX,
                        wordWrap: r.style.wordWrap
                    });
                r.addEventListener("autosize:destroy", a), r.addEventListener("autosize:update", u), r.addEventListener("input", o), window.addEventListener("resize", u), r.style.overflowX = "hidden", r.style.wordWrap = "break-word", Ln.set(r, {
                    destroy: a,
                    update: u
                }), u()
            }

            function c(f) {
                var d, m, x = f.restoreTextAlign,
                    b = x === void 0 ? null : x,
                    T = f.testForHeightReduction,
                    w = T === void 0 || T,
                    C = l.overflowY;
                if (r.scrollHeight !== 0 && (l.resize === "vertical" ? r.style.resize = "none" : l.resize === "both" && (r.style.resize = "horizontal"), w && (d = function(I) {
                        for (var O = []; I && I.parentNode && I.parentNode instanceof Element;) I.parentNode.scrollTop && O.push([I.parentNode, I.parentNode.scrollTop]), I = I.parentNode;
                        return function() {
                            return O.forEach(function(G) {
                                var j = G[0],
                                    oe = G[1];
                                j.style.scrollBehavior = "auto", j.scrollTop = oe, j.style.scrollBehavior = null
                            })
                        }
                    }(r), r.style.height = ""), m = l.boxSizing === "content-box" ? r.scrollHeight - (parseFloat(l.paddingTop) + parseFloat(l.paddingBottom)) : r.scrollHeight + parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth), l.maxHeight !== "none" && m > parseFloat(l.maxHeight) ? (l.overflowY === "hidden" && (r.style.overflow = "scroll"), m = parseFloat(l.maxHeight)) : l.overflowY !== "hidden" && (r.style.overflow = "hidden"), r.style.height = m + "px", b && (r.style.textAlign = b), d && d(), i !== m && (r.dispatchEvent(new Event("autosize:resized", {
                        bubbles: !0
                    })), i = m), C !== l.overflow && !b)) {
                    var N = l.textAlign;
                    l.overflow === "hidden" && (r.style.textAlign = N === "start" ? "end" : "start"), c({
                        restoreTextAlign: N,
                        testForHeightReduction: !0
                    })
                }
            }

            function u() {
                c({
                    testForHeightReduction: !0,
                    restoreTextAlign: null
                })
            }
        }(n)
    }), e
}).destroy = function(e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], vh), e
}, Mn.update = function(e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], bh), e
});
var yo = Mn;
const yh = ["data-index"],
    wh = ["src", "title", "onClick"];
var kh = mn({
    __name: "ImageWall",
    props: {
        items: {
            default: () => []
        },
        columnWidth: {
            default: 300
        },
        gap: {
            default: 0
        }
    },
    emits: ["insert"],
    setup(e) {
        const t = e;
        let n = null;
        const r = pt("wall"),
            s = se({}),
            i = se([]),
            l = () => {
                const f = Math.floor((r.value.getBoundingClientRect().width + t.gap) / (t.columnWidth + t.gap));
                return f > 0 ? f : 1
            },
            o = f => new Array(f).fill(null).map(() => []),
            a = async f => {
                var d;
                if (f >= t.items.length) return;
                await Kt();
                const m = Array.from(((d = r.value) == null ? void 0 : d.children) ?? []).reduce((x, b) => b.getBoundingClientRect().height < x.getBoundingClientRect().height ? b : x);
                i.value[Number(m.dataset.index)].push(f), await a(f + 1)
            }, c = async (f = !1) => {
                if (i.value.length === l() && !f) return;
                i.value = o(l());
                const d = window.scrollY;
                await a(0), window.scrollTo({
                    top: d
                })
            }, u = f => {
                s.value[f.target.src] = !0
            };
        return bn(() => {
            c(!0), n = new ResizeObserver(() => {
                c()
            }), n.observe(r.value), dt(() => [t.items], () => {
                s.value = {}, c(!0)
            }), dt(() => [t.columnWidth, t.gap], () => {
                c()
            })
        }), Ya(() => {
            n.unobserve(r.value)
        }), (f, d) => (L(), P("div", {
            ref_key: "wall",
            ref: r,
            class: "wl-gallery",
            style: on({
                gap: `${f.gap}px`
            })
        }, [(L(!0), P(fe, null, Fe(i.value, (m, x) => (L(), P("div", {
            key: x,
            class: "wl-gallery-column",
            "data-index": x,
            style: on({
                gap: `${f.gap}px`
            })
        }, [(L(!0), P(fe, null, Fe(m, b => (L(), P(fe, {
            key: b
        }, [s.value[f.items[b].src] ? J("v-if", !0) : (L(), st(K(In), {
            key: 0,
            size: 36,
            style: {
                margin: "20px auto"
            }
        })), D("img", {
            class: "wl-gallery-item",
            src: f.items[b].src,
            title: f.items[b].title,
            loading: "lazy",
            onLoad: u,
            onClick: T => f.$emit("insert", `![](${f.items[b].src})`)
        }, null, 40, wh)], 64))), 128))], 12, yh))), 128))], 4))
    }
});
const xh = {
        key: 0,
        class: "wl-login-info"
    },
    _h = {
        class: "wl-avatar"
    },
    Ch = ["title"],
    Sh = ["title"],
    $h = ["src"],
    Rh = ["title", "textContent"],
    Ah = {
        class: "wl-panel"
    },
    Eh = ["for", "textContent"],
    Th = ["id", "onUpdate:modelValue", "name", "type"],
    Ih = ["placeholder"],
    Lh = {
        class: "wl-preview"
    },
    Mh = ["innerHTML"],
    Ph = {
        class: "wl-footer"
    },
    Oh = {
        class: "wl-actions"
    },
    jh = {
        href: "https://guides.github.com/features/mastering-markdown/",
        title: "Markdown Guide",
        "aria-label": "Markdown is supported",
        class: "wl-action",
        target: "_blank",
        rel: "noopener noreferrer"
    },
    zh = ["title"],
    Dh = ["title"],
    Fh = ["title", "aria-label"],
    Hh = ["title"],
    Uh = {
        class: "wl-info"
    },
    Nh = {
        class: "wl-text-number"
    },
    Bh = {
        key: 0
    },
    Vh = ["textContent"],
    Wh = ["textContent"],
    qh = ["disabled"],
    Kh = ["placeholder"],
    Gh = {
        key: 1,
        class: "wl-loading"
    },
    Zh = {
        key: 0,
        class: "wl-tab-wrapper"
    },
    Jh = ["title", "onClick"],
    Yh = ["src", "alt"],
    Qh = {
        key: 0,
        class: "wl-tabs"
    },
    Xh = ["onClick"],
    ep = ["src", "alt", "title"],
    tp = ["title"];
var wo = mn({
    __name: "CommentBox",
    props: {
        edit: {},
        rootId: {},
        replyId: {},
        replyUser: {}
    },
    emits: ["log", "cancelEdit", "cancelReply", "submit"],
    setup(e, {
        emit: t
    }) {
        const n = e,
            r = t,
            s = sr(Fn),
            i = Zf(),
            l = Gf(),
            o = Sr(),
            a = se({}),
            c = pt("textarea"),
            u = pt("image-uploader"),
            f = pt("emoji-button"),
            d = pt("emoji-popup"),
            m = pt("gif-button"),
            x = pt("gif-popup"),
            b = pt("gif-search"),
            T = se({
                tabs: [],
                map: {}
            }),
            w = se(0),
            C = se(!1),
            N = se(!1),
            I = se(!1),
            O = se(""),
            G = se(0),
            j = pn({
                loading: !0,
                list: []
            }),
            oe = se(0),
            ae = se(!1),
            Me = se(""),
            E = se(!1),
            B = se(!1),
            F = ge(() => s.value.locale),
            de = ge(() => !!o.value.token),
            we = ge(() => mu(s.value.imageUploader)),
            be = z => {
                const R = c.value,
                    W = R.selectionStart,
                    h = R.selectionEnd || 0,
                    p = R.scrollTop;
                i.value = R.value.substring(0, W) + z + R.value.substring(h, R.value.length), R.focus(), R.selectionStart = W + z.length, R.selectionEnd = W + z.length, R.scrollTop = p
            },
            Qe = ({
                key: z,
                ctrlKey: R,
                metaKey: W
            }) => {
                E.value || (R || W) && z === "Enter" && Ue()
            },
            ut = async z => {
                const R = `![${s.value.locale.uploading} ${z.name}]()`;
                be(R), E.value = !0;
                try {
                    const W = await s.value.imageUploader(z);
                    i.value = i.value.replace(R, `\r
![${z.name}](${W})`)
                } catch (W) {
                    alert(W.message), i.value = i.value.replace(R, "")
                } finally {
                    E.value = !1
                }
            }, Xt = z => {
                var R;
                if ((R = z.dataTransfer) != null && R.items) {
                    const W = Fl(z.dataTransfer.items);
                    W && we.value && (ut(W), z.preventDefault())
                }
            }, Pn = z => {
                if (z.clipboardData) {
                    const R = Fl(z.clipboardData.items);
                    R && we.value && ut(R)
                }
            }, Ot = () => {
                const z = u.value;
                z.files && we.value && ut(z.files[0]).then(() => {
                    z.value = ""
                })
            }, Ue = async () => {
                var z;
                const {
                    serverURL: R,
                    lang: W,
                    login: h,
                    wordLimit: p,
                    requiredMeta: g,
                    recaptchaV3Key: y,
                    turnstileKey: k
                } = s.value, v = {
                    comment: Me.value,
                    nick: l.value.nick,
                    mail: l.value.mail,
                    link: l.value.link,
                    url: s.value.path,
                    ua: await zf()
                };
                if (!n.edit)
                    if (o.value.token) v.nick = o.value.display_name, v.mail = o.value.email, v.link = o.value.url;
                    else {
                        if (h === "force") return;
                        if (g.includes("nick") && !v.nick) {
                            a.value.nick.focus(), alert(F.value.nickError);
                            return
                        }
                        if (g.includes("mail") && !v.mail || v.mail && !Go(v.mail)) {
                            a.value.mail.focus(), alert(F.value.mailError);
                            return
                        }
                        v.nick || (v.nick = F.value.anonymous)
                    } if (!v.comment) {
                    c.value.focus();
                    return
                }
                if (!ae.value) {
                    alert(F.value.wordHint.replace("$0", p[0].toString()).replace("$1", p[1].toString()).replace("$2", G.value.toString()));
                    return
                }
                v.comment = co(v.comment, T.value.map), n.replyId && n.rootId && (v.pid = n.replyId, v.rid = n.rootId, v.at = n.replyUser), E.value = !0;
                try {
                    y && (v.recaptchaV3 = await sh(y).execute("social")), k && (v.turnstile = await ih(k).execute("social"));
                    const A = {
                            serverURL: R,
                            lang: W,
                            token: o.value.token,
                            comment: v
                        },
                        S = await (n.edit ? nn({
                            objectId: n.edit.objectId,
                            ...A
                        }) : Ms(A));
                    if (E.value = !1, S.errmsg) {
                        alert(S.errmsg);
                        return
                    }
                    r("submit", S.data), i.value = "", O.value = "", await Kt(), n.replyId && r("cancelReply"), (z = n.edit) != null && z.objectId && r("cancelEdit")
                } catch (A) {
                    E.value = !1, alert(A.message)
                }
            }, On = z => {
                z.preventDefault();
                const {
                    lang: R,
                    serverURL: W
                } = s.value;
                js({
                    serverURL: W,
                    lang: R
                }).then(h => {
                    o.value = h, (h.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(h)), r("log")
                })
            }, $r = () => {
                o.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), r("log")
            }, jn = z => {
                z.preventDefault();
                const {
                    lang: R,
                    serverURL: W
                } = s.value, h = 800, p = 800, g = (window.innerWidth - h) / 2, y = (window.innerHeight - p) / 2, k = new URLSearchParams({
                    lng: R,
                    token: o.value.token
                }), v = window.open(`${W}/ui/profile?${k.toString()}`, "_blank", `width=${h},height=${p},left=${g},top=${y},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
                v == null || v.postMessage({
                    type: "TOKEN",
                    data: o.value.token
                }, "*")
            }, vt = z => {
                var R, W, h, p;
                !((R = f.value) != null && R.contains(z.target)) && !((W = d.value) != null && W.contains(z.target)) && (C.value = !1), !((h = m.value) != null && h.contains(z.target)) && !((p = x.value) != null && p.contains(z.target)) && (N.value = !1)
            }, bt = async z => {
                var R;
                const {
                    scrollTop: W,
                    clientHeight: h,
                    scrollHeight: p
                } = z.target, g = (h + W) / p, y = s.value.search, k = ((R = b.value) == null ? void 0 : R.value) ?? "";
                g < .9 || j.loading || B.value || (j.loading = !0, (y.more && j.list.length ? await y.more(k, j.list.length) : await y.search(k)).length ? j.list = [...j.list, ...y.more && j.list.length ? await y.more(k, j.list.length) : await y.search(k)] : B.value = !0, j.loading = !1, setTimeout(() => {
                    z.target.scrollTop = W
                }, 50))
            }, jt = xu(z => {
                j.list = [], B.value = !1, bt(z)
            }, 300);
        return Lt("click", vt), Lt("message", ({
            data: z
        }) => {
            !z || z.type !== "profile" || (o.value = {
                ...o.value,
                ...z.data
            }, [localStorage, sessionStorage].filter(R => R.getItem("WALINE_USER")).forEach(R => {
                R.setItem("WALINE_USER", JSON.stringify(o))
            }))
        }), Yt([s, G], ([z, R]) => {
            const {
                wordLimit: W
            } = z;
            W ? R < W[0] && W[0] !== 0 ? (oe.value = W[0], ae.value = !1) : R > W[1] ? (oe.value = W[1], ae.value = !1) : (oe.value = W[1], ae.value = !0) : (oe.value = 0, ae.value = !0)
        }), dt(N, async z => {
            var R;
            if (!z) return;
            const W = s.value.search;
            b.value && (b.value.value = ""), j.loading = !0, j.list = await (((R = W.default) == null ? void 0 : R.call(W)) ?? W.search("")), j.loading = !1
        }), bn(() => {
            var z;
            (z = n.edit) != null && z.objectId && (i.value = n.edit.orig), Yt(() => i.value, R => {
                const {
                    highlighter: W,
                    texRenderer: h
                } = s.value;
                Me.value = R, O.value = Mf(R, {
                    emojiMap: T.value.map,
                    highlighter: W,
                    texRenderer: h
                }), G.value = jf(R), R ? yo(c.value) : yo.destroy(c.value)
            }), Yt(() => s.value.emoji, async R => {
                T.value = await Uu(R)
            })
        }), (z, R) => {
            var W, h;
            return L(), P("div", {
                key: K(o).token,
                class: "wl-comment"
            }, [K(s).login !== "disable" && de.value && !((W = z.edit) != null && W.objectId) ? (L(), P("div", xh, [D("div", _h, [D("button", {
                type: "submit",
                class: "wl-logout-btn",
                title: F.value.logout,
                onClick: $r
            }, [le(K(fo), {
                size: 14
            })], 8, Ch), D("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: F.value.profile,
                onClick: jn
            }, [D("img", {
                src: K(o).avatar,
                alt: "avatar"
            }, null, 8, $h)], 8, Sh)]), D("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: F.value.profile,
                onClick: jn,
                textContent: Y(K(o).display_name)
            }, null, 8, Rh)])) : J("v-if", !0), D("div", Ah, [K(s).login !== "force" && K(s).meta.length && !de.value ? (L(), P("div", {
                key: 0,
                class: me(["wl-header", `item${K(s).meta.length}`])
            }, [(L(!0), P(fe, null, Fe(K(s).meta, p => (L(), P("div", {
                key: p,
                class: "wl-header-item"
            }, [D("label", {
                for: `wl-${p}`,
                textContent: Y(F.value[p] + (K(s).requiredMeta.includes(p) || !K(s).requiredMeta.length ? "" : `(${F.value.optional})`))
            }, null, 8, Eh), nr(D("input", {
                id: `wl-${p}`,
                ref_for: !0,
                ref: g => {
                    g && (a.value[p] = g)
                },
                "onUpdate:modelValue": g => K(l)[p] = g,
                class: me(["wl-input", `wl-${p}`]),
                name: p,
                type: p === "mail" ? "email" : "text"
            }, null, 10, Th), [
                [cu, K(l)[p]]
            ])]))), 128))], 2)) : J("v-if", !0), nr(D("textarea", {
                id: "wl-edit",
                ref: "textarea",
                "onUpdate:modelValue": R[0] || (R[0] = p => ve(i) ? i.value = p : null),
                class: "wl-editor",
                placeholder: z.replyUser ? `@${z.replyUser}` : F.value.placeholder,
                onKeydown: Qe,
                onDrop: Xt,
                onPaste: Pn
            }, null, 40, Ih), [
                [hs, K(i)]
            ]), nr(D("div", Lh, [R[7] || (R[7] = D("hr", null, null, -1)), D("h4", null, Y(F.value.preview) + ":", 1), D("div", {
                class: "wl-content",
                innerHTML: O.value
            }, null, 8, Mh)], 512), [
                [vl, I.value]
            ]), D("div", Ph, [D("div", Oh, [D("a", jh, [le(K(Bf))]), nr(D("button", {
                ref: "emoji-button",
                type: "button",
                class: me(["wl-action", {
                    active: C.value
                }]),
                title: F.value.emoji,
                onClick: R[1] || (R[1] = p => C.value = !C.value)
            }, [le(K(Ff))], 10, zh), [
                [vl, T.value.tabs.length]
            ]), K(s).search ? (L(), P("button", {
                key: 0,
                ref: "gif-button",
                type: "button",
                class: me(["wl-action", {
                    active: N.value
                }]),
                title: F.value.gif,
                onClick: R[2] || (R[2] = p => N.value = !N.value)
            }, [le(K(Kf))], 10, Dh)) : J("v-if", !0), D("input", {
                id: "wl-image-upload",
                ref: "image-uploader",
                class: "upload",
                "aria-hidden": "true",
                type: "file",
                accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif",
                onChange: Ot
            }, null, 544), we.value ? (L(), P("label", {
                key: 1,
                for: "wl-image-upload",
                class: "wl-action",
                title: F.value.uploadImage,
                "aria-label": F.value.uploadImage
            }, [le(K(Hf))], 8, Fh)) : J("v-if", !0), D("button", {
                type: "button",
                class: me(["wl-action", {
                    active: I.value
                }]),
                title: F.value.preview,
                onClick: R[3] || (R[3] = p => I.value = !I.value)
            }, [le(K(Nf))], 10, Hh)]), D("div", Uh, [R[9] || (R[9] = D("div", {
                class: "wl-captcha-container"
            }, null, -1)), D("div", Nh, [it(Y(G.value) + " ", 1), K(s).wordLimit ? (L(), P("span", Bh, [R[8] || (R[8] = it(" Â /Â  ")), D("span", {
                class: me({
                    illegal: !ae.value
                }),
                textContent: Y(oe.value)
            }, null, 10, Vh)])) : J("v-if", !0), it(" Â " + Y(F.value.word), 1)]), K(s).login !== "disable" && !de.value ? (L(), P("button", {
                key: 0,
                type: "button",
                class: "wl-btn",
                onClick: On,
                textContent: Y(F.value.login)
            }, null, 8, Wh)) : J("v-if", !0), K(s).login !== "force" || de.value ? (L(), P("button", {
                key: 1,
                type: "submit",
                class: "primary wl-btn",
                title: "Cmd|Ctrl + Enter",
                disabled: E.value,
                onClick: Ue
            }, [E.value ? (L(), st(K(In), {
                key: 0,
                size: 16
            })) : (L(), P(fe, {
                key: 1
            }, [it(Y(F.value.submit), 1)], 64))], 8, qh)) : J("v-if", !0)]), D("div", {
                ref: "gif-popup",
                class: me(["wl-gif-popup", {
                    display: N.value
                }])
            }, [D("input", {
                ref: "gif-search",
                type: "text",
                placeholder: F.value.gifSearchPlaceholder,
                onInput: R[4] || (R[4] = (...p) => K(jt) && K(jt)(...p))
            }, null, 40, Kh), j.list.length ? (L(), st(kh, {
                key: 0,
                items: j.list,
                "column-width": 200,
                gap: 6,
                onInsert: R[5] || (R[5] = p => be(p)),
                onScroll: bt
            }, null, 8, ["items"])) : J("v-if", !0), j.loading ? (L(), P("div", Gh, [le(K(In), {
                size: 30
            })])) : J("v-if", !0)], 2), D("div", {
                ref: "emoji-popup",
                class: me(["wl-emoji-popup", {
                    display: C.value
                }])
            }, [(L(!0), P(fe, null, Fe(T.value.tabs, (p, g) => (L(), P(fe, {
                key: p.name
            }, [g === w.value ? (L(), P("div", Zh, [(L(!0), P(fe, null, Fe(p.items, y => (L(), P("button", {
                key: y,
                type: "button",
                title: y,
                onClick: k => be(`:${y}:`)
            }, [C.value ? (L(), P("img", {
                key: 0,
                class: "wl-emoji",
                src: T.value.map[y],
                alt: y,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, Yh)) : J("v-if", !0)], 8, Jh))), 128))])) : J("v-if", !0)], 64))), 128)), T.value.tabs.length > 1 ? (L(), P("div", Qh, [(L(!0), P(fe, null, Fe(T.value.tabs, (p, g) => (L(), P("button", {
                key: p.name,
                type: "button",
                class: me(["wl-tab", {
                    active: w.value === g
                }]),
                onClick: y => w.value = g
            }, [D("img", {
                class: "wl-emoji",
                src: p.icon,
                alt: p.name,
                title: p.name,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, ep)], 10, Xh))), 128))])) : J("v-if", !0)], 2)])]), z.replyId || (h = z.edit) != null && h.objectId ? (L(), P("button", {
                key: 1,
                type: "button",
                class: "wl-close",
                title: F.value.cancelReply,
                onClick: R[6] || (R[6] = p => z.replyId ? r("cancelReply") : r("cancelEdit"))
            }, [le(K(fo), {
                size: 24
            })], 8, tp)) : J("v-if", !0)])
        }
    }
});
const np = ["id"],
    rp = {
        class: "wl-user",
        "aria-hidden": "true"
    },
    sp = ["src"],
    ip = {
        class: "wl-card"
    },
    lp = {
        class: "wl-head"
    },
    op = ["href"],
    ap = {
        key: 1,
        class: "wl-nick"
    },
    cp = ["textContent"],
    up = ["textContent"],
    fp = ["textContent"],
    hp = ["textContent"],
    pp = ["textContent"],
    dp = {
        class: "wl-comment-actions"
    },
    gp = ["title"],
    mp = ["title"],
    vp = {
        class: "wl-meta",
        "aria-hidden": "true"
    },
    bp = ["data-value", "textContent"],
    yp = {
        key: 0,
        class: "wl-content"
    },
    wp = {
        key: 0
    },
    kp = ["href"],
    xp = ["innerHTML"],
    _p = {
        key: 1,
        class: "wl-admin-actions"
    },
    Cp = {
        class: "wl-comment-status"
    },
    Sp = ["disabled", "onClick", "textContent"],
    $p = {
        key: 3,
        class: "wl-quote"
    };
var Rp = mn({
    __name: "CommentCard",
    props: {
        comment: {},
        edit: {},
        rootId: {},
        reply: {}
    },
    emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"],
    setup(e, {
        emit: t
    }) {
        const n = e,
            r = t,
            s = ["approved", "waiting", "spam"],
            i = sr(Fn),
            l = ho(),
            o = Pu(),
            a = Sr(),
            c = ge(() => i.value.locale),
            u = ge(() => {
                const {
                    link: w
                } = n.comment;
                return w ? ri(w) ? w : `https://${w}` : ""
            }),
            f = ge(() => l.value.includes(n.comment.objectId)),
            d = ge(() => qo(new Date(n.comment.time), o.value, c.value)),
            m = ge(() => a.value.type === "administrator"),
            x = ge(() => n.comment.user_id && a.value.objectId === n.comment.user_id),
            b = ge(() => {
                var w;
                return n.comment.objectId === ((w = n.reply) == null ? void 0 : w.objectId)
            }),
            T = ge(() => {
                var w;
                return n.comment.objectId === ((w = n.edit) == null ? void 0 : w.objectId)
            });
        return (w, C) => {
            var N;
            const I = Xa("CommentCard", !0);
            return L(), P("div", {
                id: w.comment.objectId.toString(),
                class: "wl-card-item"
            }, [D("div", rp, [w.comment.avatar ? (L(), P("img", {
                key: 0,
                class: "wl-user-avatar",
                src: w.comment.avatar,
                alt: ""
            }, null, 8, sp)) : J("v-if", !0), w.comment.type ? (L(), st(K(qf), {
                key: 1
            })) : J("v-if", !0)]), D("div", ip, [D("div", lp, [u.value ? (L(), P("a", {
                key: 0,
                class: "wl-nick",
                href: u.value,
                target: "_blank",
                rel: "nofollow noopener noreferrer"
            }, Y(w.comment.nick), 9, op)) : (L(), P("span", ap, Y(w.comment.nick), 1)), w.comment.type === "administrator" ? (L(), P("span", {
                key: 2,
                class: "wl-badge",
                textContent: Y(c.value.admin)
            }, null, 8, cp)) : J("v-if", !0), w.comment.label ? (L(), P("span", {
                key: 3,
                class: "wl-badge",
                textContent: Y(w.comment.label)
            }, null, 8, up)) : J("v-if", !0), w.comment.sticky ? (L(), P("span", {
                key: 4,
                class: "wl-badge",
                textContent: Y(c.value.sticky)
            }, null, 8, fp)) : J("v-if", !0), typeof w.comment.level == "number" ? (L(), P("span", {
                key: 5,
                class: me(`wl-badge level${w.comment.level}`),
                textContent: Y(c.value[`level${w.comment.level}`] || `Level ${w.comment.level}`)
            }, null, 10, hp)) : J("v-if", !0), D("span", {
                class: "wl-time",
                textContent: Y(d.value)
            }, null, 8, pp), D("div", dp, [m.value || x.value ? (L(), P(fe, {
                key: 0
            }, [D("button", {
                type: "button",
                class: "wl-edit",
                onClick: C[0] || (C[0] = O => r("edit", w.comment))
            }, [le(K(Wf))]), D("button", {
                type: "button",
                class: "wl-delete",
                onClick: C[1] || (C[1] = O => r("delete", w.comment))
            }, [le(K(Df))])], 64)) : J("v-if", !0), D("button", {
                type: "button",
                class: "wl-like",
                title: f.value ? c.value.cancelLike : c.value.like,
                onClick: C[2] || (C[2] = O => r("like", w.comment))
            }, [le(K(Uf), {
                active: f.value
            }, null, 8, ["active"]), it(" " + Y("like" in w.comment ? w.comment.like : ""), 1)], 8, gp), D("button", {
                type: "button",
                class: me(["wl-reply", {
                    active: b.value
                }]),
                title: b.value ? c.value.cancelReply : c.value.reply,
                onClick: C[3] || (C[3] = O => r("reply", b.value ? null : w.comment))
            }, [le(K(Vf))], 10, mp)])]), D("div", vp, [(L(), P(fe, null, Fe(["addr"/*, "browser", "os"*/], O => (L(), P(fe, null, [w.comment[O] ? (L(), P("span", {
                key: O,
                class: me(`wl-${O}`),
                "data-value": w.comment[O],
                textContent: Y(w.comment[O])
            }, null, 10, bp)) : J("v-if", !0)], 64))), 64))]), T.value ? J("v-if", !0) : (L(), P("div", yp, ["reply_user" in w.comment && w.comment.reply_user ? (L(), P("p", wp, [D("a", {
                href: "#" + w.comment.pid
            }, "@" + Y(w.comment.reply_user.nick), 9, kp), C[17] || (C[17] = D("span", null, ": ", -1))])) : J("v-if", !0), D("div", {
                innerHTML: w.comment.comment
            }, null, 8, xp)])), m.value && !T.value ? (L(), P("div", _p, [D("span", Cp, [(L(), P(fe, null, Fe(s, O => D("button", {
                key: O,
                type: "submit",
                class: me(`wl-btn wl-${O}`),
                disabled: w.comment.status === O,
                onClick: G => r("status", {
                    status: O,
                    comment: w.comment
                }),
                textContent: Y(c.value[O])
            }, null, 10, Sp)), 64))]), m.value && !("rid" in w.comment) ? (L(), P("button", {
                key: 0,
                type: "submit",
                class: "wl-btn wl-sticky",
                onClick: C[4] || (C[4] = O => r("sticky", w.comment))
            }, Y(w.comment.sticky ? c.value.unsticky : c.value.sticky), 1)) : J("v-if", !0)])) : J("v-if", !0), b.value || T.value ? (L(), P("div", {
                key: 2,
                class: me({
                    "wl-reply-wrapper": b.value,
                    "wl-edit-wrapper": T.value
                })
            }, [le(wo, {
                edit: w.edit,
                "reply-id": (N = w.reply) == null ? void 0 : N.objectId,
                "reply-user": w.comment.nick,
                "root-id": w.rootId,
                onLog: C[5] || (C[5] = O => r("log")),
                onCancelReply: C[6] || (C[6] = O => r("reply", null)),
                onCancelEdit: C[7] || (C[7] = O => r("edit", null)),
                onSubmit: C[8] || (C[8] = O => r("submit", O))
            }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : J("v-if", !0), "children" in w.comment ? (L(), P("div", $p, [(L(!0), P(fe, null, Fe(w.comment.children, O => (L(), st(I, {
                key: O.objectId,
                comment: O,
                reply: w.reply,
                edit: w.edit,
                "root-id": w.rootId,
                onLog: C[9] || (C[9] = G => r("log")),
                onDelete: C[10] || (C[10] = G => r("delete", G)),
                onEdit: C[11] || (C[11] = G => r("edit", G)),
                onLike: C[12] || (C[12] = G => r("like", G)),
                onReply: C[13] || (C[13] = G => r("reply", G)),
                onStatus: C[14] || (C[14] = G => r("status", G)),
                onSticky: C[15] || (C[15] = G => r("sticky", G)),
                onSubmit: C[16] || (C[16] = G => r("submit", G))
            }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : J("v-if", !0)])], 8, np)
        }
    }
});
const ko = "3.5.6",
    Ap = {
        "data-waline": ""
    },
    Ep = {
        class: "wl-meta-head"
    },
    Tp = {
        class: "wl-count"
    },
    Ip = ["textContent"],
    Lp = {
        class: "wl-sort"
    },
    Mp = ["onClick"],
    Pp = {
        class: "wl-cards"
    },
    Op = {
        key: 1,
        class: "wl-operation"
    },
    jp = ["textContent"],
    zp = {
        key: 2,
        class: "wl-loading"
    },
    Dp = ["textContent"],
    Fp = {
        key: 4,
        class: "wl-operation"
    },
    Hp = ["textContent"],
    Up = {
        key: 5,
        class: "wl-power"
    };
var Np = mn({
    __name: "WalineComment",
    props: {
        serverURL: {},
        path: {},
        meta: {},
        requiredMeta: {},
        wordLimit: {},
        pageSize: {},
        lang: {},
        locale: {},
        commentSorting: {},
        dark: {
            type: [String, Boolean]
        },
        login: {},
        noCopyright: {
            type: Boolean
        },
        recaptchaV3Key: {},
        turnstileKey: {},
        reaction: {},
        emoji: {},
        search: {},
        highlighter: {
            type: Function
        },
        imageUploader: {
            type: Function
        },
        texRenderer: {
            type: Function
        }
    },
    setup(e) {
        const t = e,
            n = Sr(),
            r = ho(),
            s = se("loading"),
            i = se(0),
            l = se(1),
            o = se(0),
            a = ge(() => Bo(t)),
            c = se(a.value.commentSorting),
            u = se([]),
            f = se(null),
            d = se(null),
            m = ge(() => Vo(a.value.dark)),
            x = ge(() => a.value.locale);
        zu(m, {
            id: "waline-darkmode"
        });
        let b = null;
        const T = E => {
                const {
                    serverURL: B,
                    path: F,
                    pageSize: de
                } = a.value, we = new AbortController;
                s.value = "loading", b == null || b(), Ls({
                    serverURL: B,
                    lang: a.value.lang,
                    path: F,
                    pageSize: de,
                    sortBy: ei[c.value],
                    page: E,
                    signal: we.signal,
                    token: n.value.token
                }).then(be => {
                    s.value = "success", i.value = be.count, u.value.push(...be.data), l.value = E, o.value = be.totalPages
                }).catch(be => {
                    be.name !== "AbortError" && (console.error(be.message), s.value = "error")
                }), b = we.abort.bind(we)
            },
            w = () => {
                T(l.value + 1)
            },
            C = () => {
                i.value = 0, u.value = [], T(1)
            },
            N = E => {
                c.value !== E && (c.value = E, C())
            },
            I = E => {
                f.value = E
            },
            O = E => {
                d.value = E
            },
            G = E => {
                if (d.value) d.value.comment = E.comment, d.value.orig = E.orig;
                else if ("rid" in E) {
                    const B = u.value.find(({
                        objectId: F
                    }) => F === E.rid);
                    if (!B) return;
                    Array.isArray(B.children) || (B.children = []), B.children.push(E)
                } else u.value.unshift(E), i.value += 1
            },
            j = async ({
                comment: E,
                status: B
            }) => {
                if (E.status === B) return;
                const {
                    serverURL: F,
                    lang: de
                } = a.value;
                await nn({
                    serverURL: F,
                    lang: de,
                    token: n.value.token,
                    objectId: E.objectId,
                    comment: {
                        status: B
                    }
                }), E.status = B
            }, oe = async E => {
                if ("rid" in E) return;
                const {
                    serverURL: B,
                    lang: F
                } = a.value;
                await nn({
                    serverURL: B,
                    lang: F,
                    token: n.value.token,
                    objectId: E.objectId,
                    comment: {
                        sticky: E.sticky ? 0 : 1
                    }
                }), E.sticky = !E.sticky
            }, ae = async ({
                objectId: E
            }) => {
                if (!confirm("Are you sure you want to delete this comment?")) return;
                const {
                    serverURL: B,
                    lang: F
                } = a.value;
                await Ps({
                    serverURL: B,
                    lang: F,
                    token: n.value.token,
                    objectId: E
                }), u.value.some((de, we) => de.objectId === E ? (u.value = u.value.filter((be, Qe) => Qe !== we), !0) : de.children.some((be, Qe) => be.objectId === E ? (u.value[we].children = de.children.filter((ut, Xt) => Xt !== Qe), !0) : !1))
            }, Me = async E => {
                const {
                    serverURL: B,
                    lang: F
                } = a.value, {
                    objectId: de
                } = E, we = r.value.includes(de);
                await nn({
                    serverURL: B,
                    lang: F,
                    objectId: de,
                    token: n.value.token,
                    comment: {
                        like: !we
                    }
                }), we ? r.value = r.value.filter(be => be !== de) : (r.value = [...r.value, de], r.value.length > 50 && (r.value = r.value.slice(-50))), E.like = Math.max(0, (E.like || 0) + (we ? -1 : 1))
            };
        return ic(Fn, a), bn(() => {
            Yt(() => [t.serverURL, t.path], () => {
                C()
            })
        }), Xr(() => {
            b == null || b()
        }), (E, B) => (L(), P("div", Ap, [le(mh), !f.value && !d.value ? (L(), st(wo, {
            key: 0,
            onLog: C,
            onSubmit: G
        })) : J("v-if", !0), D("div", Ep, [D("div", Tp, [i.value ? (L(), P("span", {
            key: 0,
            class: "wl-num",
            textContent: Y(i.value)
        }, null, 8, Ip)) : J("v-if", !0), it(" " + Y(x.value.comment), 1)]), D("ul", Lp, [(L(!0), P(fe, null, Fe(K(Uo), F => (L(), P("li", {
            key: F,
            class: me([F === c.value ? "active" : ""]),
            onClick: de => N(F)
        }, Y(x.value[F]), 11, Mp))), 128))])]), D("div", Pp, [(L(!0), P(fe, null, Fe(u.value, F => (L(), st(Rp, {
            key: F.objectId,
            "root-id": F.objectId,
            comment: F,
            reply: f.value,
            edit: d.value,
            onLog: C,
            onReply: I,
            onEdit: O,
            onSubmit: G,
            onStatus: j,
            onDelete: ae,
            onSticky: oe,
            onLike: Me
        }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), s.value === "error" ? (L(), P("div", Op, [D("button", {
            type: "button",
            class: "wl-btn",
            onClick: C,
            textContent: Y(x.value.refresh)
        }, null, 8, jp)])) : s.value === "loading" ? (L(), P("div", zp, [le(K(In), {
            size: 30
        })])) : u.value.length ? l.value < o.value ? (L(), P("div", Fp, [D("button", {
            type: "button",
            class: "wl-btn",
            onClick: w,
            textContent: Y(x.value.more)
        }, null, 8, Hp)])) : J("v-if", !0) : (L(), P("div", {
            key: 3,
            class: "wl-empty",
            textContent: Y(x.value.sofa)
        }, null, 8, Dp)), a.value.noCopyright ? J("v-if", !0) : (L(), P("div", Up, [B[0] || (B[0] = it(" Powered by ")), B[1] || (B[1] = D("a", {
            href: "https://github.com/walinejs/waline",
            target: "_blank",
            rel: "noopener noreferrer"
        }, " Waline ", -1)), it(" v" + Y(K(ko)), 1)]))]))
    }
});
const xo = (e, t) => {
        t.forEach((n, r) => {
            const s = e[r].time;
            typeof s == "number" && (n.innerText = s.toString())
        })
    },
    _o = ({
        serverURL: e,
        path: t = window.location.pathname,
        selector: n = ".waline-pageview-count",
        update: r = !0,
        lang: s = navigator.language
    }) => {
        const i = new AbortController,
            l = Array.from(document.querySelectorAll(n)),
            o = c => {
                const u = $s(c);
                return u !== null && t !== u
            },
            a = c => zs({
                serverURL: Hn(e),
                paths: c.map(u => $s(u) ?? t),
                lang: s,
                signal: i.signal
            }).then(u => xo(u, c)).catch(Dl);
        if (r) {
            const c = l.filter(f => !o(f)),
                u = l.filter(o);
            Ds({
                serverURL: Hn(e),
                path: t,
                lang: s
            }).then(f => xo(f, c)), u.length && a(u)
        } else a(l);
        return i.abort.bind(i)
    },
    Bp = ({
        el: e = "#waline",
        path: t = window.location.pathname,
        comment: n = !1,
        pageview: r = !1,
        ...s
    }) => {
        const i = e ? gs(e) : null;
        if (e && !i) throw new Error("Option 'el' do not match any domElement!");
        if (!s.serverURL) throw new Error("Option 'serverURL' is missing!");
        const l = pn({
                ...s
            }),
            o = pn({
                comment: n,
                pageview: r,
                path: t
            }),
            a = () => {
                o.comment && uo({
                    serverURL: l.serverURL,
                    path: o.path,
                    ...Dt(o.comment) ? {
                        selector: o.comment
                    } : {}
                })
            },
            c = () => {
                o.pageview && _o({
                    serverURL: l.serverURL,
                    path: o.path,
                    ...Dt(o.pageview) ? {
                        selector: o.pageview
                    } : {}
                })
            };
        let u = null;
        i && (u = pu(() => te(Np, {
            path: o.path,
            ...l
        })), u.mount(i));
        const f = Xi(a),
            d = Xi(c);
        return {
            el: i,
            update: ({
                comment: m,
                pageview: x,
                path: b = window.location.pathname,
                ...T
            } = {}) => {
                Object.entries(T).forEach(([w, C]) => {
                    l[w] = C
                }), o.path = b, m !== void 0 && (o.comment = m), x !== void 0 && (o.pageview = x)
            },
            destroy: () => {
                u == null || u.unmount(), f(), d()
            }
        }
    },
    Vp = ({
        el: e,
        serverURL: t,
        count: n,
        lang: r = navigator.language
    }) => {
        const s = Sr(),
            i = gs(e),
            l = new AbortController;
        return Fs({
            serverURL: t,
            count: n,
            lang: r,
            signal: l.signal,
            token: s.value.token
        }).then(o => i && o.length ? (i.innerHTML = `<ul class="wl-recent-list">${o.map(a=>`<li class="wl-recent-item"><a href="${a.url}">${a.nick}</a>ï¼š${a.comment}</li>`).join("")}</ul>`, {
            comments: o,
            destroy: () => {
                l.abort(), i.innerHTML = ""
            }
        }) : {
            comments: o,
            destroy: () => l.abort()
        })
    },
    Wp = ({
        el: e,
        serverURL: t,
        count: n,
        locale: r,
        lang: s = navigator.language,
        mode: i = "list"
    }) => {
        const l = gs(e),
            o = new AbortController;
        return Hs({
            serverURL: t,
            pageSize: n,
            lang: s,
            signal: o.signal
        }).then(a => !l || !a.length ? {
            users: a,
            destroy: () => o.abort()
        } : (r = {
            ...Qs(s),
            ...typeof r == "object" ? r : {}
        }, l.innerHTML = `<ul class="wl-user-${i}">${a.map((c,u)=>[`<li class="wl-user-item" aria-label="${c.nick}">`,c.link&&`<a href="${c.link}" target="_blank">`,'<div class="wl-user-avatar">',`<img src="${c.avatar}" alt="${c.nick}">`,`<span class="wl-user-badge">${u+1}</span>`,"</div>",'<div class="wl-user-meta">','<div class="wl-user-name">',c.nick,c.level&&`<span class="wl-badge">${r?r[`level${c.level}`]:`Level ${c.level}`}</span>`,c.label&&`<span class="wl-badge">${c.label}</span>`,"</div>",c.link&&c.link,"</div>",c.link&&"</a>","</li>"].filter(f=>f).join("")).join("")}</ul>`, {
            users: a,
            destroy: () => {
                o.abort(), l.innerHTML = ""
            }
        }))
    };
export {
    Vp as RecentComments, Wp as UserList, Ms as addComment, uo as commentCount, Dn as defaultLocales, Ps as deleteComment, Os as fetchCommentCount, Rr as getArticleCounter, Ls as getComment, zs as getPageview, Fs as getRecentComment, Hs as getUserList, Bp as init, js as login, _o as pageviewCount, zn as updateArticleCounter, nn as updateComment, Ds as updatePageview, ko as version
};
//# sourceMappingURL=waline.js.map
