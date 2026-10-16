import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------
// 1. Interactive 3D Financial Radar Graph & Risk Nodes
// ----------------------------------------------------
function Interactive3DRadarGraph({ inputData }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const normIncome = Math.min(1, inputData.income / 2500000);
  const normCS = Math.min(1, (inputData.credit_score - 300) / 550);
  const normLoan = Math.min(1, 1 - (inputData.loan_amount / 5000000));
  const normDebt = Math.min(1, 1 - (inputData.debt_ratio / 60));
  const normEmp = Math.min(1, inputData.employment_years / 15);

  const radius = 1.6;
  const points = [
    [0, radius * normCS, 0],
    [radius * normIncome * 0.95, radius * normIncome * 0.3, 0],
    [radius * normEmp * 0.6, -radius * normEmp * 0.8, 0],
    [-radius * normLoan * 0.6, -radius * normLoan * 0.8, 0],
    [-radius * normDebt * 0.95, radius * normDebt * 0.3, 0],
  ];

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.58, 1.62, 5]} />
        <meshBasicMaterial color="#0284c7" wireframe />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.08, 1.12, 5]} />
        <meshBasicMaterial color="#7c3aed" wireframe opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.58, 0.62, 5]} />
        <meshBasicMaterial color="#059669" wireframe opacity={0.3} transparent />
      </mesh>

      {points.map((pt, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(pt[0]*1.2, pt[1]*1.2, 0)])} />
          <lineBasicMaterial attach="material" color="#0284c7" linewidth={2} />
        </line>
      ))}

      <mesh position={[0, 0, 0.05]}>
        <shapeGeometry args={[createPolygonShape(points)]} />
        <meshStandardMaterial color="#38bdf8" opacity={0.65} transparent side={THREE.DoubleSide} emissive="#0284c7" emissiveIntensity={0.4} />
      </mesh>

      {points.map((pt, idx) => (
        <group key={idx} position={pt}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#059669" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      <Text position={[0, 1.9, 0.1]} fontSize={0.16} color="#059669" anchorX="center">Credit Score</Text>
      <Text position={[1.8, 0.5, 0.1]} fontSize={0.16} color="#0284c7" anchorX="left">Income</Text>
      <Text position={[1.1, -1.5, 0.1]} fontSize={0.16} color="#7c3aed" anchorX="left">Experience</Text>
      <Text position={[-1.1, -1.5, 0.1]} fontSize={0.16} color="#e11d48" anchorX="right">Loan Amount</Text>
      <Text position={[-1.8, 0.5, 0.1]} fontSize={0.16} color="#d97706" anchorX="right">Debt Ratio</Text>
    </group>
  );
}

function createPolygonShape(points) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();
  return shape;
}

// ----------------------------------------------------
// 2. Official 3D Stamp Seal on White Paper Screen
// ----------------------------------------------------
function OfficialPaperStampSeal({ verdict, onImpact }) {
  const stampRef = useRef();
  const impactTriggered = useRef(false);
  const isApproved = verdict === 'Approved';
  const color = isApproved ? '#059669' : '#e11d48';

  useFrame(() => {
    if (!stampRef.current) return;
    stampRef.current.position.y = THREE.MathUtils.lerp(stampRef.current.position.y, -0.15, 0.22);
    if (stampRef.current.position.y < 0.05 && !impactTriggered.current) {
      impactTriggered.current = true;
      if (onImpact) onImpact();
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.4, 2.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.05} />
      </mesh>

      <mesh position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.6]} />
        <meshBasicMaterial color="#38bdf8" wireframe />
      </mesh>

      <group position={[0, -0.42, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[0.75, 0.85, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
        
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.28}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {isApproved ? "✔ APPROVED" : "✖ REJECTED"}
        </Text>

        <Text
          position={[0, -0.45, 0.02]}
          fontSize={0.12}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          BANK XAI OFFICIAL SEAL
        </Text>
      </group>

      <group ref={stampRef} position={[0, 2.5, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color={isApproved ? "#059669" : "#e11d48"} roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.1, 0.22, 0.5, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.5, 0.16, 1.0]} />
          <meshStandardMaterial color={isApproved ? "#059669" : "#e11d48"} roughness={0.2} metalness={0.7} />
        </mesh>
      </group>

      <Sparkles count={60} scale={3} size={8} speed={3} color={color} />
    </group>
  );
}

// ----------------------------------------------------
// 3. Interactive 3D Needle Gauge
// ----------------------------------------------------
function ThreeNeedleGauge({ probability }) {
  const needleRef = useRef();
  const targetAngle = (probability - 0.5) * Math.PI * 0.85;

  useFrame(() => {
    if (needleRef.current) {
      needleRef.current.rotation.z = THREE.MathUtils.lerp(
        needleRef.current.rotation.z,
        -targetAngle,
        0.12
      );
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.25, 1.45, 64, 1, Math.PI * 0.1, Math.PI * 0.8]} />
        <meshStandardMaterial color="#94A3B8" side={THREE.DoubleSide} metalness={0.8} />
      </mesh>
      
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.26, 1.44, 32, 1, Math.PI * 0.1, Math.PI * 0.4]} />
        <meshBasicMaterial color="#059669" side={THREE.DoubleSide} />
      </mesh>
      
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.26, 1.44, 32, 1, Math.PI * 0.5, Math.PI * 0.4]} />
        <meshBasicMaterial color="#e11d48" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, -0.4, 0.05]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} emissive="#0369a1" emissiveIntensity={0.7} />
      </mesh>

      <group ref={needleRef} position={[0, -0.4, 0.05]}>
        <mesh position={[0, 0.55, 0]}>
          <coneGeometry args={[0.07, 1.15, 16]} />
          <meshStandardMaterial color="#0369a1" emissive="#0284c7" emissiveIntensity={0.9} />
        </mesh>
      </group>

      <Text
        position={[0, -0.05, 0.1]}
        fontSize={0.42}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.round(probability * 100)}%`}
      </Text>
    </group>
  );
}

// ----------------------------------------------------
// 4. Interactive 3D SHAP Waterfall Bar Chart
// ----------------------------------------------------
function ThreeShapWaterfall({ shapData, onSelectFeature, selectedFeature }) {
  if (!shapData || shapData.length === 0) return null;

  return (
    <group position={[-1.8, -0.6, 0]}>
      {shapData.map((item, index) => {
        const posX = index * 0.9;
        const height = Math.max(0.2, (item.impact_percentage / 100) * 2.5);
        const isSelected = selectedFeature === item.feature;

        return (
          <ShapBar
            key={item.feature}
            position={[posX, 0, 0]}
            height={height}
            isPositive={item.is_positive}
            label={item.label_en}
            pct={item.impact_percentage}
            isSelected={isSelected}
            onClick={() => onSelectFeature(item)}
          />
        );
      })}
    </group>
  );
}

function ShapBar({ position, height, isPositive, label, pct, isSelected, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const color = isPositive ? '#059669' : '#e11d48';
  const emissiveColor = isPositive ? '#10b981' : '#f43f5e';

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, 0.14);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.58, 1, 0.58]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#0284c7' : color}
          roughness={0.15}
          metalness={0.6}
          emissive={hovered || isSelected ? '#38bdf8' : emissiveColor}
          emissiveIntensity={hovered || isSelected ? 0.9 : 0.45}
        />
      </mesh>

      <Text
        position={[0, height + 0.35, 0]}
        fontSize={0.18}
        color="#0f172a"
        anchorX="center"
        anchorY="bottom"
      >
        {`${isPositive ? '+' : '-'}${pct}%`}
      </Text>

      <Text
        position={[0, -0.25, 0]}
        fontSize={0.15}
        color="#334155"
        anchorX="center"
        anchorY="top"
        maxWidth={0.8}
      >
        {label}
      </Text>
    </group>
  );
}

function CameraRig({ step }) {
  useFrame((state) => {
    const targetZ = step === 3 ? 5.5 : 4.8;
    const targetY = step === 3 ? 0.8 : 1.2;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);
  });
  return null;
}

export default function ThreeCanvas({ step, verdict, probability, shapData, onSelectFeature, selectedFeature, onGavelImpact, inputData }) {
  return (
    <div className="w-full h-[360px] sm:h-[440px] md:h-[500px] relative rounded-3xl overflow-hidden glass-card-saas border-3 border-sky-400 shadow-2xl shadow-sky-500/20 bg-gradient-to-br from-sky-50/90 via-blue-50/80 to-sky-100/90">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1.2, 5]} fov={50} />
        <CameraRig step={step} />

        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={1.7} castShadow />
        <pointLight position={[-5, 3, -2]} intensity={1.4} color="#38bdf8" />
        <pointLight position={[5, -2, 3]} intensity={1.4} color="#0284c7" />

        <Sparkles count={50} scale={8} size={4} speed={0.7} color="#0284c7" />
        <Sparkles count={50} scale={8} size={4} speed={0.7} color="#059669" />

        {step === 1 && (
          <Interactive3DRadarGraph inputData={inputData} />
        )}

        {step === 2 && (
          <group>
            <OfficialPaperStampSeal verdict={verdict} onImpact={onGavelImpact} />
            <group position={[0, -1.2, 0]}>
              <ThreeNeedleGauge probability={probability} />
            </group>
          </group>
        )}

        {step === 3 && (
          <group position={[0, 0, 0]}>
            <ThreeShapWaterfall
              shapData={shapData}
              onSelectFeature={onSelectFeature}
              selectedFeature={selectedFeature}
            />
          </group>
        )}

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.05} minPolarAngle={Math.PI / 4} />
      </Canvas>
      
      {/* Tooltip Overlay */}
      <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-sky-400 text-xs font-black text-slate-900 shadow-xl flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        {step === 1 && "📊 Real-Time Interactive Financial Risk Radar Matrix"}
        {step === 2 && (verdict === 'Approved' ? " Stamp Seal: APPROVED ON DOCUMENT" : " Stamp Seal: REJECTED ON DOCUMENT")}
        {step === 3 && "📈 3D SHAP Waterfall Chart & Feature Matrix"}
      </div>
    </div>
  );
}
