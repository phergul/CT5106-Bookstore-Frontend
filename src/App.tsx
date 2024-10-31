import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GetBooks from './components/GetBooks';
import GetAuthors from './components/GetAuthors';
import GetPublishers from './components/GetPublishers';
import GetReviews from './components/GetReviews';

const queryClient = new QueryClient();

function App() {
  return (
    <Container disableGutters={true} maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Book Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <GetBooks />
        <GetAuthors />
        <GetPublishers />
        <GetReviews />
      </QueryClientProvider>
    </Container>
  );
}

export default App;