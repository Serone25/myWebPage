import * as THREE from 'three';
import React, { useContext, useState, useRef, useMemo, Suspense } from "react";
import { Context } from "../store/appContext";

import { Canvas, useFrame, useThree,useLoader, extend } from "@react-three/fiber";
import{ Environment, OrbitControls, Stars, Text3D,Sky } from "@react-three/drei";
import { Water } from 'three-stdlib';



import "../../styles/home.css";
import font from "../../../../public/Inter_Bold.json"

export const Home = () => {
	const { store, actions } = useContext(Context);

	extend({Water})

	function Ocean() {
		const ref = useRef()
		const gl = useThree((state) => state.gl)
		const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
		const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
		const config = useMemo(
		  () => ({
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: false,
			format: gl.encoding
		  }),
		  [waterNormals]
		)
		useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
		return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
	  }
	

	return (
		<div className="home_body">
			<Canvas
				className="canvas"
				shadows
				camera={{position:[0,30,60], fov : 15}}>
				<Stars radius={50} depth={50} count={5000} saturation={0} />
					<Environment  preset="night" />
					<ambientLight/>
					<pointLight position={[0,15,0]} color="#570c0c" castShadow intensity={5}/>{/*Esta encima del cubo*/}
					<directionalLight position={[0,-15,0]} color="#570c0c" castShadow intensity={5}/>{/*Esta debajo del cubo*/}
					<OrbitControls/>
					<Text3D font={font} size= "0.5"
							height= "0.2"
							curveSegments= "64"
							position ={[1,1,0]}
							>
						HI! I'M  FRAN
						<meshNormalMaterial/>
					</Text3D>
					<Suspense fallback= {null}>
					<Ocean/>
					</Suspense>
					
					<Sky scale={1000} sunPosition={[0, 20, -1500]} turbidity={0} rayleigh={1} mieCoefficient={0.03} mieDirectionalG={0.04} />
					<mesh>
						<boxGeometry />
						<meshStandardMaterial color="royalblue" roughness={0} metalness={0} />
					</mesh>
			</Canvas>
		</div>
	);
};
