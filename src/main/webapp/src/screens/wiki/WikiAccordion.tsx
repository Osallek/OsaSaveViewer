import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, styled } from '@mui/material';
import React from 'react';

interface WikiAccordionProps {
  summary: React.ReactElement;
  details: React.ReactElement;
  expanded: boolean;
  onChange: (expanded: boolean) => void;
}

const StyledAccordionSummary = styled(AccordionSummary)({
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: 'flex-start',
  '& .MuiAccordionSummary-content': {
    flexGrow: 0,
    paddingRight: 8,
  }
});

function WikiAccordion({ summary, details, expanded, onChange }: WikiAccordionProps) {

  return (
    <Accordion expanded={ expanded }
               onChange={ (event, expanded) => onChange(expanded) }
               disableGutters elevation={ 0 } sx={ { width: '100%' } }>
      <StyledAccordionSummary expandIcon={ <ExpandMore color='primary'/> }>
        { summary }
      </StyledAccordionSummary>
      <AccordionDetails sx={ { p: 0 } }>
        { details }
      </AccordionDetails>
    </Accordion>
  )
}

export default WikiAccordion;
