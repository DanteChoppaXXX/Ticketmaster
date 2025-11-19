import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const TicketCard = ({ date, image, location, name, order }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 3,
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="185"
          image={image}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, color: "text.secondary" }}>
            <CalendarTodayOutlinedIcon sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="body2">{date}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
            <LocationOnOutlinedIcon sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ pl: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {`Order ${order}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TicketCard;
