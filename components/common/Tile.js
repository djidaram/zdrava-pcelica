import React from 'react';

import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { MDXRemote } from 'next-mdx-remote';


const Tile = ({ promotion, cmsDomain }) => {
    const { image: { formats: { medium: { url } } } } = promotion;

    const [isDialogDisplayed, setDialogDisplayed] = React.useState(false);

    return (
        <div>
            <Card className='tile'>
                <CardActionArea
                    className='tile-action-area'
                    onClick={() => setDialogDisplayed(true)}
                >
                    <CardMedia
                        className='tile-image'
                        image={url}
                        title='Promotion Image'
                    />
                </CardActionArea>
            </Card>
            <Details
                promotion={promotion}
                isOpen={isDialogDisplayed}
                closeCallback={setDialogDisplayed}
            />
        </div>
    );
};

const Details = ({ promotion, isOpen, closeCallback }) => {
    const { id, title, description } = promotion;
    const { image: { formats: { medium: { url } } } } = promotion;

    const idDetailsTitle = `details-title-${id}`;
    const idDetailsDescription = `details-description-${id}`;

    return (
        <Dialog
            keepMounted
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={isOpen}
            onClose={() => closeCallback(false)}
            aria-labelledby={idDetailsTitle}
            aria-describedby={idDetailsDescription}
        >
            <div className='dialog'>
                <IconButton
                    onClick={() => closeCallback(false)}
                    className='button-close'
                >
                    <Close />
                </IconButton>
                <div className='sections'>
                    <DialogTitle
                        id={idDetailsTitle}
                        disableTypography
                    >

                        <h2>{title}</h2>
                    </DialogTitle>
                    <DialogContent id={idDetailsDescription}>
                        <img src={url} />
                        <div>
                            <MDXRemote {...description} />
                        </div>
                    </DialogContent>
                </div>
            </div>
        </Dialog >
    );
};

export default Tile;
