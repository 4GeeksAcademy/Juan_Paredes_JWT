import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await actions.signup(email, password, name);
		if (result.success) {
			navigate("/login");
		} else {
			setError(result.error);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Registro</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Nombre</label>
					<input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
				</div>
				<div className="mb-3">
					<label className="form-label">Correo electrónico</label>
					<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div className="mb-3">
					<label className="form-label">Contraseña</label>
					<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
				<button type="submit" className="btn btn-primary">Registrar</button>
			</form>
		</div>
	);
};
