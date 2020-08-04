import React from 'react';
import styled from '@emotion/styled';

// App wrapper for styling

// defining the children that will live inside the AppWrapper. They have to be defined as children: React.ReactNode;
interface AppWrapperProps {
  children: React.ReactNode;
}

// Using fairly sparse styling
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 5px;
`;

function AppWrapper({ children }: AppWrapperProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default AppWrapper;
