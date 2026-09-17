'use client';

import * as React from 'react';
import * as THREE from 'three';

interface MaskShaderProps {
  blurTexture: THREE.Texture;
  clearTexture: THREE.Texture;
  viewportAspect: number;
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
}

export const MaskShader = ({ blurTexture, clearTexture, viewportAspect, materialRef }: MaskShaderProps) => {
  const material = React.useMemo(() => {
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
          vec4 blurColor = texture2D(uBlurTexture, vUv);
          vec4 clearColor = texture2D(uClearTexture, vUv);

          vec2 screenUv = vec2(vUv.x, 1.0 - vUv.y);
          vec2 aspectUv = vec2(screenUv.x * uViewportAspect, screenUv.y);
          vec2 aspectMouse = vec2(uMousePos.x * uViewportAspect, uMousePos.y);
          float dist = distance(aspectUv, aspectMouse);

          // 0 at the cursor, 1 away from it, so the mix reveals the sharp texture under the pointer
          float mask = smoothstep(0.1, 0.25, dist);

          gl_FragColor = mix(clearColor, blurColor, mask);
        }
      `,
      transparent: true,
    });
    // viewportAspect is a live uniform updated every frame, so rebuilding the material on it would
    // throw away the compiled shader sixty times a second
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blurTexture, clearTexture]);

  React.useEffect(() => {
    materialRef.current = material;
    return () => material.dispose();
  }, [material, materialRef]);

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={material} />;
};
