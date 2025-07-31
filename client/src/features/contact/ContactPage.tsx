import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions, feedback, or need help choosing the right product?  
        We're here to help! You can reach out using the form below or through our contact details.
      </Typography>

      {/* Contact Info */}
      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <PhoneIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">+91 98765 43210</Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">support@alpinesports.com</Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">Shimla, Himachal Pradesh, India</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Contact Form */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Send us a message
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Your Name" variant="outlined" fullWidth required />
          <TextField label="Email Address" variant="outlined" fullWidth required />
          <TextField label="Subject" variant="outlined" fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
          />
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
