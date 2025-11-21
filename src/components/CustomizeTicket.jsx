import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import walletIcon from "../icons/icon_wallet.svg";
import verified from "../assets/ver.png";

import { useEvent } from "../context/EventContext";

export default function CustomizeTicket() {
  const { events, updateEvent } = useEvent();

  const [formData, setFormData] = useState({
    ...events,
    seatMap: events.seatMap || [],
  });
  const [previewImg, setPreviewImg] = useState(events.image);
  const [toastOpen, setToastOpen] = useState(false);

  // Sync context → local form safely
     useEffect(() => {
      if (!events || events.length === 0) return;
      const currentEvent = Array.isArray(events) ? events[0] : events;
      setFormData({
        ...currentEvent,
        seatMap: currentEvent.seatMap || [],
        id: currentEvent.id, // <--- important
      });
      setPreviewImg(currentEvent.image);
    }, [events]);

  // ------------------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------------------------------
  // HANDLE IMAGE UPLOAD (Base64)
  // ------------------------------------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setPreviewImg(base64data);
      setFormData((prev) => ({ ...prev, image: base64data }));
    };
    reader.readAsDataURL(file);
  };

  // ------------------------------------------
  // HANDLE SEAT CHANGES
  // ------------------------------------------
  const handleSeatChange = (index, key, value) => {
    const updatedSeats = [...(formData.seatMap || [])];
    updatedSeats[index][key] = value;

    setFormData((prev) => ({
      ...prev,
      seatMap: updatedSeats,
    }));
  };

  const addSeat = () => {
    setFormData((prev) => ({
      ...prev,
      seatMap: [...(prev.seatMap || []), { sec: "", row: "", seat: "" }],
    }));
  };

  const removeSeat = (index) => {
    const updatedSeats = (formData.seatMap || []).filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      seatMap: updatedSeats,
    }));
  };

  // ------------------------------------------
  // SAVE CHANGES → update Firestore via EventContext
  // ------------------------------------------
 
    const handleSave = async () => {
      console.log("Save clicked", formData);
      if (!formData.id) return console.error("Missing ID!");
      await updateEvent(formData.id, formData);
      console.log("Event updated!");
      setToastOpen(true);
    };
        
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        gap: 3,
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* LEFT — EDITOR */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 2,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Customize Ticket
          </Typography>

          {/* IMAGE UPLOAD */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              variant="rounded"
              src={previewImg}
              sx={{
                width: 180,
                height: 180,
                margin: "0 auto",
                borderRadius: 2,
                boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
              }}
            />
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* MAIN FIELDS */}
          <TextField fullWidth label="Event Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Ticket Title" name="title" value={formData.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Date & Venue" name="date" value={formData.date} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Seating" name="seating" value={formData.seating} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Ticket Count" type="number" name="tix" value={formData.tix} onChange={handleChange} sx={{ mb: 2 }} />

          <Divider sx={{ my: 3 }} />

          {/* SEAT MANAGEMENT */}
          <Typography sx={{ mb: 1, fontWeight: "bold" }}>Seat Map</Typography>

          {(formData.seatMap || []).map((seat, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField label="Section" value={seat.sec} onChange={(e) => handleSeatChange(index, "sec", e.target.value)} />
              <TextField label="Row" value={seat.row} onChange={(e) => handleSeatChange(index, "row", e.target.value)} />
              <TextField label="Seat" value={seat.seat} onChange={(e) => handleSeatChange(index, "seat", e.target.value)} />
              <IconButton color="error" onClick={() => removeSeat(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}

          <Button variant="outlined" onClick={addSeat} sx={{ mt: 1 }}>
            + Add Seat
          </Button>

          {/* SAVE BUTTON */}
          <Button variant="contained" fullWidth sx={{ mt: 4, py: 1.2, fontWeight: "bold", borderRadius: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* FULL TICKET PREVIEW — matches TicketCard UI */}
  <Box
    sx={{
      width: "100%",
      background: "white",
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.12)",
    }}
  >
    {/* Top Title Bar */}
    <Box
      sx={{
        height: 30,
        background: "#0064ca",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <Typography sx={{ pt: 0.5, fontSize: 13, fontWeight: 500 }}>
        {formData.title || "Ticket Title"}
      </Typography>
    </Box>

    {/* Blue Header Section */}
    <Box
      sx={{
        background: "#0071e3",
        color: "white",
        p: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          mt: 1,
        }}
      >
        {/* SEC */}
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ opacity: 0.7, fontSize: 12 }}>SEC</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
            {formData.seatMap[0]?.sec || "--"}
          </Typography>
        </Box>

        {/* ROW */}
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ opacity: 0.7, fontSize: 12 }}>ROW</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
            {formData.seatMap[0]?.row || "--"}
          </Typography>
        </Box>

        {/* SEAT */}
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ opacity: 0.7, fontSize: 12 }}>SEAT</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
            {formData.seatMap[0]?.seat || "--"}
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* EVENT IMAGE */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 220,
        overflow: "hidden",
      }}
    >
      <img
        src={previewImg}
        alt="event"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient + Event details */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 0.5,
          color: "white",
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: 500, fontSize: 18 }}>
          {formData.name || "Event Name"}
        </Typography>

        <Typography sx={{ textAlign: "center", fontSize: 14, opacity: 0.9 }}>
          {formData.date || "Date & Venue"}
        </Typography>
      </Box>
    </Box>

    {/* Section Text */}
    <Typography
      sx={{
        textAlign: "center",
        mt: 4,
        fontWeight: 500,
        fontSize: 15,
      }}
    >
      SECTION {formData.seatMap[0]?.sec || "--"}
    </Typography>

    {/* Apple Wallet */}
    <Box sx={{ p: 2, mt: 2, textAlign: "center" }}>
      <Button
        variant="contained"
        sx={{
          background: "#1a1a1a",
          width: "70%",
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 1,
          mx: "auto",
        }}
      >
        <img
          src={walletIcon}
          alt="Apple Wallet"
          style={{ width: 22, height: 22 }}
        />
        Add to Apple Wallet
      </Button>
    </Box>

    {/* Bottom Links */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        pb: 3,
        mt: 2,
      }}
    >
      <Typography sx={{ color: "#0071e3", fontWeight: 700, fontSize: 13 }}>
        View Barcode
      </Typography>

      <Typography sx={{ color: "#0071e3", fontWeight: 700, fontSize: 13 }}>
        Ticket Details
      </Typography>
    </Box>

    {/* Verified Footer */}
    <Box
      sx={{
        height: 30,
        background: "#0064ca",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
      }}
    >
      <img
        src={verified}
        alt="verified"
        style={{ height: 24 }}
      />
    </Box>
  </Box>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Event updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

