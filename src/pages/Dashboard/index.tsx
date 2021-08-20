import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, key } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={signOut}>
        <FiPower />
        Exit
      </button>
    </>
  );
};

export default Dashboard;
