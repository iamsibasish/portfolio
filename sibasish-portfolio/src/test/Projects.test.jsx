import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from '../components/Projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

// Mock LazyImage component
vi.mock('../components/LazyImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  ),
}));

// Mock projects data
vi.mock('../data', () => ({
  projects: [
    {
      id: '1',
      title: 'Project 1',
      period: '2023',
      blurb: 'First project description',
      tags: ['React', 'JavaScript'],
      image: '/p1.svg',
      category: 'Web Development'
    },
    {
      id: '2',
      title: 'Project 2',
      period: '2023',
      blurb: 'Second project description',
      tags: ['Node.js', 'API'],
      image: '/p2.svg',
      category: 'Backend'
    },
    {
      id: '3',
      title: 'Project 3',
      period: '2022',
      blurb: 'Third project description',
      tags: ['Python', 'ML'],
      image: '/p3.svg',
      category: 'Machine Learning'
    },
    {
      id: '4',
      title: 'Project 4',
      period: '2022',
      blurb: 'Fourth project description',
      tags: ['Kafka', 'Streaming'],
      image: '/p4.svg',
      category: 'Data Engineering'
    },
    {
      id: '5',
      title: 'Project 5',
      period: '2021',
      blurb: 'Fifth project description',
      tags: ['Docker', 'DevOps'],
      image: '/p5.svg',
      category: 'Infrastructure'
    }
  ]
}));

describe('Projects Component', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render search input and projects', () => {
    render(<Projects />);
    
    expect(screen.getByPlaceholderText(/Search projects/)).toBeInTheDocument();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  it('should filter projects based on search query', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    
    await user.type(searchInput, 'React');
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
  });

  it('should show navigation controls when more than 3 projects', () => {
    render(<Projects />);
    
    expect(screen.getByLabelText('View previous 3 projects')).toBeInTheDocument();
    expect(screen.getByLabelText('View next 3 projects')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2); // 5 projects = 2 pages
  });

  it('should navigate to next projects when next button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    const nextButton = screen.getByLabelText('View next 3 projects');
    
    await user.click(nextButton);
    
    // Should show projects 4 and 5 (and wrap around to 1)
    expect(screen.getByText('Project 4')).toBeInTheDocument();
    expect(screen.getByText('Project 5')).toBeInTheDocument();
  });

  it('should navigate to previous projects when previous button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    // First go to next page
    const nextButton = screen.getByLabelText('View next 3 projects');
    await user.click(nextButton);
    
    // Then go back to previous
    const prevButton = screen.getByLabelText('View previous 3 projects');
    await user.click(prevButton);
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    render(<Projects />);
    
    const carouselWrapper = screen.getByRole('region', { name: 'Project showcase' });
    carouselWrapper.focus();
    
    // Test arrow key navigation
    fireEvent.keyDown(carouselWrapper, { key: 'ArrowRight' });
    
    await waitFor(() => {
      expect(screen.getByText('Project 4')).toBeInTheDocument();
    });
    
    fireEvent.keyDown(carouselWrapper, { key: 'ArrowLeft' });
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });
  });

  it('should handle touch swipe gestures', () => {
    render(<Projects />);
    
    const carouselWrapper = screen.getByRole('region', { name: 'Project showcase' });
    
    // Simulate left swipe (should go to next)
    fireEvent.touchStart(carouselWrapper, {
      targetTouches: [{ clientX: 100 }]
    });
    
    fireEvent.touchMove(carouselWrapper, {
      targetTouches: [{ clientX: 40 }]
    });
    
    fireEvent.touchEnd(carouselWrapper);
    
    expect(screen.getByText('Project 4')).toBeInTheDocument();
  });

  it('should auto-play carousel when more than 3 projects', () => {
    render(<Projects />);
    
    // Initially showing projects 1, 2, 3
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    
    // Fast-forward 5 seconds (auto-play interval)
    vi.advanceTimersByTime(5000);
    
    // Should now show projects 4, 5, 1
    expect(screen.getByText('Project 4')).toBeInTheDocument();
  });

  it('should pause auto-play on mouse enter and resume on mouse leave', () => {
    render(<Projects />);
    
    const carouselWrapper = screen.getByRole('region', { name: 'Project showcase' });
    
    // Mouse enter should pause auto-play
    fireEvent.mouseEnter(carouselWrapper);
    
    vi.advanceTimersByTime(5000);
    
    // Should still show initial projects (auto-play paused)
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    
    // Mouse leave should resume auto-play
    fireEvent.mouseLeave(carouselWrapper);
    
    vi.advanceTimersByTime(5000);
    
    // Should now advance (auto-play resumed)
    expect(screen.getByText('Project 4')).toBeInTheDocument();
  });

  it('should navigate using dot indicators', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    const dots = screen.getAllByRole('tab');
    
    // Click second dot (page 2)
    await user.click(dots[1]);
    
    expect(screen.getByText('Project 4')).toBeInTheDocument();
    expect(screen.getByText('Project 5')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<Projects />);
    
    // Check ARIA labels and roles
    expect(screen.getByRole('region', { name: 'Project showcase' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /Showing \d+ of \d+ projects/ })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3); // First 3 projects
    expect(screen.getByRole('tablist', { name: 'Project pages' })).toBeInTheDocument();
    
    // Check search accessibility
    expect(screen.getByLabelText('Search projects by technology or keyword')).toBeInTheDocument();
    expect(screen.getByText(/Search through \d+ projects/)).toBeInTheDocument();
  });

  it('should display project images with proper alt text', () => {
    render(<Projects />);
    
    const images = screen.getAllByTestId('lazy-image');
    
    expect(images[0]).toHaveAttribute('alt', 'Project 1 project screenshot showing web development implementation');
    expect(images[1]).toHaveAttribute('alt', 'Project 2 project screenshot showing backend implementation');
  });

  it('should handle empty search results gracefully', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    
    await user.type(searchInput, 'nonexistent');
    
    // Should show no projects
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
  });

  it('should stop auto-play when user interacts with navigation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Projects />);
    
    const nextButton = screen.getByLabelText('View next 3 projects');
    
    // Click next button (should stop auto-play)
    await user.click(nextButton);
    
    // Fast-forward time - should not auto-advance since user interacted
    vi.advanceTimersByTime(10000);
    
    // Should still be on the page user navigated to
    expect(screen.getByText('Project 4')).toBeInTheDocument();
  });
});