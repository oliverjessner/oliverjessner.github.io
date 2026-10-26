import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const linkhubDataPath = path.join(__dirname, 'linkhub-data.json');
const zeitLinksPath = path.join(__dirname, '..', '..', '_data', 'publications', 'zeit.json');
const golemLinksPath = path.join(__dirname, '..', '..', '_data', 'publications', 'golem.json');
const ignLinksPath = path.join(__dirname, '..', '..', '_data', 'publications', 'ign.json');
const postsPath = path.join(__dirname, '..', '..', 'collections', '_posts');
const socialMediaLinksPath = path.join(__dirname, '..', '..', '_data', 'data', 'social.json');
const partnersPath = path.join(__dirname, '..', '..', '_data', 'data', 'partners.json');
const exceptions = Object.freeze({
    journalism: ['t3n'],
    socialMedia: ['LinkHub'],
});

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readFrontMatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) {
        return {};
    }

    return yaml.load(match[1], { schema: yaml.JSON_SCHEMA }) || {};
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
    return readJson(filePath).sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })[0];
}

function getNewestPost(postFile, siteUrl) {
    const selectedPath = postFile ? path.resolve(__dirname, '../..', postFile) : null;
    if (selectedPath && (path.dirname(selectedPath) !== postsPath || !selectedPath.endsWith('.md'))) {
        throw new Error('The selected Linkhub post must be a Markdown file in collections/_posts.');
    }
    const newestPost = selectedPath ? {
        fileName: path.basename(selectedPath),
        frontMatter: readFrontMatter(selectedPath),
    } : fs
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
        imgSrc: 'oj.webp',
        url: `${siteUrl.replace(/\/$/, '')}/blog/${slug}/`,
        description: 'Blog',
    };
}

function getLinkPresentation(links) {
    return new Map(links.map(({ url, label, description }) => [url, { label, description }]));
}

function generateJournalismLinks(linkHubData, partners) {
    const presentation = getLinkPresentation(linkHubData.journalism.links);
    const validPartner = partners
        .filter(function (partner) {
            return partner.type === 'media_outlet' && !exceptions.journalism.includes(partner.title);
        })
        .map(function (partner) {
            return {
                title: partner.altTitle,
                url: partner.url,
                imgSrc: toLinkhubImage(partner),
                ...presentation.get(partner.url),
            };
        });

    linkHubData.journalism.links = validPartner;
}

function generateSocialMediaLinks(linkHubData, socialMediaLinks) {
    const presentation = getLinkPresentation(linkHubData.socialLinks.links);
    const validSocials = socialMediaLinks.filter(e => !exceptions.socialMedia.includes(e.title));

    linkHubData.socialLinks.links = validSocials.map(social => ({ ...social, ...presentation.get(social.url) }));
}

function generateNews(linkHubData, { postFile, siteUrl }) {
    const newestZeitArticle = getNewestArticle(zeitLinksPath);
    const newestGolemArticle = getNewestArticle(golemLinksPath);
    const newestIgnArticle = getNewestArticle(ignLinksPath);
    const newestPost = getNewestPost(postFile, siteUrl);

    const pinnedLinks = linkHubData.aktuellesLinks.links.filter(link => link.pinned);
    linkHubData.aktuellesLinks.links = [
        ...pinnedLinks,
        {
            rubberband: true,
            title: newestZeitArticle.title,
            imgSrc: 'diezeit.webp',
            url: newestZeitArticle.link,
            description: 'DIE ZEIT',
        },
        {
            rubberband: true,
            title: newestGolemArticle.title,
            imgSrc: 'golem.webp',
            url: newestGolemArticle.link,
            description: 'Golem.de',
        },
        {
            rubberband: true,
            title: newestIgnArticle.title,
            imgSrc: 'ign.webp',
            url: newestIgnArticle.link,
            description: 'IGN',
        },
        newestPost,
    ];
}

export default function generateLinkhubData({ postFile, siteUrl = 'https://oliverjessner.at' } = {}) {
    const linkHubData = readJson(linkhubDataPath);
    const partners = readJson(partnersPath);
    const socialMediaLinks = readJson(socialMediaLinksPath);

    generateNews(linkHubData, { postFile, siteUrl });
    generateSocialMediaLinks(linkHubData, socialMediaLinks);
    generateJournalismLinks(linkHubData, partners);
    fs.writeFileSync(linkhubDataPath, `${JSON.stringify(linkHubData, null, 4)}\n`, 'utf8');

    console.log(chalk.green('LinkHub data generated successfully.'));
    console.log(chalk.green('News Links:'));
    linkHubData.aktuellesLinks.links.map(link => console.log(chalk.blue(link.description), ': ', link.title));
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
