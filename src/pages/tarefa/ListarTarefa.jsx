import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';  // Para melhorar a aparência da barra de pesquisa
import { useDebounce } from 'use-debounce';  // Para debounce da pesquisa
import Dialog from '@mui/material/Dialog'; // Dialog para confirmação
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Dados de exemplo
const initialRows = [
  { id: 1, titulo: 'Planejamento', descricao: 'Definir objetivos do projeto', inicio: '2024-11-01', fim: '2024-11-02', status: 'Concluída', recurso: 'Equipe A' },
  { id: 2, titulo: 'Desenvolvimento', descricao: 'Iniciar programação das funcionalidades principais', inicio: '2024-11-03', fim: '2024-11-05', status: 'Em Andamento', recurso: 'Equipe B' },
  { id: 3, titulo: 'Testes', descricao: 'Realizar testes de usabilidade e funcionalidade', inicio: '2024-11-06', fim: '2024-11-08', status: 'Em Andamento', recurso: 'Equipe C' },
  { id: 4, titulo: 'Revisão', descricao: 'Revisar código e corrigir erros', inicio: '2024-11-09', fim: '2024-11-10', status: 'Aguardando', recurso: 'Equipe D' },
  { id: 5, titulo: 'Entrega', descricao: 'Preparar entrega final ao cliente', inicio: '2024-11-11', fim: '2024-11-12', status: 'Aguardando', recurso: 'Equipe A' },
  { id: 6, titulo: 'Feedback', descricao: 'Receber feedback do cliente e planejar ajustes', inicio: '2024-11-13', fim: '2024-11-14', status: 'Aguardando', recurso: 'Equipe B' },
];


const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState(null);
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce de 500ms para pesquisa
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Estado para controlar o diálogo de confirmação de exclusão
  const [idTarefaDeletar, setIdTarefaDeletar] = useState(null); // Armazenar id da tarefa a ser deletada

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleEditar = (id) => {
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.id === id);
    setTarefa(tarefaParaEditar);
    setIdTarefaSelecionada(id);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setIdTarefaDeletar(id);  // Define a tarefa a ser deletada
    setOpenDeleteDialog(true);  // Abre o diálogo de confirmação
  };

  const confirmarDeletar = () => {
    setTarefas((current) => current.filter((tarefa) => tarefa.id !== idTarefaDeletar));
    setOpenDeleteDialog(false);  // Fecha o diálogo de confirmação
  };

  const cancelarDeletar = () => {
    setOpenDeleteDialog(false);  // Fecha o diálogo sem deletar
  };

  // Filtro de pesquisa
  const filteredTarefas = tarefas.filter(tarefa => 
    tarefa.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    tarefa.descricao.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'titulo', headerName: 'Título', flex: 1 },
    { field: 'descricao', headerName: 'Descrição', flex: 2 },
    { field: 'inicio', headerName: 'Data de Início', flex: 1 },
    { field: 'fim', headerName: 'Data de Finalização', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'recurso', headerName: 'Recurso', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEditar(params.row.id)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeletar(params.row.id)} // Chama o método de deletar
          >
            Deletar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          {/* Barra de pesquisa */}
          <TextField 
            label="Pesquisar tarefas"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px' }}
          />

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={filteredTarefas} columns={columns} pageSize={5} />
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Criar Tarefa
          </Button>
          <Button size="small" variant="outlined">
            Cancelar
          </Button>
        </CardActions>
      </Card>

      {/* Modal para criar tarefa */}
      <Modal open={open} onClose={handleClose}>
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>

      {/* Modal para editar tarefa */}
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <div>
          <EditarTarefa
            handleCloseEditar={handleCloseEditar}
            idTarefaSelecionada={idTarefaSelecionada}
            tarefas={tarefas}
            tarefa={tarefa}
            setTarefas={setTarefas}
          />
        </div>
      </Modal>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={openDeleteDialog} onClose={cancelarDeletar}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza de que deseja excluir esta tarefa?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelarDeletar} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarDeletar} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListarTarefa;


