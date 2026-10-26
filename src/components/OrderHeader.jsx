
import { Box, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEvent } from "../context/EventContext";

export default function OrderHeader() {
  const { selectedEvent } = useEvent();

  const orderNumber = selectedEvent?.orderNumber || "N/A";
  const ticketCount = selectedEvent?.tix || 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        pt: 2,
        pb: 1,
        mb: -0.7,
        borderRadius: 0,
        bgcolor: "#fff",
        border: "0px solid #e0e0e0",
      }}
    >
      {/* Left side */}
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: 14 }}
        >
          Order #{orderNumber}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={600}
          fontSize={13}
        >
          x{ticketCount}{" "}
          {ticketCount === 1 ? "Ticket" : "Tickets"}
        </Typography>
      </Box>

      {/* Right side */}
      <IconButton
        size="small"
        sx={{ p: 0 }}
      >
        <MoreVertIcon
          sx={{
            fontSize: 20,
            color: "text.secondary",
          }}
        />
      </IconButton>
    </Box>
  );
}

