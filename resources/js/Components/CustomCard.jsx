// resources/js/Components/CustomCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CustomCard = ({ title, children }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
