// server.js (mínimo para login con Supabase)
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(
  "https://mhnzjhelbupyifdlpngv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1obnpqaGVsYnVweWlmZGxwbmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTg1MjUsImV4cCI6MjA2NDc5NDUyNX0.tZAtvUL6kAFfEhwrXgopbQLcnq9qCCm5zpPBkm6z8wY"
);

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

  const usuarioEncontrado = data[0];

  res.json({
    mensaje: "Inicio de sesión exitoso",
    tipo: usuarioEncontrado.tipo,
    nombre: usuarioEncontrado.nombre
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
