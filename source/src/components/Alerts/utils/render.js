import React from 'react';
import styles from '../styles';
import { Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { actions as actionsAlert } from 'state/ducks/alerts';

const processReplace = (contentText, value) =>
    contentText.replace('{{value}}', value || '');

const RenderArticleLink = ({ link, articuloId, value }) => {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(actionsAlert.isVisibleAlert({ isVisible: true, articuloId: articuloId.slice(11) }));
    };

    return (
        <Link
            href="#"
            sx={styles.link}
            onClick={openModal}
            rel="noopener"
        >
            {processReplace(link, value)}
        </Link>
    );
};

const RenderLink = ({ link, url, value2, value }) => {
    return value2 === 'DISABLED' ? (
        <>{processReplace(link, value)}</>
    ) : (
        <Link
            href={processReplace(url, value) || ''}
            sx={styles.link}
            target="_blank"
            rel="noopener"
        >
            {processReplace(link, value)}
        </Link>
    );
};

export { RenderArticleLink, RenderLink };
