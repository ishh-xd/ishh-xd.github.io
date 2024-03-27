
/* global commands */
commands = {};

const CACHE = {};
commands.help = async(term) => {
    term.log(Object.keys(commands).sort().join(', '));
    return true;
};
commands.echo = async(term, args) => (term.log(args.join(" ") || ''), true);
commands.clear = async(term) => term.clear();
commands.date = async(term) => (term.log(new Date().toLocaleString()), true);
commands.cd = async(term, args) => {
    if (!args[0]) return true;
    const read = term.d.fs.read(args[0], term.d.dir);
    if (!read) return term.log('cd: no such file or directory: ' + args[0]);
    if (read[0]) return term.log('cd: not a directory');
    if (args[0] === '/') term.d.dir = '/';
    else term.d.dir = term.d.fs.parseRelativePath(args[0] + '/', term.d.dir);
    return true;
};
commands.ls = async(term, args) => {
    let target = args.join(" ");
    target ??= '.';
    const read = term.d.fs.read(target, term.d.dir);
    if (!read) return term.log('ls: no such file or directory: ' + target);
    if (read[0]) return term.log('ls: not a directory');
    const typeIcons = {
        txt: '',
        'txt/md': '',
        UNKNOWN: '',
    };
    term.log(
        Object.entries(read)
            .map(
                (f) =>
                    `${
                        (Array.isArray(f[1]) ? typeIcons[f[1][0] || 'UNKNOWN'] : '') ||
                        typeIcons.UNKNOWN
                    }  ${f[0]}`
            )
            .sort((a, b) =>
                a.startsWith('') && b.startsWith('') ? 0 : a.startsWith('') ? -1 : 1
            )
            .map((x) => (x.startsWith('') ? `**[#78aad8:${x}]**` : x))
            .join('\n')
    );
    return true;
};

commands.cat = async(term, args) => {
    if (!args.join(" ")) return true;
    const read = term.d.fs.read(args[0], term.d.dir);
    if (!read) return term.log('cat: no such file or directory: ' + args[0]);
    if (!read[0]) return term.log('cat: is a directory');
    term.log(read[1]);
    return true;
};   
commands.readFile = async(term, args) => {
    if (!args.join(" ")) return true;
    const read = term.d.fs.read(args[0], term.d.dir);
    if (!read) return term.log('cat: no such file or directory: ' + args[0]);
    if (!read[0]) return term.log('cat: is a directory');
    term.log(read[1]);
    return true;
};   
commands.pwd = async(term) => (term.log(term.d.dir), true);

commands.discord = async(term) => {
 const useridD = `1041881720380727377`;
    const API = `https://api.lanyard.rest/v1/users/${useridD}`,
                res = await fetch(API),
                {data} = await res.json();
            if (!data?.discord_user?.username) return term.log('discord: Could not fetch info.');
            console.log(data.discord_status);
            term.log(`[#78aad8:󰓹]  **${data.discord_user.username}**#${
                data.discord_user.discriminator
            }
[#232527:────── ──  ─]
[#78aad8:󰀉]  \`${data.discord_user.id}\`
${
    {
        online: '[#8ebc67:󰝥]  Online',
        idle: '[#ebcb8b:󰽧]  Idle',
        dnd: '[#bf616a:󰍶]  DND',
        offline: '[#eeeeee66:󰻃]  Dead', // this is hl2 btw
    }[data.discord_status]
} (${
    ['web', 'mobile', 'desktop']
        .filter((x) => data[`active_on_discord_${x}`])
        .join(' - ') || 'Probably sleeping?'
})
[#78aad8:󰐌]  Activit${data.activities.length > 1 ? 'ies' : 'y'}
${
    data.activities
        .map(
            (x) =>
                `|  ${
                    [
                        '[#78aad8:󰊗]  Playing',
                        '[#78aad8:󰑋]  Streaming',
                        '[#78aad8:󰝚]  Listening to',
                        '[#78aad8:󰑈]  Watching',
                        '[#78aad8:󰦨] ',
                        '[#78aad8:󱐋]  Competing in',
                    ][x.type]
                } **${x.name}**${[x.details, x.state]
                    .filter(Boolean)
                    .map((y) => `\n|  |  ${y}`)
                    .join('')}`
        )
        .join('\n') || '| Procrastinating'
}
`);
            return true;
        },


commands.browser = async(term) =>  (
    term.log(`[#78aad8:󰓹]  ${getBrowser()}
[#232527:────── ──  ─]
[#78aad8:󰔃]  Screen
|  [#78aad8:󰆾]  ${screen.width}x${screen.height}
|  [#78aad8:󰉼]  ${screen.colorDepth} bits
[#78aad8:󰞂]  Navigator
|  [#78aad8:󰆘]  Cookies: ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}
|  [#78aad8:󰀉]  ${navigator.userAgent
                .match(/\(.+\)|.+? +?/g)
                .map((x) => x.trim())
                .join('\n|  |  ')}
|  [#78aad8:]  ${navigator.language}`), 
    true);


    commands.history = async(term, args) => {
    /* global TERM_HISTORY */
    term.log(
        TERM_HISTORY.map(
            (x, i) => `${(i + 1).toString().padEnd(TERM_HISTORY.length.toString().length)}  ${x}`
        )
            .slice(Number(args[0]) - 1 || 0)
            .join('\n')
    );
    return true;
};
commands.uwu = async(term, args) => {
    if (!args.join(" ")) term.log('uwu');
    else {
        const faces = ['OwO', 'UwU', '>w<', 'uWu', ':3', 'ÙwÚ', 'QwQ', 'uwu', 'owo'];
        term.log(
            args.join(" ")
                .toLowerCase()
                .replace(/[lr]/g, 'w')
                .replace(/[LR]/g, 'W')
                .replace(/n([aeiou])/g, 'ny$1')
                .replace(/N([aeiou])/g, 'Ny$1')
                .replace(/N([AEIOU])/g, 'Ny$1')
                .replace(/ove/g, 'uv')
                .replace(
                    /([!.,]+)/g,
                    (_, x) =>
                        ` ${faces[Math.floor(Math.random() * faces.length)]}${','.repeat(
                            x.length * ~~({'!': 2, '.': 1.5}[x[x.length - 1]] || 1) +
                                (x[x.length - 1] !== ',')
                        )}`
                )
        );
    }
    return true;
};
const sus = new Audio('assets/amogus.mp3');
commands.sus = async(term) => {
    commands.readFile(term, ['/AMOGUS.txt']);
    await sus.play();
};

const rickR = new Audio('assets/rickroll.mp3');
commands.boom = async(term) => {
    term.log("Cry for it.")
    await rickR.play();
};


commands.tts = async(term, args) => {
    if (!args.join(" ")) return term.log('tts: Nothing to speak.');
  const audio = new Audio(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
            args.join(" ")
        )}&tl=en&client=tw-ob&ttsspeed=1`
    );
    term.log(`Speaking:  ${args.join(" ")}`)
    await audio.play();
    return true;
};




/**
 * @link https://stackoverflow.com/a/5918791/18412379
 */
function getBrowser() {
    const ua = navigator.userAgent;
    let tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

        
