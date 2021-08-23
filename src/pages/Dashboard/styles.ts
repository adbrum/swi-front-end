import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 66%;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  color: #000;
`;
