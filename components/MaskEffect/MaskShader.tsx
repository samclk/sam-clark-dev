'use client';

import * as React from 'react';
import { useMemo } from 'react';
import * as THREE from 'three';

interface MaskShaderProps {
  blurTexture: THREE.Texture;
  clearTexture: THREE.Texture;
  viewportAspect: number;
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
}

export const MaskShader: React.FC<MaskShaderProps> = ({ blurTexture, clearTexture, viewportAspect, materialRef }) => {
  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBlurTexture: { value: blurTexture },
        uClearTexture: { value: clearTexture },
        uMousePos: { value: new THREE.Vector2(0.5, 0.5) },
        uViewportAspect: { value: viewportAspect },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uBlurTexture;
        uniform sampler2D uClearTexture;
        uniform vec2 uMousePos;
        uniform float uViewportAspect;
        
        varying vec2 vUv;
        
        void main() {
          // Sample textures
          vec4 blurColor = texture2D(uBlurTexture, vUv);
          vec4 clearColor = texture2D(uClearTexture, vUv);
          
          // Calculate distance from mouse position for mask (convert to screen coordinates)
          vec2 screenUv = vec2(vUv.x, 1.0 - vUv.y);
          vec2 aspectUv = vec2(screenUv.x * uViewportAspect, screenUv.y);
          vec2 aspectMouse = vec2(uMousePos.x * uViewportAspect, uMousePos.y);
          float dist = distance(aspectUv, aspectMouse);
          
          // Radial gradient mask (0 = clear, 1 = blurred)
          float mask = smoothstep(0.1, 0.25, dist);
          
          gl_FragColor = mix(clearColor, blurColor, mask);
        }
      `,
      transparent: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blurTexture, clearTexture]);

  // Store material ref for parent to update uniforms
  React.useEffect(() => {
    materialRef.current = material;
  }, [material, materialRef]);

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={material} />;
};
