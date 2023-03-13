import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";

import { Canvas, useFrame } from "@react-three/fiber";
import{ Environment, OrbitControls, Stars, Text3D} from "@react-three/drei"


import "../../styles/home.css";
import font from "../../../../public/Inter_Bold.json"

export const Home = () => {
	const { store, actions } = useContext(Context);

	const Texto3D = () => {
		const ref = useRef();
	  
		useFrame((state, delta) => {
		  ref.current.rotation.x += 0.01;
		  ref.current.rotation.y += 0.01;
		});
	  
		return (
		  <Text3D font={font} ref={ref}>
			Hello World!
		  </Text3D>
		);
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
							position ={[1,0,0]}
							>
						HI! I'M  FRAN
						<meshNormalMaterial/>
					</Text3D>
					<Texto3D/>
					<mesh>
						<boxGeometry />
						<meshStandardMaterial color="royalblue" roughness={0} metalness={0} />
					</mesh>
			</Canvas>
		</div>
	);
};
