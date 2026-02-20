'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Create a single noise instance
const noise3D = createNoise3D();

function IridescentFluidBlob() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

    // Mouse and scroll tracking refs
    const mouse = useRef({ x: 0, y: 0 });
    const scrollY = useRef(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Initial geometry setup
    const geometry = useMemo(() => {
        // High resolution for ultra-smooth fluid dynamics. CPU leak is fixed, so 128x128 is safe.
        return new THREE.SphereGeometry(1, 128, 128);
    }, []);

    // Save the original positions so we can base the noise off a stable set of coordinates
    const originalPositions = useMemo(() => {
        return new Float32Array(geometry.attributes.position.array);
    }, [geometry]);

    // Animation frame loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (!meshRef.current) return;

        const positionAttribute = meshRef.current.geometry.attributes.position;

        // Allocate vectors once per frame to prevent GC pressure
        const vertex = new THREE.Vector3();
        const direction = new THREE.Vector3();

        // Evolve fluid noise based on scroll depth (Reduced by 10% per user request)
        const scrollInfluence = scrollY.current * 0.00135;

        // Iterate through all vertices and apply 3D noise displacement
        for (let i = 0; i < positionAttribute.count; i++) {
            // Get the original vertex position
            vertex.fromArray(originalPositions, i * 3);

            // Copy vertex and normalize to get the direction of displacement (out from center)
            // DO NOT use .clone() here as it creates 60,000+ objects per second and crashes WebGL context
            direction.copy(vertex).normalize();

            // Calculate noise based on the original vertex position and time
            // Incorporate scroll influence to make the fluid morph structure as you scroll down
            const noiseVal = noise3D(
                direction.x * 1.5 + time * 0.1 + scrollInfluence,
                direction.y * 1.5 + time * 0.2,
                direction.z * 1.5 + time * 0.1 - scrollInfluence
            );

            // Map noise from [-1, 1] to a displacement scale [0.8, 1.4]
            const displacement = 1.0 + noiseVal * 0.3;

            // Apply displacement
            direction.multiplyScalar(displacement);

            // Update the actual geometry attribute
            positionAttribute.setXYZ(i, direction.x, direction.y, direction.z);
        }

        // Tell Three.js to update the geometry
        positionAttribute.needsUpdate = true;

        // Recompute normals for accurate lighting on the distorted face
        meshRef.current.geometry.computeVertexNormals();

        // Parallax rotation based on mouse interacting with the fluid
        const targetRotX = mouse.current.y * -0.5;
        const targetRotY = time * 0.05 + mouse.current.x * 0.5;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
        meshRef.current.rotation.z = time * 0.02;
    });

    return (
        <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            {/* Scaled to 125% (4.375) and pushed away from camera to reveal long, blurred silk edges */}
            <mesh ref={meshRef} geometry={geometry} scale={4.375} position={[1.5, -0.5, -4]}>
                <meshPhysicalMaterial
                    ref={materialRef}
                    color="#0a0a14"               // Dark, sheer base
                    emissive="#050515"            // Subtle background night-glow
                    emissiveIntensity={0.5}       // Gentle incandescence
                    metalness={0.5}               // Silk-like sheen
                    roughness={0.3}               // Slightly diffuse for silk texture
                    transmission={0.9}            // Highly sheer/transmissive
                    thickness={1.5}               // Refraction to blur background light
                    transparent={true}
                    opacity={0.8}                 // Sheer fabric layer
                    clearcoat={0.5}               // Surface shimmer
                    clearcoatRoughness={0.2}
                    wireframe={false}
                />
            </mesh>
        </Float>
    );
}

export function FluidIridescentBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Limit max dpr to 1.5 to prevent VRAM overuse
            >
                <color attach="background" args={['#050508']} />

                <ambientLight intensity={1.5} color="#202040" />

                {/* Main rim light */}
                <directionalLight position={[10, 10, 10]} intensity={4} color="#ffffff" />

                {/* Iridescent color splash 1 (Purple/Pink) */}
                <pointLight position={[-5, -5, 5]} intensity={20} distance={20} color="#b442b4" />

                {/* Iridescent color splash 2 (Cyan/Blue) */}
                <pointLight position={[5, -5, -5]} intensity={25} distance={20} color="#00ffff" />

                {/* Top highlight (Gold/Warm) */}
                <pointLight position={[0, 10, 5]} intensity={15} distance={20} color="#ffd700" />

                <IridescentFluidBlob />
            </Canvas>

            {/* Dark overlay to push the background back and raise the text legibility */}
            <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

            {/* Subtle digital noise overlay to give it a microscopic/film texture */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
