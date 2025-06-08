// server.js (mínimo para login con Supabase)
const express = require("express");
app.use(cors());
app.use(express.json());

// ✅ RUTA LOGIN
app.post("/api/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("usuario", usuario)
    .eq("contrasena", contrasena)
    .limit(1);

  if (error) return res.status(500).json({ error: "Error del servidor" });

  if (!data || data.length === 0) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  // ✅ Si pasa validación
  const usuarioLogeado = data[0];
  res.json({
    mensaje: "Inicio de sesión exitoso",
    tipo: usuarioLogeado.tipo,
    nombre: usuarioLogeado.nombre
  });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
