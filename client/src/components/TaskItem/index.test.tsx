import React from 'react';
import {render, screen} from '@testing-library/react';
import {LeftActions} from './index'

describe('LeftActions', () => {
  describe('checkbox', () => {
    test('should display an unchecked checkbox by default', () => {
      render(<LeftActions id={1} onDone={() => {}} />)
      
      const checkbox = screen.getByTestId("task-done");
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    test('should check the checkbox when clicked', () => {
      render(<LeftActions id={1} onDone={() => {}} />)
      
      const checkbox = screen.getByTestId("task-done");

      checkbox.click()

      expect(checkbox).toBeChecked()
      screen.debug()
    })

  })
});

