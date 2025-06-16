'use client';

import { useState } from "react";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    setStepCount(prev => prev + 1);
    setShowSteps(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-8">
      <main className="text-center max-w-2xl mx-auto">
        {/* Mountain Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
              <path
                d="M20 80 L50 20 L80 80 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 80 L50 50 L65 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to
        </h1>
        <h2 className="text-5xl font-bold text-blue-600 mb-6">
          Code Everest
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Let AI Be Your Sherpa
        </p>

        {/* Setup Complete Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Setup Complete!
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            🎉 Congratulations! Your React development environment is working perfectly.
          </p>

          {/* Workshop Info */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-800 dark:text-green-200 font-medium">
              Workshop:
            </p>
            <p className="text-green-700 dark:text-green-300">
              "Conquering Code Everest: Let AI Be Your Sherpa"
            </p>
          </div>

          {/* Step Counter */}
          {showSteps && (
            <div className="mb-4 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-lg">
                  Step {stepCount} on your journey
                </span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {/* Animated footsteps */}
              <div className="flex justify-center mt-2 gap-1">
                {Array.from({ length: Math.min(stepCount, 10) }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 bg-blue-400 rounded-full transition-all duration-300 ${
                      i < stepCount ? 'animate-bounce' : ''
                    }`}
                    style={{
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
                {stepCount > 10 && (
                  <span className="text-blue-600 text-sm ml-2">
                    +{stepCount - 10} more steps!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Animated Button */}
          <button
            onClick={handleButtonClick}
            className={`
              bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full
              transition-all duration-300 transform hover:scale-105 active:scale-95
              flex items-center justify-center mx-auto gap-2 min-w-[200px]
              ${isAnimating ? 'animate-pulse scale-110' : ''}
            `}
            disabled={isAnimating}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isAnimating ? 'rotate-12' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isAnimating ? 'Launching...' : stepCount === 0 ? 'Begin the Journey' : 'Take Another Step'}
          </button>
        </div>

        {/* Ready to Climb */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ready to climb? Your AI sherpa is waiting! 🏔️
        </p>
      </main>

      {/* Tech Stack Footer */}
      <footer className="mt-auto pt-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span>React</span>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>Next.js</span>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>TypeScript</span>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>Tailwind CSS</span>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}
