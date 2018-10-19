import React from "react";
import IoSocialFacebook from "react-icons/lib/io/social-facebook";
import IoSocialTwitter from "react-icons/lib/io/social-twitter";

const shareText = `Чого тільки люди не белькочуть. 
Як почнуть вигадувати — хоч вуха закладай.

Приміром, розказують, що козаки, мовляв, по пояс голі
шаблями махають, а кожен другий якщо не характерник,
то із нечистою силою знається. Але ж козаки — рицарі та 
стрільці, щоправда на шаблю є багацько вправних. А от 
характерників — добре, як хоч одного знайдеш. 
Непроста це наука.

Отож, якщо люди небилиці говорять, 
то я теж розкажу…`;

const twitterShareText = `"Чого тільки люди не белькочуть. Приміром, що козаки по пояс голі
шаблями махають, а кожен другий якщо не характерник,
то із нечистою силою знається. А якщо люди небилиці говорять, я теж розкажу…"`;

export const isFB = () => document.getElementById('root').dataset.isfb === 'true';


function fbShare(text, label) {
    document.body.classList.add("disabled");
    window.FBInstant.shareAsync({
        intent: 'INVITE',
        image: getUri(text),
        text: label
    }).then(
        function (code, message) {
            document.body.classList.remove("disabled");
            console.log('%s: %s', code, message)
        });
}

export const share = (text, label='Поділитися') => {
    if (isFB()) {
        return (
            <div className="share">
                {label}:
                <a onClick={ () => {fbShare(text, label)} } title={label}>
                    <IoSocialFacebook/>
                </a>
            </div>
        );
    } else {
        let link = window.location.href;
        let twitterText = text;

        if (text === undefined) {
            text = shareText;
            twitterText = twitterShareText;
        }
        text = 'Лиха Година - Інтерактивне Оповідання\n\n' + text;
        twitterText = 'Лиха Година - Інтерактивне Оповідання\n\n' + twitterText + '\n' + link;

        return (
            <div className="share">
                {label}:
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(text)}`}
                   target="_blank"
                   title="Facebook">
                    <IoSocialFacebook/>
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&source=${encodeURIComponent(link)}`}
                   target="_blank"
                   title="Twitter">
                    <IoSocialTwitter/>
                </a>
            </div>
        );
    }
};


const getUri = (text) => {
    const size = 500;
    const lineHeight1 = 42;
    const lineHeight2 = 20;
    const lineHeight3 = 24;
    let ctx = document.createElement('canvas').getContext('2d');

    ctx.canvas.height = size;
    ctx.canvas.width = size;

    let topY = text === undefined? lineHeight1*1.5: lineHeight1*2;

    let y1 = addText('Лиха Година', ctx, topY, lineHeight1);
    let y2 = addText('Інтерактивне Оповідання', ctx, y1, lineHeight2);

    if (text === undefined) {
        addText(shareText, ctx, y2 + lineHeight3, lineHeight3);
    } else {
        addText(text, ctx, (size - lineHeight3) / 2, lineHeight3);
    }

    return ctx.canvas.toDataURL()
};


function addText(text, ctx, y, lineHeight) {
    let width = ctx.canvas.width;

    ctx.font = `${lineHeight}px Caveat, cursive`;

    for (let line of text.split('\n')) {
        let margin = (width - ctx.measureText(line).width) / 2;
        ctx.fillText(line, margin, y);
        y += lineHeight;
    }
    return y;
}
