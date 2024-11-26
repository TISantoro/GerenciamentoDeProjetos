import React, { useState } from 'react';
import Header from './components/header';
import ListarTarefa from './pages/tarefa/ListarTarefa';
import { Button, Modal, TextField, DialogActions, Dialog, DialogContent, DialogTitle } from '@mui/material';

function App() {
  const [openLogin, setOpenLogin] = useState(false); // Controla a abertura do modal de login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para abrir o modal de login
  const handleOpenLogin = () => setOpenLogin(true);

  // Função para fechar o modal de login
  const handleCloseLogin = () => setOpenLogin(false);

  // Função para fazer login (substitua com lógica real de autenticação)
  const handleLogin = () => {
    console.log('Login:', username, password); // Substitua por autenticação real
    setOpenLogin(false); // Fecha o modal após login
  };

  return (
    <div className="App">
      <Header />
      <ListarTarefa />

      {/* Botão de Login */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenLogin} 
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
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
}

export default App;

