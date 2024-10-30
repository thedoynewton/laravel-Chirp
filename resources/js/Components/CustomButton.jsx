// resources/js/Components/CustomButton.js
import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, color = 'primary', variant = 'contained' }) => {
    return (
        <Button color={color} variant={variant} onClick={onClick}>
            {children}
        </Button>
    );
};

export default CustomButton;
