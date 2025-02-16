import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Search, Brightness4, Brightness7 } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ====================
// 1. THEME CONFIGURATION
// ====================
/**
 * Creates a theme with light/dark mode support.
 * @param {string} mode - "light" or "dark"
 * @returns {object} - Material UI theme object
 */
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#2E3B4E" : "#8BDBF9", // Primary brand color
    },
    secondary: {
      main: mode === "light" ? "#FF6B6B" : "#FFA07A", // Accent color
    },
    background: {
      default: mode === "light" ? "#F5F7FA" : "#121212", // Page background
      paper: mode === "light" ? "#FFFFFF" : "#1E1E1E", // Card background
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Custom font
    h6: {
      fontWeight: 600, // Bold headings
    },
  },
});

// ====================
// 2. ASSET DATA (Mock Database)
// ====================
/**
 * Mock data for digital assets.
 * Replace this with actual API calls or database integration.
 * Each asset has:
 * - id: Unique identifier
 * - title: Name of the asset
 * - price: Price in ETH
 * - image: URL of the asset image
 * - description: Short description of the asset
 */
const assetData = [
  {
    id: 1,
    title: "CryptoPunk #1234",
    price: 2.5,
    image: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=384",
    description: "Rare alien punk from the CryptoPunks collection.",
  },
  {
    id: 2,
    title: "Bored Ape #5678",
    price: 3.8,
    image: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=384",
    description: "Gold fur ape from the Bored Ape Yacht Club.",
  },
  // Add more assets here
];

// ====================
// 3. COMPONENTS
// ====================

/**
 * AppBar Component
 * Contains the navigation and theme toggle.
 */
const AppBarComponent = ({ mode, toggleTheme }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        CoinKard
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Browse Assets
      </Button>
      <Button color="inherit" component={Link} to="/history">
        Transaction History
      </Button>
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Toolbar>
  </AppBar>
);

/**
 * AssetCard Component
 * Displays a single asset in a vertical card layout.
 */
const AssetCard = ({ asset }) => (
  <Card sx={{ height: 400, display: "flex", flexDirection: "column" }}>
    <CardMedia
      component="img"
      height="200"
      image={asset.image}
      alt={asset.title}
      sx={{ objectFit: "cover" }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6">
        {asset.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {asset.description}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {asset.price} ETH
      </Typography>
    </CardContent>
    <Button size="small" sx={{ m: 2, alignSelf: "flex-start" }}>
      Trade
    </Button>
  </Card>
);

/**
 * AssetMarketplace Component
 * Displays a grid of asset cards with search and filter functionality.
 */
const AssetMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        placeholder="Search assets..."
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {assetData.map((asset) => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

/**
 * TransactionHistory Component
 * Displays a table of past transactions.
 */
const TransactionHistory = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>
      Transaction History
    </Typography>
    <Typography variant="body1">
      (Transaction history will be displayed here)
    </Typography>
  </Container>
);

// ====================
// 4. MAIN APP COMPONENT
// ====================
const App = () => {
  const [mode, setMode] = useState("light");
  const theme = createTheme(getDesignTokens(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBarComponent mode={mode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<AssetMarketplace />} />
          <Route path="/history" element={<TransactionHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;