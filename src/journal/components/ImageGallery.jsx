import { useState } from 'react';
import { ImageList, ImageListItem, Dialog, DialogContent } from '@mui/material';

/* eslint-disable react/prop-types */
export const ImageGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageDialog = (image) => {
        setSelectedImage(image);
    };

    const closeImageDialog = () => {
        setSelectedImage(null);
    };

    return (
        <div>
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
            {images.map((img) => (
            <ImageListItem key={img} sx={{ marginTop: '10px' }} onClick={() => openImageDialog(img)}>
                <img
                src={`${img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt='fotos notas'
                loading='lazy'
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: "pointer" }}
                />
            </ImageListItem>
            ))}
        </ImageList>

        <Dialog open={Boolean(selectedImage)} onClose={closeImageDialog} >
            <DialogContent >
            <img
                src={selectedImage}
                alt='Imagen completa'
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            </DialogContent>
        </Dialog>
        </div>
    );
};
