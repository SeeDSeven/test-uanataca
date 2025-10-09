// app/shared/components/CustomInput.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomInput from './CustomInput';

describe('CustomInput Component', () => {
  it('debe renderizar la etiqueta y el input correctamente', () => {
    // 1. Arrange (Organizar)
    render(<CustomInput label="Nombre de Usuario" name="username" />);

    // 2. Act & Assert (Actuar y Afirmar)
    // Buscamos el input a través de su etiqueta, que es la forma recomendada
    const inputElement = screen.getByLabelText(/nombre de usuario/i);

    // Verificamos que el input se encuentra en el documento
    expect(inputElement).toBeDefined();
  });

  it('debe mostrar un mensaje de error cuando se le pasa la prop "error"', () => {
    // Arrange
    const errorMessage = 'Campo requerido';
    render(<CustomInput label="Email" name="email" error={errorMessage} />);

    // Act & Assert
    // Buscamos el texto del error
    const errorElement = screen.getByText(errorMessage);

    // Verificamos que el error es visible
    expect(errorElement).toBeDefined();
  });
});