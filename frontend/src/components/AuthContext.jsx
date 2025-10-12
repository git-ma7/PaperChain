// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useConnect, useAccount, useSignMessage, useDisconnect } from 'wagmi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [user, setUser] = useState(null);

  // Decode JWT
  const parseJwt = (token) => {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  };

  // 🔹 Load saved user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = parseJwt(token);
    if (payload && payload.exp * 1000 > Date.now()) {
      setUser({ address: payload.sub, role: payload.role });
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  // 🔹 MetaMask Login
  const login = async () => {
    try {
      if (isConnected) await disconnectAsync();

      const metaMaskConnector = connectors.find(c => c.id === 'metaMaskSDK');
      if (!metaMaskConnector) {
        alert('MetaMask not found!');
        return;
      }

      const { accounts, chainId } = await connectAsync({ connector: metaMaskConnector });
      const address = accounts[0];

      // 1️⃣ Get challenge
      const { data: challenge } = await axios.post('http://localhost:8000/auth/request-challenge/', {
        address,
        chain: String(chainId),
        network: 'evm',
      });

      // 2️⃣ Sign message
      const signature = await signMessageAsync({ message: challenge.message });

      // 3️⃣ Verify and get token
      const { data: verifyData } = await axios.post('http://localhost:8000/auth/verify/', {
        address,
        message: challenge.message,
        signature,
      });

      // 4️⃣ Save and update context
      localStorage.setItem('token', verifyData.token);
      const payload = parseJwt(verifyData.token);
      setUser({ address: payload.sub, role: payload.role });

      alert(`✅ Logged in as ${payload.role}`);
    } catch (err) {
      console.error('Login failed:', err);
      alert('❌ Login failed. Please try again.');
    }
  };

  // 🔹 Logout
  const logout = async () => {
    await disconnectAsync();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
