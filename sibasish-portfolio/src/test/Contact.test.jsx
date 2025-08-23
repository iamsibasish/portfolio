import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/Contact';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

const mockContactInfo = {
  email: 'test@example.com',
  phone: '+1234567890',
  linkedin: 'https://linkedin.com/in/testuser',
  github: 'https://github.com/testuser'
};

describe('Contact Component', () => {
  it('should render contact section with proper heading', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText(/Ready to discuss opportunities/)).toBeInTheDocument();
  });

  it('should render all contact buttons with correct labels', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('should have correct href attributes for contact methods', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
    const phoneLink = screen.getByLabelText(`Call ${mockContactInfo.phone}`);
    const linkedinLink = screen.getByLabelText('View LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('View GitHub profile (opens in new tab)');
    
    expect(emailLink).toHaveAttribute('href', `mailto:${mockContactInfo.email}`);
    expect(phoneLink).toHaveAttribute('href', `tel:${mockContactInfo.phone}`);
    expect(linkedinLink).toHaveAttribute('href', mockContactInfo.linkedin);
    expect(githubLink).toHaveAttribute('href', mockContactInfo.github);
  });

  it('should have proper target and rel attributes for external links', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    const linkedinLink = screen.getByLabelText('View LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('View GitHub profile (opens in new tab)');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('should not have target="_blank" for email and phone links', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
    const phoneLink = screen.getByLabelText(`Call ${mockContactInfo.phone}`);
    
    expect(emailLink).not.toHaveAttribute('target');
    expect(phoneLink).not.toHaveAttribute('target');
  });

  it('should display icons for each contact method', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    // Check that icons are present (emojis in this case)
    expect(screen.getByText('📧')).toBeInTheDocument(); // Email
    expect(screen.getByText('💼')).toBeInTheDocument(); // LinkedIn
    expect(screen.getByText('🔗')).toBeInTheDocument(); // GitHub
    expect(screen.getByText('📞')).toBeInTheDocument(); // Phone
  });

  it('should show external link indicators for LinkedIn and GitHub', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    const externalIndicators = screen.getAllByText('↗');
    expect(externalIndicators).toHaveLength(2); // LinkedIn and GitHub
  });

  it('should have proper accessibility attributes', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    // Check ARIA labels
    expect(screen.getByLabelText(`Send email to ${mockContactInfo.email}`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Call ${mockContactInfo.phone}`)).toBeInTheDocument();
    expect(screen.getByLabelText('View LinkedIn profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('View GitHub profile (opens in new tab)')).toBeInTheDocument();
    
    // Check that icons are marked as decorative
    const icons = screen.getAllByText(/[📧💼🔗📞↗]/);
    icons.forEach(icon => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<Contact contactInfo={mockContactInfo} />);
    
    const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
    
    // Should be focusable
    await user.tab();
    expect(emailLink).toHaveFocus();
    
    // Should be activatable with Enter key
    await user.keyboard('{Enter}');
    // Note: We can't easily test the actual navigation in jsdom, 
    // but we can verify the link is properly structured
  });

  it('should handle missing contact information gracefully', () => {
    const incompleteContactInfo = {
      email: 'test@example.com',
      // Missing other fields
    };
    
    // Should not throw an error
    expect(() => {
      render(<Contact contactInfo={incompleteContactInfo} />);
    }).not.toThrow();
  });

  it('should have proper CSS classes for styling', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    expect(document.querySelector('.contact-section')).toBeInTheDocument();
    expect(document.querySelector('.contact-card')).toBeInTheDocument();
    expect(document.querySelector('.contact-buttons')).toBeInTheDocument();
    expect(document.querySelectorAll('.contact-btn')).toHaveLength(4);
  });

  it('should display contact buttons in correct order', () => {
    render(<Contact contactInfo={mockContactInfo} />);
    
    const buttons = screen.getAllByRole('link');
    const buttonTexts = buttons.map(button => button.textContent);
    
    expect(buttonTexts).toEqual(['Email', 'LinkedIn', 'GitHub', 'Phone']);
  });

  it('should handle special characters in contact information', () => {
    const specialContactInfo = {
      email: 'test+special@example.com',
      phone: '+1 (234) 567-8900',
      linkedin: 'https://linkedin.com/in/test-user-123',
      github: 'https://github.com/test_user'
    };
    
    render(<Contact contactInfo={specialContactInfo} />);
    
    const emailLink = screen.getByLabelText(`Send email to ${specialContactInfo.email}`);
    const phoneLink = screen.getByLabelText(`Call ${specialContactInfo.phone}`);
    
    expect(emailLink).toHaveAttribute('href', `mailto:${specialContactInfo.email}`);
    expect(phoneLink).toHaveAttribute('href', `tel:${specialContactInfo.phone}`);
  });
});