import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useText } from '@/hooks/useText';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getText } = useText();

  const navItems = [
    { label: getText('navigation.menuItems.home'), href: '/' },
    { label: getText('navigation.menuItems.Eggs'), href: '/Eggs' },
    { label: getText('navigation.menuItems.squirrelCare'), href: '#squirrel-care' },
    { label: getText('navigation.menuItems.community'), href: '#community-info' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐿️</span>
            <span className="font-bold text-lg text-squirrel-brown">{getText('navigation.logo')}</span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-muted-foreground hover:text-squirrel-brown transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-squirrel-brown transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
            <ThemeToggle />
            <Button 
              className="btn-squirrel"
              onClick={() => window.open('https://discord.com/invite/UGUjdgD5Mb', '_blank')}
            >
              {getText('navigation.buttons.joinDiscord')}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left py-2 px-4 text-muted-foreground hover:text-squirrel-brown transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                className="btn-squirrel mx-4 mt-2"
                onClick={() => {
                  window.open('https://discord.com/invite/UGUjdgD5Mb', '_blank');
                  setIsOpen(false);
                }}
              >
                {getText('navigation.buttons.joinDiscord')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};