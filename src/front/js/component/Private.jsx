import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		// Si no hay token, redirige al login
		if (!store.token) {
			navigate("/login");
		}
	}, [store.token, navigate]);

	return (
		<div className="container mt-5">
			<h2>Zona Privada</h2>
			<p>Bienvenido, estás autenticado correctamente 🎉</p>
		</div>
	);
};
