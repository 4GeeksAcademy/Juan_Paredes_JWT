const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null
		},
		actions: {
			signup: async (email, password, name) => {
				try {
					const resp = await fetch("https://silver-train-69g9jxg576v6fr6v7-3001.app.github.dev/api/user", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password, name })
					});
					const data = await resp.json();
					if (!resp.ok) throw new Error(data.error || "Error al registrar");
					return { success: true, message: "Usuario registrado correctamente" };
				} catch (err) {
					return { success: false, error: err.message };
				}
			},

			login: async (email, password) => {
				try {
					const resp = await fetch("https://silver-train-69g9jxg576v6fr6v7-3001.app.github.dev/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});
					const data = await resp.json();
					if (!resp.ok) throw new Error(data.error || "Credenciales inválidas");

					sessionStorage.setItem("token", data["acces token"]);
					setStore({ token: data["acces token"] });

					return { success: true };
				} catch (err) {
					return { success: false, error: err.message };
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null });
			}
		}
	};
};

export default getState;
