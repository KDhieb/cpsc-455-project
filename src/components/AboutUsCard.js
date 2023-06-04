import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Slider from '@mui/material/Slider';
import {useState} from "react";
import {styled} from "@mui/material";

// based on https://mui.com/material-ui/react-card/ control UI card example
export default function AboutUsCard({developer}) {
    const theme = useTheme();

    const [slideIndex, setSlideIndex] = useState(0);

    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousSlide = () => {
        setSlideIndex((prevIndex) => prevIndex - 1);
    };

    const handleSlideChange = (event, newIndex) => {
        setSlideIndex(newIndex);
    };

    const CustomSlider = styled(Slider)(({ theme }) => ({
        width: '80%',
        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            width: 15,
            height: 15,
            backgroundColor: '#fff',
            '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
            },
        },
    }));

    return (
        <div className="about-us-card">
        <Card sx={{ display: 'flex' , background: 'darkgray', width: 'fit-content'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {developer.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {developer.name}
                    </Typography>
                </CardContent>
                <CustomSlider
                    value={slideIndex}
                    onChange={handleSlideChange}
                    min={0}
                    max={2} // Adjust the maximum value based on the number of slides
                    step={1}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous" onClick={handlePreviousSlide}>
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next" onClick={handleNextSlide}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={developer.img}
                alt="placeholder album cover"
            />
        </Card>
            <div className='about-us-card-carousel'>
                {slideIndex === 0 && <h3>{developer.description}</h3>}
                {slideIndex === 1 && <h3>{developer.linkedin}</h3>}
                {slideIndex === 2 && <h3>placeholder 3</h3>}
            </div>
        </div>
    );
}