import { Container, Typography, Box} from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Welcome to <strong>Alpine Sports</strong>, your premier destination for high-quality winter sports equipment and gear.
          From snowboards and boots to hats and gloves, we're passionate about helping you conquer the mountains with confidence.
          Our mission is to provide top-tier gear that enhances your winter adventures while ensuring safety and performance.
        </Typography>
        <Typography variant="body1">
          Founded by winter sports enthusiasts in 2018, we've grown from a small mountain town shop to India's trusted online 
          destination for winter sports equipment. Our team consists of experienced riders, skiers, and outdoor professionals 
          who personally test every product we sell. Whether you're hitting the slopes for the first time or you're a seasoned 
          pro looking for the latest gear, we've got everything you need.
        </Typography>

        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Why Choose Alpine Sports?
        </Typography>
        <ul>
          <li><Typography variant="body1">Curated selection from top brands like Burton, K2, Alpine, and Volcom</Typography></li>
          <li><Typography variant="body1">Expert advice from our team of winter sports professionals</Typography></li>
          <li><Typography variant="body1">Fast delivery across India, even to mountain destinations</Typography></li>
          <li><Typography variant="body1">30-day satisfaction guarantee on all products</Typography></li>
          <li><Typography variant="body1">Seasonal gear maintenance and tuning services</Typography></li>
          <li><Typography variant="body1">24/7 customer support from fellow snow enthusiasts</Typography></li>
        </ul>

        <Typography variant="body1" sx={{ mt: 4 }}>
          At Alpine Sports, winter isn't just a season – it's a lifestyle. Join our community of riders and experience 
          the thrill of the mountains with gear that won't let you down. Thank you for choosing us for your winter adventures!
        </Typography>
      </Box>
    </Container>
  );
}