'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { tv } from 'tailwind-variants';
import { onPreloaderComplete } from '@/utils/preloader';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';
import { MaskShader } from './MaskShader';

const MOBILE_IMAGE_ASPECT = 1826 / 3247;
const DESKTOP_IMAGE_ASPECT = 1920 / 1080;
const MAX_TILT = Math.PI / 60;

const maskScene = tv({
  slots: { root: 'pointer-events-none absolute h-screen w-screen select-none' },
});

const { root } = maskScene();

const SceneContent = ({ isMobile, prefersReducedMotion }: { isMobile: boolean; prefersReducedMotion: boolean }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const mousePosRef = React.useRef({ x: 0.5, y: 0.5 });
  const entranceScaleRef = React.useRef({ value: prefersReducedMotion ? 1 : 1.2 });
  const { viewport, size } = useThree();

  const mouseXTo = React.useRef<((value: number) => void) | null>(null);
  const mouseYTo = React.useRef<((value: number) => void) | null>(null);
  const entranceScaleTo = React.useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    mouseXTo.current = gsap.quickTo(mousePosRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    mouseYTo.current = gsap.quickTo(mousePosRef.current, 'y', { duration: 1.4, ease: 'power2.out' });
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = onPreloaderComplete(() => {
      entranceScaleTo.current = gsap.to(entranceScaleRef.current, {
        value: 1.0,
        duration: 2,
        ease: 'power2.inOut',
      });
    });

    return () => {
      unsubscribe();
      entranceScaleTo.current?.kill();
    };
  }, [prefersReducedMotion]);

  const blurTexture = useTexture(isMobile ? '/me/me-mobile.webp' : '/me/me-blur.webp');
  const clearTexture = useTexture(isMobile ? '/me/me-mobile.webp' : '/me/me.webp');

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
  const imageAspect = isMobile ? MOBILE_IMAGE_ASPECT : DESKTOP_IMAGE_ASPECT;
  const baseHeight = 1.0 / imageAspect;

  useFrame(() => {
    if (!meshRef.current) return;

    const { x: currentX, y: currentY } = mousePosRef.current;

    if (materialRef.current) {
      materialRef.current.uniforms.uMousePos?.value.set(currentX, currentY);
      if (materialRef.current.uniforms.uViewportAspect) {
        materialRef.current.uniforms.uViewportAspect.value = viewportAspect;
      }
    }

    const tiltX = prefersReducedMotion ? 0 : -(currentY - 0.5) * 2 * MAX_TILT;
    const tiltY = prefersReducedMotion ? 0 : (currentX - 0.5) * 2 * MAX_TILT;

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

export const MaskScene = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={root()} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        id="mask-effect"
      >
        <SceneContent isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
};
