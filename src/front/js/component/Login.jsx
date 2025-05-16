import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await actions.login(email, password);
		if (result.success) {
			navigate("/private");
		} else {
			setError(result.error);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Iniciar Sesión</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Correo electrónico</label>
					<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div className="mb-3">
					<label className="form-label">Contraseña</label>
					<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
				<button type="submit" className="btn btn-success">Entrar</button>
			</form>
		</div>
	);
};
