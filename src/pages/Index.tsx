
import React, { useState, useEffect } from 'react';
import GeometricBackground from '@/components/GeometricBackground';
import GeometricBackgroundBlue from '@/components/GeometricBackgroundBlue';
import GeometricBackgroundGreen from '@/components/GeometricBackgroundGreen';
import GeometricBackgroundOrange from '@/components/GeometricBackgroundOrange';
import LoginForm from '@/components/LoginForm';
import LoginFormBlue from '@/components/LoginFormBlue';
import LoginFormGreen from '@/components/LoginFormGreen';
import LoginFormOrange from '@/components/LoginFormOrange';
import ColorSwitcher from '@/components/ColorSwitcher';

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState('blue');

  // Carregar tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('vetprime-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Salvar tema no localStorage
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('vetprime-theme', theme);
  };

  const getBackgroundComponent = () => {
    switch (currentTheme) {
      case 'purple': return <GeometricBackground />;
      case 'green': return <GeometricBackgroundGreen />;
      case 'orange': return <GeometricBackgroundOrange />;
      default: return <GeometricBackgroundBlue />;
    }
  };

  const getFormComponent = () => {
    switch (currentTheme) {
      case 'purple': return <LoginForm />;
      case 'green': return <LoginFormGreen />;
      case 'orange': return <LoginFormOrange />;
      default: return <LoginFormBlue />;
    }
  };

  const getGradientText = () => {
    switch (currentTheme) {
      case 'purple': return 'from-white to-purple-200';
      case 'green': return 'from-white to-green-200';
      case 'orange': return 'from-white to-orange-200';
      default: return 'from-white to-blue-200';
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {getBackgroundComponent()}
      
      <ColorSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="hidden lg:block text-white space-y-6 animate-slide-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Bem-vindo ao
              <span className={`block bg-gradient-to-r ${getGradientText()} bg-clip-text text-transparent`}>
                VetPrime
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
              Sistema completo de gestão veterinária. 
              Cuide melhor dos seus pacientes com tecnologia moderna.
            </p>
            <div className="flex space-x-4">
              <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            {getFormComponent()}
          </div>
        </div>
      </div>
      
      <div className="absolute top-10 right-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Index;
