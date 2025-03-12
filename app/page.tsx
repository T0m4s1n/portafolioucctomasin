"use client";

import React from 'react';
import { Hammer, Code } from 'lucide-react';

const PortfolioHeader = () => {
    return (
        <div className="min-h-screen bg-white font-['Poppins'] p-8 flex justify-center items-center overflow-hidden">
            <div className="relative max-w-2xl w-full mx-auto">
                <div className="relative z-10 text-center p-12">
                    <div className="mb-10">
                      <h1 
                        className="text-6xl font-bold text-wine-800"
                        style={{ 
                          textShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        Tomasin Benavides Calderon
                      </h1>
                      <div 
                        className="h-1 w-32 mx-auto mt-4 bg-wine-700 rounded-full shadow-md"
                      />
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mb-8 relative">
                            <div className="mr-6 text-wine-700">
                                <Hammer size={48} />
                            </div>
                            
                            <div className="ml-6 text-wine-700">
                                <Code size={48} />
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <span 
                                className="font-bold text-3xl block text-wine-700"
                                style={{ 
                                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                TRABAJANDO...
                            </span>
                            
                            <span 
                                className="font-medium text-2xl text-wine-800 block mt-3"
                            >
                                PORTAFOLIO
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
            `}</style>
        </div>
    );
};

export default PortfolioHeader;