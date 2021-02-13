import { render, screen } from '@testing-library/react';
import React from 'react';
import { LeftActions, RightActions } from './actions';

describe('LeftActions', () => {
  describe('checkbox', () => {
    test('should display an unchecked checkbox by default', () => {
      render(<LeftActions id={1} onDone={() => {}} />);
      
      const checkbox = screen.getByTestId('task-done');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    test('should check the checkbox when clicked', () => {
      render(<LeftActions id={1} onDone={() => {}} />);
      
      const checkbox = screen.getByTestId('task-done');

      checkbox.click();

      expect(checkbox).toBeChecked();
    });

  })
});

describe('RightActions', () => {
  describe('button', () => {
    test('should display remove button by default', () => {
      render(<RightActions id={1} onRemove={() => {}} />);

      const button = screen.getByTestId('task-remove');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });
});
