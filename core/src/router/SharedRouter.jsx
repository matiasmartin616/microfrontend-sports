import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function SharedRouter({ children }) {
  
  const isNested = React.useContext(Router); // Verifica si ya existe un Router en el árbol
  console.log(isNested)
  // Si ya hay un Router en el árbol, simplemente retorna los hijos
  if (isNested) {
    return <>{children}</>;
  }

  // Si no hay un Router, provee un BrowserRouter
  return <BrowserRouter>{children}</BrowserRouter>;
}
