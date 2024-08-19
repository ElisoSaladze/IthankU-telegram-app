import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReactNode } from "react";
import RemoveIcon from "@mui/icons-material/Remove";

const style = {
  padding: 0,
  boxShadow: "none",
  "&.MuiPaper-elevation1": {
    boxShadow: "none",
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
};

type Props = {
  title: string;
  children: ReactNode;
  expanded: boolean;
  onChange: () => void;
};

const CustomAccordion = ({ title, children, expanded, onChange }: Props) => {
  return (
    <Accordion expanded={expanded} onChange={onChange} sx={style}>
      <AccordionSummary
        sx={{ padding: 0 }}
        expandIcon={expanded ? <RemoveIcon color="primary" /> : <AddIcon />}
      >
        <Typography color={expanded ? "primary" : "black"}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
