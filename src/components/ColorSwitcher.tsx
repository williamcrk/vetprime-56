
import React from 'react';
import { Button } from '@/components/ui/button';

interface ColorSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ColorSwitcher = ({ currentTheme, onThemeChange }: ColorSwitcherProps) => {
  const themes = [
    { value: 'blue', colors: 'from-blue-500 to-teal-500' },
    { value: 'purple', colors: 'from-purple-500 to-pink-500' },
    { value: 'green', colors: 'from-emerald-500 to-green-500' },
    { value: 'orange', colors: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-lg rounded-2xl p-3 border border-white/30">
      <div className="flex gap-2">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.colors} border-2 transition-all duration-200 ${
              currentTheme === theme.value 
                ? 'border-white scale-110 shadow-lg' 
                : 'border-white/50 hover:scale-105'
            }`}
            title={`Tema ${theme.value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSwitcher;
