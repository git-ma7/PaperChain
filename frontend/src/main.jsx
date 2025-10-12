import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './components/AuthContext.jsx';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, polygon, sepolia],
  transports: {
    [mainnet.id]: http(),       // defaults to public RPC
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [metaMask()],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider> 
    </WagmiProvider>
  </StrictMode>,
)
