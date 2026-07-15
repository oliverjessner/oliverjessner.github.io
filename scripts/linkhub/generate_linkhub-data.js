import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const linkhubDataPath = path.join(__dirname, 'linkhub-data.json');
const golemLinksPath = path.join(__dirname, '..', '..', '_data', 'links', 'golem.yml');
const ignLinksPath = path.join(__dirname, '..', '..', '_data', 'links', 'ign.yml');
const postsPath = path.join(__dirname, '..', '..', 'collections', '_posts');
const socialMediaLinksPath = path.join(__dirname, '..', '..', '_data', 'social.json');
const partnersPath = path.join(__dirname, '..', '..', '_data', 'partners.json');
const exceptions = Object.freeze({
    journalism: ['t3n'],
    socialMedia: ['LinkHub'],
});

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function stripQuotes(value) {
    return value.replace(/^['"]|['"]$/g, '');
}

function readYamlList(filePath) {
    const yaml = fs.readFileSync(filePath, 'utf8');
    const entries = [];
    let currentEntry = null;

    yaml.split('\n').forEach(function (line) {
        const entryStart = line.match(/^- ([^:]+):\s*(.*)$/);
        const property = line.match(/^ {2}([^:]+):\s*(.*)$/);

        if (entryStart) {
            currentEntry = {};
            currentEntry[entryStart[1]] = stripQuotes(entryStart[2]);
            entries.push(currentEntry);
        } else if (currentEntry && property) {
            currentEntry[property[1]] = stripQuotes(property[2]);
        }
    });

    return entries;
}

function readFrontMatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (!match) {
        return {};
    }

    return match[1].split('\n').reduce(function (frontMatter, line) {
        const property = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

        if (property) {
            frontMatter[property[1]] = stripQuotes(property[2]);
        }

        return frontMatter;
    }, {});
}

function parseDate(value) {
    if (!value) {
        return 0;
    }

    const normalizedValue = value.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{4})$/, '$1T$2$3');
    const timestamp = Date.parse(normalizedValue);

    return Number.isNaN(timestamp) ? 0 : timestamp;
}

function toLinkhubImage(partner) {
    const fileName = path.basename(partner.image || '');
    return fileName.replace(/\.(png|jpe?g)$/i, '.webp').replace('gamestar_tech', 'gamestartech');
}

function getNewestArticle(filePath) {
    return readYamlList(filePath).sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })[0];
}

function getNewestPost() {
    const newestPost = fs
        .readdirSync(postsPath)
        .filter(function (fileName) {
            return fileName.endsWith('.md');
        })
        .map(function (fileName) {
            const filePath = path.join(postsPath, fileName);
            const frontMatter = readFrontMatter(filePath);

            return {
                fileName,
                frontMatter,
                timestamp: parseDate(frontMatter.date) || parseDate(fileName.slice(0, 10)),
            };
        })
        .sort(function (a, b) {
            return b.timestamp - a.timestamp;
        })[0];
    const slug = newestPost.fileName.replace(/\.md$/, '');

    return {
        title: newestPost.frontMatter.title,
        imgSrc: 'logo.webp',
        url: `https://oliverjessner.at/blog/${slug}/`,
    };
}

function generateJournalismLinks(linkHubData, partners) {
    const validPartner = partners
        .filter(function (partner) {
            return partner.type === 'media_outlet' && !exceptions.journalism.includes(partner.title);
        })
        .map(function (partner) {
            return {
                title: partner.altTitle,
                url: partner.url,
                imgSrc: toLinkhubImage(partner),
            };
        });

    linkHubData.journalism.links = validPartner;
}

function generateSocialMediaLinks(linkHubData, socialMediaLinks) {
    const validSocials = socialMediaLinks.filter(e => !exceptions.socialMedia.includes(e.title));

    linkHubData.socialLinks.links = validSocials;
}

function generateNews(linkHubData) {
    const newestGolemArticle = getNewestArticle(golemLinksPath);
    const newestIgnArticle = getNewestArticle(ignLinksPath);
    const newestPost = getNewestPost();

    linkHubData.aktuellesLinks.links[0] = {
        rubberband: true,
        title: newestGolemArticle.title,
        imgSrc: 'golem.webp',
        url: newestGolemArticle.link,
    };
    linkHubData.aktuellesLinks.links[1] = newestPost;
    linkHubData.aktuellesLinks.links[2] = {
        title: newestIgnArticle.title,
        imgSrc: 'ign.webp',
        url: newestIgnArticle.link,
    };
}

export default function generateLinkhubData() {
    const linkHubData = readJson(linkhubDataPath);
    const partners = readJson(partnersPath);
    const socialMediaLinks = readJson(socialMediaLinksPath);
    const title = ['Golem', 'IGN', 'Blog'];

    generateNews(linkHubData);
    generateSocialMediaLinks(linkHubData, socialMediaLinks);
    generateJournalismLinks(linkHubData, partners);
    fs.writeFileSync(linkhubDataPath, `${JSON.stringify(linkHubData, null, 4)}\n`, 'utf8');

    console.log(chalk.green('LinkHub data generated successfully.'));
    console.log(chalk.green('News Links:'));
    linkHubData.aktuellesLinks.links.map((link, i) => console.log(chalk.blue(title[i]), ': ', link.title));
    console.log();
    console.log(
        chalk.green('Journalism Links:'),
        '\n',
        linkHubData.journalism.links.map(link => link.title).join(', '),
    );
    console.log();
    console.log(
        chalk.green('Social Media Links:'),
        '\n',
        linkHubData.socialLinks.links.map(link => link.title).join(', '),
    );
    console.log(chalk.green('------------------------------'));
    return linkHubData;
}
