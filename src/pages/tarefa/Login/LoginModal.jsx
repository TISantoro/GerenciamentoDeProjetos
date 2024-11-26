// src/components/LoginModal.js
import React, { useState } from 'react';
import { Button, Modal, TextField, DialogActions, Dialog, DialogContent, DialogTitle } from '@mui/material';

const LoginModal = () => {
  const [openLogin, setOpenLogin] = useState(false); // Controla se o modal está aberto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para abrir o modal
  const handleOpenLogin = () => setOpenLogin(true);

  // Função para fechar o modal
  const handleCloseLogin = () => setOpenLogin(false);

  // Função para fazer login (pode ser adaptada para autenticação real)
  const handleLogin = () => {
    console.log('Login:', username, password); // Aqui você pode substituir por lógica de autenticação real
    setOpenLogin(false); // Fecha o modal após o login
  };

  return (
    <div>
      {/* Botão de Login */}
      <Button variant="contained" color="primary" onClick={handleOpenLogin}>
        Login
      </Button>

      {/* Modal de Login */}
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogin} color="primary">
            Entrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
