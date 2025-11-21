'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { MaskShader } from './MaskShader';

interface SceneContentProps {
  isMobile: boolean;
}

const SceneContent: React.FC<SceneContentProps> = ({ isMobile }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const mousePosRef = React.useRef({ x: 0.5, y: 0.5 });
  const entranceScaleRef = React.useRef({ value: 1.2 }); // Start scaled up for entrance animation
  const { viewport, size } = useThree();

  // GSAP animations
  const mouseXTo = React.useRef<((value: number) => void) | null>(null);
  const mouseYTo = React.useRef<((value: number) => void) | null>(null);
  const entranceScaleTo = React.useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    mouseXTo.current = gsap.quickTo(mousePosRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    mouseYTo.current = gsap.quickTo(mousePosRef.current, 'y', { duration: 1.4, ease: 'power2.out' });
  }, []);

  React.useEffect(() => {
    const handlePreloaderComplete = () => {
      entranceScaleTo.current = gsap.to(entranceScaleRef.current, {
        value: 1.0,
        duration: 2,
        ease: 'power2.inOut',
      });
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
      entranceScaleTo.current?.kill();
    };
  }, []);

  // Load textures based on device type
  const blurTexture = useTexture(isMobile ? '/me/me-mobile.jpg' : '/me/me-blur.jpg');
  const clearTexture = useTexture(isMobile ? '/me/me-mobile.jpg' : '/me/me.jpg');

  React.useEffect(() => {
    [blurTexture, clearTexture].forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
    });
  }, [blurTexture, clearTexture]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXTo.current?.(e.clientX / window.innerWidth);
      mouseYTo.current?.(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const viewportAspect = size.width / size.height;
  const imageAspect = isMobile ? 1826 / 3247 : 1920 / 1080;
  const baseHeight = 1.0 / imageAspect;

  useFrame(() => {
    if (!meshRef.current) return;

    const { x: currentX, y: currentY } = mousePosRef.current;

    if (materialRef.current) {
      materialRef.current.uniforms.uMousePos.value.set(currentX, currentY);
      materialRef.current.uniforms.uViewportAspect.value = viewportAspect;
    }

    const maxTilt = Math.PI / 60;
    const tiltX = -(currentY - 0.5) * 2 * maxTilt;
    const tiltY = (currentX - 0.5) * 2 * maxTilt;

    const tiltCompensation = Math.max(1.0 / Math.cos(Math.abs(tiltX)), 1.0 / Math.cos(Math.abs(tiltY))) * 1.15;
    const baseScale = Math.max(viewport.width, viewport.height / baseHeight);
    const scale = baseScale * tiltCompensation * entranceScaleRef.current.value;

    meshRef.current.scale.set(scale, scale, 1);
    meshRef.current.rotation.set(tiltX, tiltY, 0);
  });

  return (
    <mesh ref={meshRef}>
      {/* eslint-disable react/no-unknown-property */}
      <planeGeometry args={[1.0, baseHeight]} />
      <MaskShader
        blurTexture={blurTexture}
        clearTexture={clearTexture}
        viewportAspect={viewportAspect}
        materialRef={materialRef}
      />
      {/* eslint-enable react/no-unknown-property */}
    </mesh>
  );
};

export const MaskEffect = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="user-select-none pointer-events-none absolute h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        id="mask-effect"
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
