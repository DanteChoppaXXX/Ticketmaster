import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Modal,
  TextField,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getAuth, signOut } from "firebase/auth";

export default function MyAccount() {
  const auth = getAuth();

  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const lightDivider = <Divider sx={{ opacity: 0.3, my: 0.5 }} />;

  const handleSave = () => {
    // TODO: Connect to Firebase updateEmail / updateProfile
    setEditOpen(false);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.default", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <Box sx={{ display: "flex", bgcolor: "#1f262e", alignItems: "center", px: 2, py: 1.5 }}>
        <IconButton size="small" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ color: "#ffffff", flex: 1, textAlign: "center", fontSize: 18, fontWeight: 600, mr: 3 }}>
          My Account
        </Typography>
      </Box>

      {/* USER INFO — now clickable */}
      <Box
        sx={{ px: 3, pt: 2, pb: 2, cursor: "pointer", bgcolor:"#1f262e", color:"#ffffff" }}
        onClick={() => setEditOpen(true)}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>{username}</Typography>
        <Typography sx={{ opacity: 0.7 }}>{email}</Typography>
      </Box>

      <Divider />

      {/* (everything else remains unchanged below)… */}

      {/* =================== NOTIFICATIONS =================== */}
      <SectionTitle title="Notifications" />
      <List disablePadding sx={{ px: 2 }}>
        <SettingItem icon={<NotificationsNoneIcon />} title="My Notifications" />
        {lightDivider}
        <SettingItem icon={<MailOutlineIcon />} title="Receive Notifications?" />
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* =================== LOCATION SETTINGS =================== */}
      <SectionTitle title="Location Settings" />
      <List disablePadding sx={{ px: 2 }}>
        <SettingItem
          icon={<LocationOnOutlinedIcon />}
          title="My Location"
          subtitle="New York, NY"
          arrow
        />
        {lightDivider}
        <SettingItem
          icon={<PublicOutlinedIcon />}
          title="My Country"
          subtitle="United States"
          arrow
        />
        {lightDivider}
        <SettingItemToggle icon={<NearMeOutlinedIcon />} title="Location Based Content" defaultOn />
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* =================== PREFERENCES =================== */}
      <SectionTitle title="Preferences" />
      <List disablePadding sx={{ px: 2 }}>
        <SettingItemToggle icon={<FavoriteBorderIcon />} title="My Favorites" />
        {lightDivider}
        <SettingItemToggle icon={<CreditCardOutlinedIcon />} title="Saved Payment Methods" defaultOn />
        {lightDivider}
        <SettingItemToggle icon={<PhoneIphoneOutlinedIcon />} title="Change App Icon" />

        {lightDivider}
        <SettingItem icon={<LanguageOutlinedIcon />} title="Language" subtitle="English (US)" arrow />
        {lightDivider}
        <SettingItem icon={<AttachMoneyOutlinedIcon />} title="Currency" subtitle="USD ($)" arrow />
        {lightDivider}
        <SettingItemToggle icon={<AccessibilityNewOutlinedIcon />} title="Accessibility Options" />
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* =================== ACCOUNT & SECURITY =================== */}
      <SectionTitle title="Account & Security" />
      <List disablePadding sx={{ px: 2 }}>
        <SettingItem icon={<SecurityOutlinedIcon />} title="Privacy & Sharing" arrow />
        {lightDivider}
        <SettingItem icon={<AppsOutlinedIcon />} title="Connected Apps" arrow />
        {lightDivider}
        <SettingItem icon={<HistoryOutlinedIcon />} title="Purchase History" arrow />
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* =================== HELP & SUPPORT =================== */}
      <SectionTitle title="Help & Guidance" />
      <List disablePadding sx={{ px: 2 }}>
        <SettingItem icon={<HelpOutlineIcon />} title="Help Center" arrow />
        {lightDivider}
        <SettingItem icon={<InfoOutlinedIcon />} title="About / Terms & Privacy" arrow />
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* =================== SIGN OUT =================== */}
      <Box sx={{ px: 16, py: 2, mb: 8 }}>
        <Button
          fullWidth
          variant="contained"
          color="#555444"
          sx={{ color: "#ee1000", textTransform: "none", fontWeight: 600, py: 0.5, borderRadius: 1 }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>

      {/* =================== EDIT PROFILE MODAL =================== */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box
          component={Paper}
          sx={{
            width: 330,
            p: 3,
            borderRadius: 3,
            mx: "auto",
            mt: "20vh",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>Edit Profile</Typography>

          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setEditOpen(false)}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}

/* ---------- Reusable Components ---------- */

function SectionTitle({ title }) {
  return (
    <Typography sx={{ px: 3, pt: 2, pb: 1, fontWeight: 600 }}>
      {title}
    </Typography>
  );
}

function SettingItem({ icon, title, subtitle, arrow }) {
  return (
    <ListItem button sx={{ py: 1 }}>
      <ListItemIcon>{icon}</ListItemIcon>

      <ListItemText
        primary={title}
        secondary={subtitle}
        secondaryTypographyProps={{ sx: { opacity: 0.7 } }}
      />

      {arrow && <ArrowBackIosNewIcon sx={{ fontSize: 16, rotate: "180deg", opacity: 0.6 }} />}
    </ListItem>
  );
}

function SettingItemToggle({ icon, title, defaultOn }) {
  return (
    <ListItem sx={{ py: 1 }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
      <Switch defaultChecked={!!defaultOn} />
    </ListItem>
  );
}

