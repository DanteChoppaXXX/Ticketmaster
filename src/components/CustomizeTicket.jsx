import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Tab,
  Tabs,
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

  const [tabValue, setTabValue] = useState(0);

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
      if (!formData.id) {
        return console.error("Missing ID!");
      }

      const updatedFormData = {
        ...formData,
        ticketType: tabValue === 1 ? "generalAdmission" : "regular",
      };

      await updateEvent(updatedFormData);

      setFormData(updatedFormData);
      setToastOpen(true);
    };

    const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    };

        
  return (
    <Box
      sx={{
        pb: 3,
        display: "flex",
        gap: 0,
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
       {/* TABS */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            background: "#000000",
            color: "#ffffff",

            // inactive tab text
            "& .MuiTab-root": {
              color: "#d0d0d0",
              textTransform: "none",
              fontWeight: 500,
            },

            // active tab text
            "& .Mui-selected": {
              color: "#ffffff !important",
              fontWeight: 600,
            },

            // indicator bar color
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Tab label={`Regular`} />
          <Tab label="General Admission" />
        </Tabs>

      {/* LEFT — EDITOR */}
      {tabValue === 0 && (
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
          <TextField fullWidth placeholder="Event Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Ticket Title" name="title" value={formData.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Date & Venue" name="date" value={formData.date} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Seating" name="seating" value={formData.seating} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Map Venue" name="venue" value={formData.venue} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Ticket Count" type="number" name="tix" value={formData.tix} onChange={handleChange} sx={{ mb: 2 }} />

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

    )}
        {tabValue === 1 && (
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
            General Admission
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
          <TextField fullWidth placeholder="Event Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Ticket Title" name="title" value={formData.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Date & Venue" name="date" value={formData.date} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Seating" name="seating" value={formData.seating} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Map Venue" name="venue" value={formData.venue} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth placeholder="Ticket Count" type="number" name="tix" value={formData.tix} onChange={handleChange} sx={{ mb: 2 }} />

          <Divider sx={{ my: 3 }} />

          {/* SEAT MANAGEMENT */}
          <Typography sx={{ mb: 1, fontWeight: "bold" }}>Seat Map</Typography>

          {(formData.seatMap || []).map((seat, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField label="Section" value={seat.sec} onChange={(e) => handleSeatChange(index, "sec", e.target.value)} />
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
        )}    

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

