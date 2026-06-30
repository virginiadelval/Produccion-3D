import { RenderArticleLink, RenderLink } from './render';

const generateContent = (matches, value, value2) => {
    const content = [];

    for (const m of matches) {
        const { textStart, link, url, textEnd, articuloId } = m.groups

        if (content.length) {
            content.push('')
        }

        if (textStart) content.push(textStart.replace('{{value}}', value));

        if (articuloId) {
            content.push(<RenderArticleLink key={articuloId} link={link} articuloId={articuloId} value={value} />)
        } else if (link) {
            content.push(<RenderLink key={link} link={link} url={url} value2={value2} value={value} />)
        }

        if (textEnd) content.push(textEnd.replace('{{value}}', value));
    }

    return content
};

export default generateContent