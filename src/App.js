import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { 
  Search, 
  Brightness4, 
  Brightness7, 
  AccountCircle 
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ====================
// 1. THEME CONFIGURATION
// ====================
/**
 * Customizable theme settings
 * @param {string} mode - 'light' or 'dark'
 * @returns {object} Theme configuration object
 */
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#4f1ea8' : '#8FD8F9',
    },
    background: {
      default: mode === 'light' ? '#F8F9FA' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' }
  },
  shape: { borderRadius: 12 },
});

// ====================
// 2. MOCK DATA (Replace with actual API calls)
// ====================
const mockAssets = [
  {
    id: 1,
    title: 'Asset #1',
    price: 2.5,
    image: 'https://i.imgur.com/gtoOpmS.jpeg',
    description: 'Funny image',
    category: 'Art'
  },
  {
    id: 2,
    title: 'Asset #2',
    price: 3.8,
    image: 'https://i.imgur.com/VMk5K4t.jpeg',
    description: 'Lil nas X',
    category: 'Collectibles'
  },
  {
    id: 3,
    title: 'Asset #3',
    price: 0.727,
    image: 'https://www.supercars.net/blog/wp-content/uploads/2020/10/2007-Koenigsegg-CCGT-001-1600-1-770x1020.jpg',
    description: 'A nice car',
    category: 'Collectibles'
  },
];

const mockTransactions = [
  { id: 1, asset: 'Asset #1', date: '2024-02-14', status: 'Completed' },
  { id: 2, asset: 'Asset #2', date: '2023-08-16', status: 'Pending' },
  { id: 3, asset: 'Asset #3', date: '2023-08-16', status: 'Pending' },
];

// ====================
// 3. COMPONENTS
// ====================

const AppBarComponent = ({ mode, toggleTheme, handleLoginOpen }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        CoinKard
      </Typography>
      <Button color="inherit" component={Link} to="/">Browse</Button>
      <Button color="inherit" component={Link} to="/history">History</Button>
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
      <IconButton color="inherit" onClick={handleLoginOpen}>
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

const AssetCard = ({ asset }) => (
  <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="400"
      image={asset.image}
      alt={asset.title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6">{asset.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {asset.description}
      </Typography>
      <Typography variant="h6" color="primary">
        {asset.price} ETH
      </Typography>
    </CardContent>
    <Button variant="contained" sx={{ m: 2 }}>Initiate Trade</Button>
  </Card>
);

const AssetMarketplace = ({ assets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAssets = assets.filter(asset => 
    asset.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || asset.category === categoryFilter)
  );

  return (
    <Container sx={{ py: 4 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <TextField
          placeholder="Search assets..."
          variant="outlined"
          size="small"
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          sx={{ flex: 1 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="Art">Art</MenuItem>
          <MenuItem value="Collectibles">Collectibles</MenuItem>
        </Select>
      </div>

      <Grid container spacing={3}>
        {filteredAssets.map(asset => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const TransactionHistory = ({ transactions }) => (
  <Container sx={{ py: 4 }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.asset}</TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

const AuthDialog = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
        {!isLogin && (
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create account' : 'Existing user? Login'}
        </Button>
        <Button variant="contained" onClick={onClose}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ====================
// 4. MAIN APP COMPONENT
// ====================
const App = () => {
  const [mode, setMode] = useState('light');
  const [authOpen, setAuthOpen] = useState(false);
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBarComponent 
          mode={mode} 
          toggleTheme={() => setMode(m => m === 'light' ? 'dark' : 'light')}
          handleLoginOpen={() => setAuthOpen(true)}
        />
        
        <Routes>
          <Route path="/" element={<AssetMarketplace assets={mockAssets} />} />
          <Route 
            path="/history" 
            element={<TransactionHistory transactions={mockTransactions} />} 
          />
        </Routes>

        <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
      </Router>
    </ThemeProvider>
  );
};

export default App;