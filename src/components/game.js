import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sword,
  Sparkles,
  PocketKnife,
  Download,
  Shield,
  FlaskRound,
} from "lucide-react";

const FantasyCharacterViewer = () => {
  const [selectedWeapon, setSelectedWeapon] = useState(0);
  const [selectedPotion, setSelectedPotion] = useState(0);
  const characterRef = useRef(null);

  const weapons = [
    {
      name: "Broadsword",
      color: "#C0C0C0",
      glow: "#3673F5",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="45"
            y="20"
            width="10"
            height="50"
            fill={selected ? "#3673F5" : "#C0C0C0"}
          />
          <rect
            x="35"
            y="15"
            width="30"
            height="8"
            fill={selected ? "#3673F5" : "#8B4513"}
          />
          <rect x="40" y="70" width="20" height="10" fill="#8B4513" />
        </svg>
      ),
    },
    {
      name: "Katana",
      color: "#4A90E2",
      glow: "#3673F5",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M45 20 Q43 45 43 80 Q47 80 47 20"
            fill={selected ? "#3673F5" : "#4A90E2"}
          />
          <rect x="43" y="15" width="6" height="12" fill="#000" />
          <rect x="41" y="12" width="10" height="4" fill="#C0C0C0" />
        </svg>
      ),
    },
    {
      name: "Magic Staff",
      color: "#3673F5",
      glow: "#3673F5",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="45" y="30" width="10" height="60" fill="#8B4513" />
          <circle
            cx="50"
            cy="25"
            r="15"
            fill={selected ? "#3673F5" : "#4A90E2"}
          >
            {selected && (
              <animate
                attributeName="r"
                values="15;17;15"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </svg>
      ),
    },
  ];

  const potions = [
    {
      name: "Health",
      color: "#FF6B6B",
      glow: "#FF0000",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M35 40 L35 70 Q35 80 50 80 Q65 80 65 70 L65 40 L55 40 L55 30 L45 30 L45 40 Z"
            fill={selected ? "#FF0000" : "#FF6B6B"}
          />
          <rect x="45" y="25" width="10" height="5" fill="#C0C0C0" />
          {selected && (
            <circle cx="50" cy="55" r="10" fill="#FF0000" opacity="0.5">
              <animate
                attributeName="r"
                values="10;12;10"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      ),
    },
    {
      name: "Mana",
      color: "#3673F5",
      glow: "#3673F5",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M35 40 L35 70 Q35 80 50 80 Q65 80 65 70 L65 40 L55 40 L55 30 L45 30 L45 40 Z"
            fill={selected ? "#3673F5" : "#4A90E2"}
          />
          <rect x="45" y="25" width="10" height="5" fill="#C0C0C0" />
          {selected && (
            <circle cx="50" cy="55" r="10" fill="#3673F5" opacity="0.5">
              <animate
                attributeName="r"
                values="10;12;10"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      ),
    },
    {
      name: "Stamina",
      color: "#2ECC71",
      glow: "#00FF00",
      icon: (selected) => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M35 40 L35 70 Q35 80 50 80 Q65 80 65 70 L65 40 L55 40 L55 30 L45 30 L45 40 Z"
            fill={selected ? "#00FF00" : "#2ECC71"}
          />
          <rect x="45" y="25" width="10" height="5" fill="#C0C0C0" />
          {selected && (
            <circle cx="50" cy="55" r="10" fill="#00FF00" opacity="0.5">
              <animate
                attributeName="r"
                values="10;12;10"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      ),
    },
  ];

  const generateImage = async () => {
    try {
      // Create a temporary canvas
      const canvas = document.createElement("canvas");
      canvas.width = 800; // Larger size for better quality
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");

      // Set background
      ctx.fillStyle = "rgb(88, 28, 135)"; // purple-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get the SVG element
      const svgElement = characterRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create temporary image to draw SVG
      const img = new Image();
      img.src = svgUrl;

      // Wait for image to load
      await new Promise((resolve) => {
        img.onload = () => {
          // Draw character
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Add metadata text
          ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
          ctx.fillRect(20, canvas.height - 120, canvas.width - 40, 100);

          ctx.font = "bold 36px sans-serif";
          ctx.fillStyle = "white";
          ctx.fillText("Character Attributes:", 40, canvas.height - 80);

          ctx.font = "24px sans-serif";
          ctx.fillText(
            `Weapon: ${weapons[selectedWeapon].name}`,
            40,
            canvas.height - 45
          );
          ctx.fillText(
            `Potion: ${potions[selectedPotion].name}`,
            40,
            canvas.height - 15
          );

          // Create download link
          const downloadUrl = canvas.toDataURL("image/jpeg", 0.9);
          const link = document.createElement("a");
          link.download = "fantasy-character.jpg";
          link.href = downloadUrl;
          link.click();

          // Cleanup
          URL.revokeObjectURL(svgUrl);
          resolve();
        };
      });
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image. Please try again.");
    }
  };

  const CharacterSVG = () => (
    <svg viewBox="0 0 400 500" className="w-full h-full">
      {/* Definitions for filters and gradients */}
      <defs>
        {/* Weapon glow filter */}
        <filter id="weaponGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Potion aura */}
        <radialGradient id="potionAura" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={potions[selectedPotion].color}
            stopOpacity="0.3"
          />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Background aura */}
      <circle cx="200" cy="250" r="150" fill="url(#potionAura)">
        <animate
          attributeName="r"
          values="150;160;150"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Character */}
      <g transform="translate(200, 250)">
        {/* Armor/Body */}
        <path
          d="M-40 -60 
             L40 -60 
             L50 40 
             L-50 40 
             Z"
          fill="#4a4a4a"
          stroke="#666"
          strokeWidth="2"
        />

        {/* Chainmail texture */}
        <path
          d="M-35 -55 
             L35 -55 
             L45 35 
             L-45 35 
             Z"
          fill="#595959"
          stroke="#777"
          strokeWidth="1"
          strokeDasharray="2,2"
        />

        {/* Head with Helmet */}
        <g transform="translate(0, -80)">
          {/* Base helmet */}
          <path
            d="M-30 -20 
               Q-30 -40 0 -40 
               Q30 -40 30 -20
               L25 10
               L-25 10
               Z"
            fill="#595959"
            stroke="#666"
            strokeWidth="2"
          />
          {/* Helmet details */}
          <path
            d="M-20 -30
               Q0 -45 20 -30"
            fill="none"
            stroke="#777"
            strokeWidth="3"
          />
          {/* Face guard */}
          <path
            d="M-15 -20
               L-10 0
               L10 0
               L15 -20"
            fill="#4a4a4a"
            stroke="#666"
            strokeWidth="1"
          />
        </g>

        {/* Arms */}
        <g>
          {/* Left arm */}
          <path
            d="M-40 -50
               L-60 20
               L-45 20
               L-30 -45"
            fill="#595959"
            stroke="#666"
            strokeWidth="2"
          />
          {/* Right arm - weapon arm */}
          <path
            d="M40 -50
               L75 0
               L60 0
               L30 -45"
            fill="#595959"
            stroke="#666"
            strokeWidth="2"
          />
        </g>

        {/* Selected Weapon */}
        <g transform="translate(70, 0) rotate(45)">
          {weapons[selectedWeapon].name === "Broadsword" && (
            <>
              {/* Broadsword */}
              <rect
                x="-8"
                y="-60"
                width="16"
                height="120"
                fill={weapons[selectedWeapon].color}
                stroke="#888"
                strokeWidth="1"
                filter="url(#weaponGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              {/* Sword handle */}
              <rect x="-12" y="-70" width="24" height="20" fill="#8B4513" />
              <rect x="-25" y="-75" width="50" height="10" fill="#C0C0C0" />
            </>
          )}
          {weapons[selectedWeapon].name === "Katana" && (
            <>
              {/* Katana */}
              <path
                d="M0 -80 
                   Q-2 -40 -2 60
                   Q2 60 2 -80"
                fill={weapons[selectedWeapon].color}
                stroke="#888"
                strokeWidth="1"
                filter="url(#weaponGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Katana handle */}
              <rect x="-4" y="-95" width="8" height="25" fill="#000" />
              <rect x="-8" y="-100" width="16" height="8" fill="#C0C0C0" />
            </>
          )}
          {weapons[selectedWeapon].name === "Magic Staff" && (
            <>
              {/* Staff */}
              <rect
                x="-6"
                y="-100"
                width="12"
                height="160"
                fill="#8B4513"
                stroke="#666"
                strokeWidth="1"
              />
              {/* Orb */}
              <circle
                cx="0"
                cy="-110"
                r="20"
                fill={weapons[selectedWeapon].color}
                filter="url(#weaponGlow)"
              >
                <animate
                  attributeName="r"
                  values="20;22;20"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </g>

        {/* Potion Effect Orb */}
        <circle
          cx="-60"
          cy="0"
          r="15"
          fill={potions[selectedPotion].color}
          filter="url(#weaponGlow)"
        >
          <animate
            attributeName="r"
            values="15;17;15"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.6;0.8"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Fantasy Character Creator
          </h1>
          <p className="text-gray-400">
            Customize your character&apos;s weapons and potions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Preview */}
          <Card className="bg-gray-800 border-0 shadow-xl overflow-hidden">
            <div className="p-6">
              <div
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-900"
                ref={characterRef}
              >
                <CharacterSVG />
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Shield className="text-blue-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Current Loadout</p>
                      <p className="text-white">
                        {weapons[selectedWeapon].name} +{" "}
                        {potions[selectedPotion].name} Potion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card className="bg-gray-800 border-0 shadow-xl">
            <div className="p-6 space-y-8">
              {/* Weapons */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sword className="w-5 h-5 mr-2 text-blue-400" />
                  Choose Your Weapon
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {weapons.map((weapon, index) => (
                    <button
                      key={weapon.name}
                      onClick={() => setSelectedWeapon(index)}
                      className={`p-4 rounded-lg transition-all duration-300 ${
                        selectedWeapon === index
                          ? "bg-blue-600 ring-2 ring-blue-400"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <div className="h-16 mb-2">
                        {weapon.icon(selectedWeapon === index)}
                      </div>
                      <p className="text-white text-sm font-medium">
                        {weapon.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Potions */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FlaskRound className="w-5 h-5 mr-2 text-blue-400" />
                  Select Your Potion
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {potions.map((potion, index) => (
                    <button
                      key={potion.name}
                      onClick={() => setSelectedPotion(index)}
                      className={`p-4 rounded-lg transition-all duration-300 ${
                        selectedPotion === index
                          ? "bg-blue-600 ring-2 ring-blue-400"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <div className="h-16 mb-2">
                        {potion.icon(selectedPotion === index)}
                      </div>
                      <p className="text-white text-sm font-medium">
                        {potion.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateImage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg shadow-lg 
                         transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Mint Character</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FantasyCharacterViewer;
