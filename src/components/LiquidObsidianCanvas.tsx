import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { harmonicAudio } from '../utils/harmonicAudio';
import { Sparkles, Maximize2 } from 'lucide-react';

interface LiquidObsidianCanvasProps {
  onStrikeSeed?: (x: number, y: number) => void;
  activeMode: 'KŌRERO' | 'WHAKAARO' | 'TIKI';
  isGenerating?: boolean;
  onOpenMasterVisual?: () => void;
}

export const LiquidObsidianCanvas: React.FC<LiquidObsidianCanvasProps> = ({
  onStrikeSeed,
  activeMode,
  isGenerating = false,
  onOpenMasterVisual,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracted, setIsInteracted] = useState(false);
  const ripplesRef = useRef<Array<{ x: number; y: number; r: number; alpha: number; speed: number }>>([]);

  // Trigger ripple from external seed drops
  const addRipple = useCallback((normX = 0.5, normY = 0.7) => {
    if (!rippleCanvasRef.current) return;
    const width = rippleCanvasRef.current.width;
    const height = rippleCanvasRef.current.height;
    ripplesRef.current.push({
      x: normX * width,
      y: normY * height,
      r: 4,
      alpha: 1.0,
      speed: 3.2,
    });
    harmonicAudio.playSeedStrike();
  }, []);

  // Expose ripple trigger for parent or clicks
  useEffect(() => {
    if (isGenerating) {
      // Continuous meditative pulses while generating
      const interval = setInterval(() => {
        addRipple(0.5 + (Math.random() - 0.5) * 0.1, 0.65 + (Math.random() - 0.5) * 0.08);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isGenerating, addRipple]);

  // Setup 2D Ripple Physics on the Liquid Obsidian Floor
  useEffect(() => {
    const canvas = rippleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const renderRipples = () => {
      // Clear with soft trails for liquid obsidian viscosity
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.r += rip.speed;
        rip.alpha -= 0.008;

        if (rip.alpha <= 0 || rip.r > Math.max(canvas.width, canvas.height) * 0.85) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Outer golden specular ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 160, 90, ${rip.alpha * 0.75})`;
        ctx.lineWidth = Math.max(1, 2.5 * rip.alpha);
        ctx.stroke();

        // Inner glowing white razor rim
        if (rip.r > 8) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.88, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${rip.alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Secondary harmonic echo wave
        if (rip.r > 25) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r - 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 160, 90, ${rip.alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(renderRipples);
    };

    renderRipples();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Three.js 3D Dynamic Non-Euclidean Gold Wireframe & Void Silhouette Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Golden Wireframes Group
    const wireframeGroup = new THREE.Group();
    wireframeGroup.position.set(0, 1.2, 0);
    scene.add(wireframeGroup);

    // 1. Tetrahedron Wireframe (Structure)
    const tetraGeo = new THREE.TetrahedronGeometry(1.4, 0);
    const tetraMat = new THREE.MeshBasicMaterial({
      color: 0xd4a05a,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const tetraMesh = new THREE.Mesh(tetraGeo, tetraMat);
    wireframeGroup.add(tetraMesh);

    // 2. Sphere Wireframe (Wholeness)
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xd4a05a,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    wireframeGroup.add(sphereMesh);

    // 3. Outer Sacred Octahedron Wireframe
    const octaGeo = new THREE.OctahedronGeometry(1.7, 1);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    wireframeGroup.add(octaMesh);

    // 4. Central Void Silhouette Placeholder / Figure Anchor
    const bodyGroup = new THREE.Group();
    // Torso / Void Column
    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.32, 1.6, 16);
    const voidMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, voidMat);
    bodyMesh.position.y = 0;
    bodyGroup.add(bodyMesh);

    // Head / Crown Void
    const headGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, voidMat);
    headMesh.position.y = 1.05;
    bodyGroup.add(headMesh);

    // Razor-thin Glowing White Rim around the Void
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const rimHead = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), rimMat);
    rimHead.position.y = 1.05;
    bodyGroup.add(rimHead);

    bodyGroup.position.set(0, 0.7, 0);
    scene.add(bodyGroup);

    // Atmospheric Microscopic Golden Dust Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = Math.random() * 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleSpeeds[i] = 0.003 + Math.random() * 0.006;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4a05a,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Subtle Obsidian Reflection Floor in 3D
    const floorGeo = new THREE.PlaneGeometry(12, 12, 16, 16);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.05;
    scene.add(floorMesh);

    // Subtle Wireframe Reflection Under Floor (Mirror)
    const reflectionWireframe = wireframeGroup.clone();
    reflectionWireframe.position.y = -1.2;
    reflectionWireframe.scale.y = -0.75;
    scene.add(reflectionWireframe);

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = y * 0.15;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth non-Euclidean wireframe rotation
      wireframeGroup.rotation.y = elapsedTime * 0.28 + targetRotY;
      wireframeGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.18 + targetRotX;
      wireframeGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      // Morphing scale between sphere (wholeness) and tetrahedron (structure)
      const morphFactor = (Math.sin(elapsedTime * 0.6) + 1) / 2;
      tetraMesh.scale.setScalar(1.1 + (1 - morphFactor) * 0.35);
      sphereMesh.scale.setScalar(1.0 + morphFactor * 0.4);
      octaMesh.scale.setScalar(1.5 + Math.sin(elapsedTime * 0.3) * 0.15);

      // Synchronize reflection
      reflectionWireframe.rotation.y = wireframeGroup.rotation.y;
      reflectionWireframe.rotation.x = -wireframeGroup.rotation.x;
      reflectionWireframe.scale.set(
        wireframeGroup.scale.x,
        -wireframeGroup.scale.y * 0.65,
        wireframeGroup.scale.z
      );

      // Subtle levitation of the void entity above the obsidian
      bodyGroup.position.y = 0.7 + Math.sin(elapsedTime * 0.8) * 0.06;
      wireframeGroup.position.y = 1.2 + Math.sin(elapsedTime * 0.8) * 0.06;

      // Floating dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 3.8) {
          positions[i * 3 + 1] = 0.05;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  // Handle user striking the water on the canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsInteracted(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;
    addRipple(normX, normY);
    if (onStrikeSeed) {
      onStrikeSeed(normX, normY);
    }
  };

  return (
    <div
      ref={containerRef}
      id="liquid-obsidian-stage"
      onClick={handleCanvasClick}
      className="relative w-full h-full min-h-[380px] lg:min-h-[500px] overflow-hidden bg-black select-none cursor-pointer group"
    >
      {/* 2D Liquid Obsidian Viscous Ripple Layer */}
      <canvas
        ref={rippleCanvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* 3D Three.js Non-Euclidean Wireframe & Void Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* Central IO Chest Typography Glow */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="relative">
          {/* Razor-thin Glowing White Outline with Matte-Black Depth */}
          <span
            className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black tracking-[0.25em] text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
            style={{
              WebkitTextStroke: '1.2px #ffffff',
              filter: 'drop-shadow(0 0 16px rgba(212,160,90,0.6))',
            }}
          >
            IO
          </span>
          {/* Subtle Golden Sub-Glow */}
          <div className="absolute inset-0 -z-10 bg-[#d4a05a]/20 blur-xl rounded-full scale-150 animate-pulse" />
        </div>
        <span className="text-[10px] tracking-[0.4em] uppercase font-mono-code text-[#d4a05a]/80 mt-1">
          Unmanifest Potential
        </span>
      </div>

      {/* Atmospheric Vignette & Liquid Horizon */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/60" />
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* State Constraint Badge & Frequency Status Overlay */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-[#d4a05a]/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#d4a05a] animate-ping" />
          <span className="font-mono-code text-xs text-[#d4a05a] tracking-wider font-semibold">
            617 · 777 · 679
          </span>
          <span className="text-[10px] text-zinc-400 border-l border-zinc-700 pl-2">
            Mauri Ora
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-zinc-800 text-[11px] text-zinc-300">
          <span className="text-[#d4a05a]">Te Kore</span>
          <span className="text-zinc-600">→</span>
          <span className="text-white">Te Ao Mārama</span>
        </div>
      </div>

      {/* Top Right Quick Actions: Master 85mm Visual & Ripple Prompt */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 pointer-events-auto">
        {onOpenMasterVisual && (
          <button
            id="view-master-render-button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMasterVisual();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141414]/90 hover:bg-[#1f1a14] border border-[#d4a05a]/40 hover:border-[#d4a05a] text-xs text-[#d4a05a] transition-colors shadow-lg"
            title="Inspect Master 85mm Prime Lens Render"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">85mm Master Render</span>
          </button>
        )}
      </div>

      {/* Bottom Interactive Prompt hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 border border-zinc-800/80 text-[11px] text-zinc-400">
          <Sparkles className="w-3 h-3 text-[#d4a05a]" />
          <span>Click obsidian to cast a seed & generate ripples</span>
        </div>
      </div>
    </div>
  );
};
