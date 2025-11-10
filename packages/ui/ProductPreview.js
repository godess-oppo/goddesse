import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import glitchEffect from './glitchEffect'; // Hypothetical function for glitch effect

export default function ProductPreview({ product }) {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
    mountRef.current.appendChild(renderer.domElement);

    // Add a cube (placeholder for your 3D model)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      // Simple rotation for demonstration
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Add glitch effect on hover
    renderer.domElement.addEventListener('mouseenter', () => glitchEffect(cube));
    renderer.domElement.addEventListener('mouseleave', () => {
      // Reset cube material or effect
      cube.material.color.setHex(0x00ff00);
    });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
}
