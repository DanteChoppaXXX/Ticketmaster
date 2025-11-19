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
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import { useEvent } from "../context/EventContext";

export default function CustomizeTicket() {
  const { events, updateEvent } = useEvent();

  const [formData, setFormData] = useState(events);
  const [previewImg, setPreviewImg] = useState(events.image);
  const [toastOpen, setToastOpen] = useState(false);

  // Sync context → local form
  useEffect(() => {
    setFormData(events);
    setPreviewImg(events.image);
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
    const updatedSeats = [...formData.seatMap];
    updatedSeats[index][key] = value;

    setFormData((prev) => ({
      ...prev,
      seatMap: updatedSeats,
    }));
  };

  const addSeat = () => {
    setFormData((prev) => ({
      ...prev,
      seatMap: [...prev.seatMap, { sec: "", row: "", seat: "" }],
    }));
  };

  const removeSeat = (index) => {
    const updatedSeats = formData.seatMap.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      seatMap: updatedSeats,
    }));
  };

  // ------------------------------------------
  // SAVE CHANGES
  // ------------------------------------------
  const handleSave = () => {
    updateEvent(formData);
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
          <TextField fullWidth label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Ticket Count" type="number" name="tix" value={formData.tix} onChange={handleChange} sx={{ mb: 2 }} />

          <Divider sx={{ my: 3 }} />

          {/* SEAT MANAGEMENT */}
          <Typography sx={{ mb: 1, fontWeight: "bold" }}>Seat Map</Typography>

          {formData.seatMap.map((seat, index) => (
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

      {/* RIGHT — LIVE PREVIEW */}
      <Paper elevation={4} sx={{ width: "100%", maxWidth: 380, height: "fit-content", borderRadius: 3, overflow: "hidden", p: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#1877F2", fontWeight: 700, mb: 1 }}>
          Your Ticket Preview
        </Typography>

        <Paper sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#121212", color: "#fff" }}>
          <img src={previewImg} style={{ width: "100%", height: 180, objectFit: "cover" }} alt="poster" />

          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{formData.name}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>{formData.date}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1, gap: 1 }}>
              <VerifiedIcon fontSize="small" color="info" />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>Verified Resale Ticket</Typography>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Seats</Typography>
            {formData.seatMap.map((s, i) => (
              <Typography key={i} variant="body2">Sec {s.sec} • Row {s.row} • Seat {s.seat}</Typography>
            ))}

            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ConfirmationNumberIcon fontSize="small" />
              <Typography variant="subtitle2">{formData.tix} Ticket{formData.tix > 1 ? "s" : ""}</Typography>
            </Box>
          </Box>
        </Paper>
      </Paper>

      {/* SUCCESS TOAST */}
      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="success" variant="filled">Event updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
}

