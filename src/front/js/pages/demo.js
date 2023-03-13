import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const Texto3D = () => {
		const ref = useRef();
	  
		useFrame((state, delta) => {
		  ref.current.rotation.x += 0.00;
		  ref.current.rotation.y += 0.01;
		});
	  
		return (
		  <Text3D font={font} ref={ref}>
			Hello World!
		  </Text3D>
		);
	  }

	return (
		<Texto3D/>
	);
};
