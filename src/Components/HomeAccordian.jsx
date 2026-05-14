import React from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Typography, 
    Box, 
    List, 
    ListItem 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductAccordions = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const accordionStyle = {
        boxShadow: 'none',
        borderTop: '1px solid #e0e0e0',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 },
    };

    const summaryStyle = {
        px: 0,
        '& .MuiAccordionSummary-content': { margin: '20px 0' },
    };

    return (
        <Box sx={{ mt: 4 }}>
            {/* Section 1: What Makes It Potent? */}
            <Accordion 
                expanded={expanded === 'panel1'} 
                onChange={handleChange('panel1')}
                sx={accordionStyle}
            >
                <AccordionSummary 
                    expandIcon={expanded === 'panel1' ? <RemoveIcon /> : <AddIcon />}
                    sx={summaryStyle}
                >
                    <Typography sx={{ ...Theme.font16SemiBold }}>What Makes It Potent?</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3 }}>
                    <List sx={{ listStyleType: 'disc', pl: 4 }}>
                        {[
                            "Effectively dissolves waterproof makeup and sunscreen: A carefully chosen combination of oils and surfactants works to break down tough-to-remove products.",
                            "Deep cleans without drying: The richness of the oils ensure a thorough cleanse while maintaining the skin's moisture barrier.",
                            "Leaves skin soft and comfortable: Your skin feels supple and nourished, never tight or stripped.",
                            "Rich in natural fatty acids: The formula supports skin softness and helps maintain a healthy skin barrier."
                        ].map((text, i) => (
                            <ListItem key={i} sx={{ display: 'list-item', p: 0, mb: 1, ...Theme.font14Regular }}>
                                {text}
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>

            {/* Section 2: Ideal For */}
            <Accordion 
                expanded={expanded === 'panel2'} 
                onChange={handleChange('panel2')}
                sx={accordionStyle}
            >
                <AccordionSummary 
                    expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}
                    sx={summaryStyle}
                >
                    <Typography sx={{ ...Theme.font16SemiBold }}>Ideal For</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3 }}>
                    <Typography sx={{ ...Theme.font14Regular, mb: 1 }}>
                        Suitable for all skin types, this oil cleanser is recommended for anyone who wears waterproof makeup, uses sunscreen and is struggling with daily buildup.
                    </Typography>
                    <Typography sx={{ ...Theme.font14Regular }}><strong>Benefit:</strong> Gently removes oils & impurities, leaves skin clean.</Typography>
                    <Typography sx={{ ...Theme.font14Regular }}><strong>Age group:</strong> 12+</Typography>
                </AccordionDetails>
            </Accordion>

            {/* Section 3: How to Use */}
            <Accordion 
                expanded={expanded === 'panel3'} 
                onChange={handleChange('panel3')}
                sx={{ ...accordionStyle, borderBottom: '1px solid #e0e0e0' }}
            >
                <AccordionSummary 
                    expandIcon={expanded === 'panel3' ? <RemoveIcon /> : <AddIcon />}
                    sx={summaryStyle}
                >
                    <Typography sx={{ ...Theme.font16SemiBold }}>How to Use</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3 }}>
                    <Typography sx={{ ...Theme.font14Regular, mb: 1 }}><strong>Use:</strong> AM/PM everyday.</Typography>
                    <Typography sx={{ ...Theme.font14Regular }}>
                        Dispense a coin size amount on your dry hands. Gently massage on dry face to dissolve makeup, sunscreen, dirt etc. Rinse thoroughly with lukewarm water and follow with your regular cleanser.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};