import axios from "axios";
import { useConnect, useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { useState } from 'react';

function Login() {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [profile, setProfile] = useState(null);

  async function login() {
    console.log("Available connectors:", connectors);
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const metaMaskConnector = connectors.find(c => c.id === 'metaMaskSDK');
      if (!metaMaskConnector) {
        console.error('MetaMask connector not found');
        return;
      }

      const result = await connectAsync({ connector: metaMaskConnector });

      console.log("connectAsync result:", result);

      // Use the actual keys wagmi gives you
      const account = result.accounts[0]
      const chainId = result.chainId; // may be undefined if wallet is on unconfigured chain

      const { data } = await axios.post('http://localhost:8000/auth/request-challenge/', {
        address: account,
        chain: String(chainId),
        network: 'evm',
      });

      const message = data.message;
      const signature = await signMessageAsync({ message });

      const verification = await axios.post('http://localhost:8000/auth/verify/', {
        message,
        signature,
      });

      console.log('Verification success');
      setProfile(verification.data);
    } catch (err) {
      console.error('Login failed:', err);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1>🗳 Blockchain Voting Login</h1>
      {profile ? (
        <>
          <h3>✅ Logged in as {profile.address}</h3>
          {profile.profileId && <p>Profile ID: {profile.profileId}</p>}
          <button onClick={() => setProfile(null)}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with MetaMask</button>
      )}
    </div>
  );
}

export default Login;
