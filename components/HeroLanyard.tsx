'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import StaticHangingPhoto from './StaticHangingPhoto';

extend({ MeshLineGeometry, MeshLineMaterial });

const SEGMENT_LENGTH = 0.42;
const CARD_WIDTH = 1.05;
const CARD_HEIGHT = 1.32;
// Camera looks at the world origin with no vertical offset, so the anchor
// needs to sit close to the top of the visible frame (~2.1 at this fov/
// distance) for the card to rest near vertical center instead of being
// cropped against the top edge.
const ANCHOR_Y = 2.1;

interface LanyardCardProps {
  photoSrc: string;
}

// Matches @dimforge/rapier3d-compat's RigidBodyType enum ordering.
const RAPIER_BODY_TYPE_DYNAMIC = 0;

function LanyardCard({ photoSrc }: LanyardCardProps) {
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const band = useRef<THREE.Mesh>(null);

  const { camera } = useThree();
  const texture = useTexture(photoSrc);

  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  const dragPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const dragPoint = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const velocityEstimate = useRef(new THREE.Vector3());

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    []
  );

  // Chain: fixed anchor -> j1 -> j2 -> j3 -> card, each linked by a rope joint
  // (a distance constraint that behaves like a real rope segment).
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], SEGMENT_LENGTH]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], SEGMENT_LENGTH]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], SEGMENT_LENGTH]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_HEIGHT / 2 + 0.08, 0],
  ]);

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, dragged]);

  useFrame((state) => {
    // Very light ambient force so the lanyard never sits perfectly still,
    // gentle enough to read as a pendulum sway rather than active motion.
    if (!dragged && card.current) {
      const t = state.clock.elapsedTime;
      card.current.applyImpulse(
        { x: Math.sin(t * 0.6) * 0.0004, y: 0, z: Math.cos(t * 0.5) * 0.0003 },
        true
      );
    }

    if (dragged && card.current) {
      raycaster.setFromCamera(state.pointer, camera);
      raycaster.ray.intersectPlane(dragPlane, dragPoint);

      const now = performance.now();
      const dt = Math.max((now - lastPointer.current.t) / 1000, 1 / 120);
      velocityEstimate.current.set(
        (dragPoint.x - lastPointer.current.x) / dt,
        (dragPoint.y - lastPointer.current.y) / dt,
        0
      );
      lastPointer.current = { x: dragPoint.x, y: dragPoint.y, t: now };

      card.current.setNextKinematicTranslation({
        x: dragPoint.x,
        y: dragPoint.y,
        z: 0,
      });
    }

    // Draw the band along the current joint positions each frame.
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      curve.points[0].copy(fixed.current.translation() as THREE.Vector3);
      curve.points[1].copy(j1.current.translation() as THREE.Vector3);
      curve.points[2].copy(j2.current.translation() as THREE.Vector3);
      curve.points[3].copy(j3.current.translation() as THREE.Vector3);
      const geometry = band.current.geometry as unknown as MeshLineGeometry;
      geometry.setPoints(curve.getPoints(24));
    }
  });

  const releaseDrag = () => {
    if (!card.current) return;
    setDragged(false);
    // Switch the body back to dynamic synchronously: the reactive `type` prop
    // update would only land on React's next render, which is too late for
    // the setLinvel call right below to have any effect on a kinematic body.
    card.current.setBodyType(RAPIER_BODY_TYPE_DYNAMIC, true);
    card.current.setLinvel(
      { x: velocityEstimate.current.x * 0.6, y: velocityEstimate.current.y * 0.6, z: 0 },
      true
    );
  };

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[0, ANCHOR_Y, 0]} />
      <RigidBody ref={j1} position={[0, ANCHOR_Y - SEGMENT_LENGTH, 0]} colliders={false} linearDamping={2} angularDamping={1}>
        <BallCollider args={[0.06]} />
      </RigidBody>
      <RigidBody ref={j2} position={[0, ANCHOR_Y - SEGMENT_LENGTH * 2, 0]} colliders={false} linearDamping={2} angularDamping={1}>
        <BallCollider args={[0.06]} />
      </RigidBody>
      <RigidBody ref={j3} position={[0, ANCHOR_Y - SEGMENT_LENGTH * 3, 0]} colliders={false} linearDamping={2} angularDamping={1}>
        <BallCollider args={[0.06]} />
      </RigidBody>
      <RigidBody
        ref={card}
        position={[0, ANCHOR_Y - SEGMENT_LENGTH * 3 - CARD_HEIGHT / 2 - 0.08, 0]}
        colliders={false}
        linearDamping={2.4}
        angularDamping={1.2}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
      >
        <CuboidCollider args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, 0.02]} />
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            lastPointer.current = { x: 0, y: 0, t: performance.now() };
            velocityEstimate.current.set(0, 0, 0);
            setDragged(true);
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            releaseDrag();
          }}
        >
          <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
          <meshStandardMaterial map={texture} roughness={0.5} />
        </mesh>
        {/* white card border frame */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[CARD_WIDTH + 0.09, CARD_HEIGHT + 0.09]} />
          <meshStandardMaterial color="#f2f2f0" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* the strap/band rendered as a line following the rope joints */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="#565d70" lineWidth={0.045} transparent opacity={0.9} />
      </mesh>
    </>
  );
}

function Scene({ photoSrc }: { photoSrc: string }) {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 4, 3]} intensity={1.4} />
      <Physics gravity={[0, -32, 0]} timeStep={1 / 60}>
        <LanyardCard photoSrc={photoSrc} />
      </Physics>
    </>
  );
}

export default function HeroLanyard({ photoSrc }: { photoSrc: string }) {
  const reducedMotion = usePrefersReducedMotion();

  // With reduced motion requested, skip physics/interaction entirely and
  // fall back to a static image in the same card shape.
  if (reducedMotion) {
    return <StaticHangingPhoto src={photoSrc} />;
  }

  return (
    <div className="mx-auto h-[420px] w-full max-w-[320px] touch-none sm:h-[480px] lg:mx-0 lg:max-w-sm">
      <Canvas camera={{ position: [0, 0, 8], fov: 30 }}>
        <Scene photoSrc={photoSrc} />
      </Canvas>
    </div>
  );
}
