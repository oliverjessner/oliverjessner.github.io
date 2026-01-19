---
layout: post
title: 'Der eigene Pokédex: Mit Bildern und A.I. zum Leben erweckt!'
date: 2024-03-02 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - software-engineering
    - KI
    - pokemon
description: 'In diesem Blogpost zeige ich dir, wie du dir deinen eigenen Pokédex erstellen kannst. Mit Bilderkennung und A.I. und der PokeAPI.'
thumbnail: '/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/header_thumbnail.webp'
image: '/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/header.webp'
---

## Warum?

Im nachfolgenden Bild bin ich zu sehen, als ich erst 10 oder 9 Jahre alt war. Wie man erkennen kann, trage ich zu dieser Zeit schon ein Pokémon-T-Shirt. Denn das Leben des jungen Oli drehte sich nur um eines: Pokémon. Wir hatten damals keinen Zugang zum Internet. Oder genauer gesagt, wir konnten nur durch die Computer unserer Eltern ins Internet gelangen. Was haben wir damals gemacht? Wir haben einzelne Pokémon von der Pokédex-Website von Game Freak heruntergeladen und ausgedruckt. Es gab überall Pokémon, aber auf T-Shirts, auf Müslipackungen, im Fernsehen, aber wir kannten oft nicht ihre Namen. Darum gingen wir ins Netz und haben uns die Namen aus dem Pokédex gesucht. Damals hatten wir einen Traum: einen Pokédex, der wirklich funktioniert und uns alle Pokémon-Infos vorliest, genau wie im Anime. Einfach ein Pokémon fotografieren und den Rest macht der Pokédex. Ich wusste damals nicht, dass ich genau das 23 Jahre später als Web-App mit KI realisieren würde. Man kann sogar die Kamerafunktion eines Smartphones nutzen um eine Pokemon zu klassifizieren. Und genau das ist der Grund, warum wir heute einen Pokédex mit Voice Cloning und KI bauen.

![Ich als 10 Jähriger Junge](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/10_year_old_oli.webp)

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

<iframe width="560" height="315" src="https://www.youtube.com/embed/k2HA6MyyfjQ?si=REogXO_4mKdfKF8u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Lets go, Pikachu!

Meine Freundin war so nett, mir eine Figma-Datei für den Pokédex zu erstellen.

![Eine screenshot des figma designs des pokedex](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/figma_pokedex.webp)

Was in Figma noch perfekt aussah, erwies sich beim Exportieren als nicht mehr ganz so toll. Ich habe hier zum Beispiel auch das Plugin "pxcode" zum Exportieren ausprobiert, jedoch fand ich die Fixes im pxcode so umständlich, dass ich mich entschieden habe, das gleich im CSS zu korrigieren. Natürlich ist das keine perfekte oder wartbare Lösung, aber das Ziel war es, das Projekt so einfach wie möglich zu gestalten und junge Menschen fürs Programmieren zu begeistern. Übrigens habe ich den Code auf meiner [GitHub Page](https://github.com/oliverjessner/programmieren-lernen-mit-oli/tree/main/projects/pokedex_template) einmal als Template für Menschen, die mit meinem YouTube-Video programmieren wollen, und einmal als den vollständigen Code verfügbar gemacht.

![Der erste figma export](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/first_export.webp)

Die Struktur habe ich so simpel wie möglich gehalten. Wir erinnern uns, die Mehrheit meiner Zuseher sind Anfänger, daher versuche ich jedes Mal, die geistige Belastung so gering wie möglich zu halten.

![Die Struktur für unsere daten](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/struktur.webp)

Der nächste Schritt ist es, einen simplen Webserver zu bauen. Ich habe mich für Bun entschieden, das Ganze läuft auch 1:1 mit Node.js natürlich. Dazu sieht unser `backend/index.ts` so aus:

```javascript
import { serveStatic } from 'hono/bun';
import { Hono } from 'hono';
import upload from './upload';
import dotenv fromü

const app = new Hono();

dotenv.config();
app.use('/*', serveStatic({ root: './public/' }));
app.use('/*', serveStatic({ root: './assets/voices' }));
upload(app);

console.log('Server is running on port http://localhost:3000');

export default app;
```

Der Code ist so einfach wie möglich. Wir nutzen Hono, um statische Dateien zu hosten und unsere Endpunkte zu erstellen. Dotenv verwenden wir, um später Tokens für unsere Voice cloning bereitzustellen. Mit Dotenv können wir zum Beispiel ganz einfach Daten aus einer .env-Datei einbinden. "Upload" ist eine Funktion, die wir selbst erstellen.

## Was ist eine .env Datei?

Eine .env-Datei ist sinnvoll, weil sie es ermöglicht, sensible Konfigurationsdaten wie API-Schlüssel oder Passwörter sicher von anderen Dateien zu trennen. Sie dient als zentrale Speicherstelle für Umgebungsvariablen, die von Anwendungen genutzt werden können, ohne direkt im Code festgeschrieben zu sein. In einer .env-Datei können unterschiedliche Konfigurationen für lokale Entwicklungsumgebungen und Produktionsumgebungen definiert werden. Lokale Konfigurationen wie Test-API-Schlüssel oder Datenbankverbindungen sind separat von den Produktionskonfigurationen gehalten, um eine sichere und skalierbare Entwicklung zu ermöglichen.

## Server Setup

Ich würde dir empfehlen, wenn du Bun nutzt, vorher "bun init" laufen zu lassen und sowie einige install.

```bash
bun init && bun install hono && bun install dotenv && bun install && openai bun install playht
```

Wir starten unseren Server mit folgendem Befehl:

```bash
bun backend/index.ts
```

PS: Wenn du Node.js nutzt, musst du natürlich vorher noch dein TypeScript transpilieren. Anstatt von bun install musst du dann auch npm install nutzen.

## Frontend

Gehen wir zurück auf unsere Seite und schauen uns an, was sich in unserem "public"-Ordner befindet. Das `index.html` ist sehr groß, daher würde ich euch wieder den [folgenden Link empfehlen](https://github.com/oliverjessner/programmieren-lernen-mit-oli/blob/main/projects/pokedex_finished/public/index.html#L16). Abseits des Grunddesigns sind die drei Tags interessant: "input" zum Hochladen von Dateien sowie zwei "audio"-Tags, einmal, um den Text des Pokédex als Audio auszugeben, und einmal, um den Schrei des Pokémon wiederzugeben.

```html
<input id="file" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/webp,image/png" />
<audio id="audio-desc"></audio>
<audio id="audio-cry"></audio>

<!-- 
    Rest auf
    https://github.com/oliverjessner/programmieren-lernen-mit-oli/blob/main/projects/pokedex_finished/public/index.html#L16
 -->
```

Da der Großteil des CSS-Codes bereits aus Figma stammt, müssen wir nur wenige Dinge hinzufügen. Wir importieren die Google Open Font "Press Start 2P" mit "@import". "Press Start 2P" ist eine wirklich schöne, oldschool-ähnliche Schrift im 8-Bit-Stil, daher wählen wir sie für unseren Pokédex. Unser Audio- und Input-Tag blenden wir aus, da wir sie nicht sehen müssen. Unser File-Input lösen wir über ein Element im Pokédex aus. Im Body zentrieren wir unseren Pokédex, damit das Ganze hübscher aussieht. Der Pokédex hat einen runden Button oben rechts, auf den legen wir ein simples Hover-Effekt, bei dem sich der Cursor ändert. Zu guter Letzt fügen wir eine Animation hinzu, die wir triggern, wenn der Pokédex "spricht". Diese Animation wird dann dynamisch mit JavaScript hinzugefügt und wieder entfernt. "Small-blink wurde für die oberen drei "Lampen" implementiert, damit sie während unserer Backend-Arbeit blinken."

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

input,
audio {
    display: none;
}

* {
    font-family: 'Press Start 2P', cursive;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f2f2f2;
    margin: 0;
}

.upload-button:hover {
    cursor: pointer;
}

@keyframes blink {
    25% {
        opacity: 0.85;
    }
    50% {
        opacity: 0.65;
    }
    75% {
        opacity: 0.85;
    }
}

@keyframes small-blink {
    25% {
        opacity: 0.65;
    }
    50% {
        opacity: 0.35;
    }
    75% {
        opacity: 0.65;
    }
}
```

Weiter geht es mit JavaScript. Hier haben wir einen ziemlich standardmäßigen Code, um aus einem Bild einen Base64-String zu generieren. Wir verwenden die FileReader-API, die uns ein asynchrones Ereignis zur Verfügung stellt. Aus dem Parameter "evt" erhalten wir "evt.target.result", was unserem Base64-String entspricht.

```javascript
const file = document.querySelector('input');
const button = document.querySelector('#upload');
const smallTopRed = document.querySelector('#small-top-red');
const smallTopYellow = document.querySelector('#small-top-yellow');
const smallTopGreen = document.querySelector('#small-top-green');

file.addEventListener('change', handleSubmit);
button.addEventListener('click', () => file.click());

function flashStart() {
    smallTopRed.style.animation = 'small-blink 0.5s infinite';
    smallTopYellow.style.animation = 'small-blink 0.8s infinite';
    smallTopGreen.style.animation = 'small-blink 1s infinite';
}

function flashStop() {
    smallTopRed.style.animation = 'none';
    smallTopYellow.style.animation = 'none';
    smallTopGreen.style.animation = 'none';
}

function handleSubmit({ target }) {
    const [file] = target.files;
    const reader = new FileReader();
    const imgTag = document.createElement('img');
    const url = URL.createObjectURL(file);

    reader.onload = function (evt) {
        imgTag.src = url;
        imgTag.onload = function () {
            const img = {
                name: file.name,
                base64: evt.target.result,
            };

            URL.revokeObjectURL(url);
            sendImage(img);
        };
    };

    reader.readAsDataURL(file);
}
```

"FlashStart" und "FlashStop" triggern ganz einfache Animationen, die wir abspielen, bis alle unsere KI-Systeme die richtigen Daten zurückgeben.
Am Ende sehen wir die Funktion "sendImage", der wir unsere selbst erstellte Datei übergeben, die den Dateinamen als Name und unseren Base64 String enthält. Warum brauchen wir diesen Base64 String, fragst du dich? Ganz einfach, die Vision API von OpenAI funktioniert damit super einfach.

```javascript
function getFormDataForImage(postData) {
    const formData = new FormData();

    formData.append('file', postData.base64);
    formData.append('name', postData.name);

    return formData;
}

async function sendImage(imgData) {
    const respone = await fetch('/upload', {
        method: 'POST',
        body: getFormDataForImage(imgData),
    });
    const json = await respone.json();

    flashStop();
    await setData(json);
}
```

In diesem Video können wir gut sehen, wie unsere oberen drei Lampen nacheinander blinken, um dem Nutzer mitzuteilen, dass der Pokédex Daten lädt.

<video controls preload src="/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/top_three_blinking.mov" type="video/mov">
</video>

Der Code hier ist auch ziemlich selbsterklärend. Wir nutzen die Fetch API, um unsere Base64-Daten an unseren Webserver zu senden. Die Route "/upload" werden wir gleich erstellen. Dabei packen wir das Ganze in ein FormData-Objekt.

### Zurück zum Backend

```javascript
import { Hono } from 'hono';
import vision from './vision';

type body = {
    file: string,
    name: string,
};

export default function upload(app: Hono) {
    app.post('/upload', async c => {
        const body: body = await c.req.parseBody();
        console.log('Starting Vision API');
        const name: string = await vision(body.file);
    });
}
```

Wir binden eine Datei namens "vision" ein, die wir selbst erstellen. Dann erstellen wir eine POST-Route mit "app.post", verwenden "parseBody", um unseren Body zu parsen, und übergeben ".file", das unser Base64-String ist, an unsere "vision"-Funktion. Was macht nun die OpenAI API? Sie nimmt diesen Base64-String, der das hochgeladene Bild darstellt, und gibt uns einen Namen für das Pokémon, das es darin erkennt.

```javascript
import OpenAI from 'openai/index.mjs';

const openai = new OpenAI();

export default async function vision(base64_image: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: 'Which pokemon do you see? Give me only the name!' },
                    {
                        type: 'image_url',
                        image_url: {
                            url: base64_image,
                        },
                    },
                ],
            },
        ],
        max_tokens: 300,
    });

    return response.choices[0].message.content?.toLocaleLowerCase() || '';
}
```

Wir binden die OpenAI-Bibliothek ein und können hier einfachen Copy-Paste machen. Wichtig hier anzumerken ist nur, dass wir bei "image_url.url" auch wirklich unseren Base64-String übergeben. Ebenso den Prompt, den wir mitliefern. Ich habe mich für folgenden entschieden: "Which pokemon do you see? Give me only the name!". Andernfalls kann es passieren, dass wir sehr viel Text zurückbekommen über das Pokémon selbst, was in unserem Fall eher unnötig ist.

## Wer bezahlt die ganze Rechenleistung bei OpenAI?

Ganz einfach, du. Aber keine Sorge, du kannst eine beliebige Menge Geld auf deinen OpenAI-Account laden, zum Beispiel 5 Euro, und ein "Vision lookup" kostet im Schnitt nur 1 Cent. Wir erstellen uns einen Account auf der OpenAI-Seite und gehen dann auf [platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview). Dort klicken wir auf "Add Credit Balance" und fügen unseren gewünschten Betrag hinzu. Wie bereits erwähnt, reichen in erster Linie 5 Euro.

![So fuegen wir credits in openai hinzu](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/credits_in_openai_hinzufuegen.webp)

Danach erstellen wir einen API-Schlüssel auf [platform.openai.com/api-keys](https://platform.openai.com/api-keys) und speichern diesen in unserer Zwischenablage.

![So erstellen wir einen api key in openai](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/api_key_erstellen.webp)

Diesen Key fügen wir dann deiner Entwicklungsumgebung mit folgendem Terminal-Befehl hinzu:

```bash
export OPENAI_API_KEY='your-api-key-here'
```

Weiter geht's. Mit der letzten Zeile geben wir den Namen des Pokémon zurück. Es scheint länger und komplizierter zu sein, als es sein müsste, aber vorerst können wir es einfach akzeptieren.

```javascript
return response.choices[0].message.content?.toLocaleLowerCase() || '';
```

## PokeAPI

Wir erweitern unsere "upload.ts"-Datei um folgenden Import und Funktionsaufruf:

```javascript
import { Hono } from 'hono';
import vision from './vision';
import pokeapi from './pokeapi';

type body = {
    file: string,
    name: string,
};

export default function upload(app: Hono) {
    app.post('/upload', async c => {
        const body: body = await c.req.parseBody();
        console.log('Starting Vision API');
        const name: string = await vision(body.file);
        console.log('Fetching data from PokeAPI');
        const data = await pokeapi(name);
    });
}
```

Interessanter wird es in der "pokeapi.ts"-Datei. Hier verwenden wir einfach die Fetch API und nutzen den Namen des Pokémon, den wir von der Vision API erhalten haben, um unsere URL für den Aufruf der PokeAPI zu generieren. Mit Promise.all können wir zwar asynchron beide Aufrufe zu den benötigten Endpunkten machen, aber das Promise wartet, bis beide fertig sind, um dann die Antworten jeweils in JSON-Objekte umzuwandeln und sie dann mit dem Spread-Operator zusammenzuführen.

```javascript
export default async function pokeapi(pokemonName: string) {
    const pokemonReq = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const speciesReq = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const [pokemonData, speciesData] = await Promise.all([pokemonReq, speciesReq]);
    const p = (await pokemonData.json()) as object;
    const s = (await speciesData.json()) as object;

    return { ...p, ...s };
}
```

Wir erhalten sehr viele Daten über das Pokémon zurück, aber die wichtigsten für uns sind die Größe, das Gewicht, die Beschreibung, der Schrei, die Pokédex-Nummer und die Typen.

## Voice Cloning

Ein letztes Mal erweitern wir unsere "upload.ts" und geben mit "c.json" auch wieder Daten ans Frontend zurück.

```javascript
import { Hono } from 'hono';
import vision from './vision';
import pokeapi from './pokeapi';
import generateVoice from './voice';

type body = {
    file: string,
    name: string,
};

export default function upload(app: Hono) {
    app.post('/upload', async c => {
        const body: body = await c.req.parseBody();
        console.log('Starting Vision API');
        const name: string = await vision(body.file);
        console.log('Fetching data from PokeAPI');
        const data = await pokeapi(name);
        console.log('Generating voice url');
        const voice = await generateVoice(data);
        console.log('Returning data', voice);
        return c.json({ name, data, voice });
    });
}
```

Bevor wir mit "voice.ts" weitermachen, müssen wir uns entscheiden, wie wir unseren Voice-Output handhaben. Ich fand es lustig, die Originalstimme des Pokédex zu verwenden, daher habe ich einige Clips heruntergeladen, zusammengefügt, alles herausgeschnitten, was nicht die Stimme des Pokédex ist, und daraus eine MP3-Datei erstellt. Diese Datei findest du auch wieder auf meinem [GitHub](https://github.com/oliverjessner/programmieren-lernen-mit-oli/blob/main/projects/pokedex_finished/assets/pokedex_voice.mp3).

Dann habe ich einen Account auf [play.ht/](https://play.ht/) erstellt und bin auf [play.ht/studio/voice-cloning](https://play.ht/studio/voice-cloning) gegangen. Dort habe ich meine MP3-Datei hochgeladen.

![So clonen wir eine stimme](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/voice_cloning.webp)

Dann bleiben wir noch kurz auf play.ht und erstellen unseren API-Schlüssel und unsere ID auf [play.ht/studio/api-access](https://play.ht/studio/api-access).

![Einen api key auf playht erstellen](/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/playht_keys.webp)

Diese beiden Strings fügen wir in unsere .env-Datei ein.

```bash
PLAYHT_API_KEY=DEIN_KEY
PLAYHT_USER_ID=DEINE_ID
```

Im ersten Moment sieht unsere "voice.ts"-Datei so aus. Wir binden logischerweise die Library von PlayHT ein und rufen "init" auf. Dort werden die gerade eingefügten Tokens direkt aus der .env-Datei übergeben, indem wir `process.env` verwenden.

```javascript
import * as PlayHTAPI from 'playht';

const edition = 'yellow';

PlayHTAPI.init({
    apiKey: process.env.PLAYHT_API_KEY,
    userId: process.env.PLAYHT_USER_ID,
});

PlayHTAPI.listVoices().then(voices => {
    console.log(voices.find(voice => voice.isCloned)?.id);
});
```

Die Variable "edition" brauchen wir gleich, und mit "listVoices" erhalten wir eine ID für unsere geklonte Stimme. Das bedeutet, wir starten kurz unseren Server und speichern uns die ID irgendwo dazwischen.

Wir fügen die folgenden zwei Funktionen hinzu und weisen die gespeicherte ID der property "voiceId" zu. Was wir hier zurückbekommen, ist eine URL, die auf eine Audiodatei zeigt, mit unserer Pokémon-Beschreibung. Denn wir übergeben die Beschreibung, die wir von der PokeAPI erhalten haben. Sie befindet sich im Parameter von generateVoiceUrl und übergeben sie als ersten Parameter an "generate". Um sicherzustellen, dass unsere Stimmen auch auf iOS funktionieren, müssen wir sie schnell mit "downloadVoice" herunterladen.

```javascript
async function downloadVoice(url: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const name = url.split('/').pop();

    await fs.writeFile(`./assets/voices/${name}`, Buffer.from(buffer));

    console.log('File downloaded!');
    return name;
}

function findSentence(data: object): string {
    const found = data.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en' || entry.version.name === edition,
    ).flavor_text;

    if (found) {
        return found;
    }

    return data.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text;
}

export default async function generateVoiceUrl(data: object): Promise<string> {
    const sentence = findSentence(data).replace(/\r?\n|\r/g, '');
    const response = await PlayHTAPI.generate(sentence, {
        voiceId: 's3://voice-cloning-zero-shot/825aa872-9ce9-40a6-988d-79bf9223449d/enhanced/manifest.json',
        outputFormat: 'mp3',
        voiceEngine: 'PlayHT2.0',
        sampleRate: 44100,
        speed: 1,
    });
    const voiceURL = (await downloadVoice(response.audioUrl)) || '';

    return voiceURL;
}
```

In der Funktion "findSentence" suchen wir die bevorzugte Beschreibung für uns aus, da Pokémon viele Beschreibungen haben können. Da ich die Beschreibungen der ersten Generation besonders in der Gelben Edition bevorzuge, habe ich das so gestaltet, dass, wenn es eine Beschreibung aus der Gelben Edition gibt, diese ausgewählt wird. Andernfalls nehmen wir einfach die erste englische Beschreibung.

Somit sind wir fertig im Backend!

## Setzen wir das Ganze zusammen

Setzen wir das Ganze mit der letzten Datei zusammen. Im Backend benötigen wir noch die Datei "setData.js". Am Anfang der Datei haben wir sehr viele Caches von unseren verschiedenen Elementen, in die wir Dateien einsetzen wollen.

setData" ist eine typische Funktion, die einfach Daten vom Server auf DOM-Elemente schreibt. In "playAudio" nutzen wir hier noch Promises, um unseren Kontrollfluss so zu steuern, dass wir unsere CSS-Animation, die wir ganz am Anfang erstellt haben, auf die blauen großen Knöpfe des Pokédex legen und sie nach dem Beenden der Audioausgabe wieder entfernen.

Kurz gesagt, dieser Code lässt unseren Pokédex die Beschreibung des Pokémon vorlesen und lässt die blauen Knöpfe währenddessen blinken.

Den rechten grauen Button im Pokédex legen wir noch die Möglichkeit, den Schrei des Pokémons abzuspielen. Um das zu machen, binden wir an "playCry" ein Klick-Event.

```javascript
const picture = document.querySelector('img');
const dexName = document.querySelector('#dex-name');
const type = document.querySelector('#type');
const dexId = document.querySelector('#dex-id');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const audioCry = document.querySelector('#audio-cry');
const audioDesc = document.querySelector('#audio-desc');
const playCry = document.querySelector('#play-cry');
const button = document.querySelector('#upload');

playCry.addEventListener('click', () => audioCry.play());

async function playAudio() {
    button.style.animation = 'blink 1s infinite';

    const done = await new Promise(res => {
        audioDesc.play();
        audioDesc.onended = res;
    });

    button.style.animation = 'none';
}

export default async function setData({ data, voice }) {
    dexName.textContent = data.name;
    dexId.textContent = `#${data.id}`;
    type.textContent = data.types.map(type => type.type.name).join(' / ');
    audioCry.src = data.cries.latest;
    audioDesc.src = voice;
    picture.src = data.sprites.front_default;
    height.textContent = `Height: ${data.height / 10}m`;
    weight.textContent = `Weight: ${data.weight / 10}kg`;

    await playAudio();
}
```

Zur Info: Wir nutzen "type=module", damit wir im Frontend einfach Module mit import einbinden können.

```html
<script type="module" src="index.js"></script>
```

Wenn der Pokédex spricht und du alles richtig gemacht hast, leuchtet die rechte obere blaue Lampe.

<video controls preload src="/assets/images/gen/blog/einen-pokedex-mit-ai-und-voice-cloning/big_blue_blinking.mov" type="video/mov">
</video>

### Fazit

Im Vordergrund dieses Projekts stand der Spaß, nicht dass alles perfekt ist, und genau das haben wir erreicht. Ich finde es faszinierend, wie schnell und einfach wir heute KI nutzen können, um solche Projekte zu realisieren.
