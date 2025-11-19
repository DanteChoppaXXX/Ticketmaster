import React from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

const CustomForm = () => {
  const number = 4;
  const section = "506";
  const row = "5";
  const seat = "7 - 8";
  const section01 = "544";
  const row01 = "20";
  const seat01 = "20 - 21";

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography variant="h6">TRANSFER TICKETS</Typography>
      </Box>
      <Divider />

      <Container sx={{ mt: 2 }}>
        {/* Ticket Info */}
        <Box mb={2}>
          <Typography variant="body1" gutterBottom>
            {number} Ticket(s) Selected
          </Typography>

          <Typography variant="body1" gutterBottom>
            <span style={{ color: "grey" }}>Sec</span> {section01}{" "}
            <span style={{ color: "grey" }}>Row</span> {row01}{" "}
            <span style={{ color: "grey" }}>Seat</span> {seat01}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <span style={{ color: "grey" }}>Sec</span> {section}{" "}
            <span style={{ color: "grey" }}>Row</span> {row}{" "}
            <span style={{ color: "grey" }}>Seat</span> {seat}
          </Typography>
        </Box>

        {/* Form Fields */}
        <form>
          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              First Name
            </Typography>
            <TextField size="small" label="First Name" variant="outlined" fullWidth />
          </Box>

          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Last Name
            </Typography>
            <TextField size="small" label="Last Name" variant="outlined" fullWidth />
          </Box>

          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Email or Mobile Number
            </Typography>
            <TextField
              size="small"
              label="Email or Mobile Number"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Note
            </Typography>
            <TextField size="small" variant="outlined" fullWidth />
          </Box>
        </form>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <IconButton sx={{ color: "#026AE1" }}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{ bgcolor: "#026AE1", color: "#fff", textTransform: "capitalize" }}
          >
            Transfer {number} Ticket(s)
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomForm;
