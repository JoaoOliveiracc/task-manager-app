import { useEffect, useState } from "react";
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Modal, TextField, Typography, IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomToolbar from "../components/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Task } from "../types/Tasks";
import { userAuth } from "../userAuth";

export default function HomePage() {
  userAuth();
  const [openAddTaskModal, setOpenAddActivityModal] = useState(false);
  const [openEditTaskModal, setOpenEditActivityModal] = useState(false);
  const [activities, setActivities] = useState<Task[]>([]);
  const [newActivity, setNewActivity] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    status: "Pendente",
  });
  const [editActivity, setEditActivity] = useState<Task>({
    title: "",
    description: "",
    status: "Pendente",
    id: 0,
  });

  // Filtros
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const [page, setPage] = useState(0); // Página atual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Número de itens por página

  const handleOpenAddActivityModal = () => setOpenAddActivityModal(true);
  const handleCloseAddActivityModal = () => setOpenAddActivityModal(false);

  const handleOpenEditActivityModal = (activity: Task) => {
    setEditActivity(activity);
    setOpenEditActivityModal(true);
  }; 
  const handleCloseEditActivityModal = () => {
    setOpenEditActivityModal(false);
    setEditActivity({ title: "", description: "", status: "Pendente", id: 0 });
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setActivities(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddActivity = async () => {
    if (newActivity.title.trim()) {
      try {
        const response = await axios.post<Task>("http://localhost:3000/tasks", newActivity);

        // Adicionando a nova tarefa na lista de atividades
        setActivities((prevActivities) => [
          ...prevActivities,
          response.data, // Adiciona a nova tarefa retornada pelo backend
        ]);

        setNewActivity({ title: "", description: "", status: "Pendente", id: 0 });

        handleCloseAddActivityModal();
      } catch (error) {
        console.error("Erro ao adicionar a tarefa:", error);
      }
    }
  };

  const handleEditActivity = async () => {
    if (editActivity.title.trim()) {
      try {
        const response = await axios.patch<Task>(`http://localhost:3000/tasks/${editActivity.id}`, editActivity);

        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === editActivity.id ? response.data : activity
          )
        );

        setNewActivity({ title: "", description: "", status: "Pendente", id: 0 });
        handleCloseEditActivityModal();
      } catch (error) {
        console.error("Erro ao adicionar a tarefa:", error);
      }
    }
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
  
      setActivities((prevActivities) =>
        prevActivities.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Aplicar filtros nas atividades
  const filteredActivities = activities.filter((activity) => {
    return (
      activity.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      (filterStatus ? activity.status === filterStatus : true)
    );
  });

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh" }}>
      <CustomToolbar />

      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ width: "80vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} p={4}>
          <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleOpenAddActivityModal} 
              sx={{ mb: 2 }}
            >
              Adicionar Tarefa
            </Button>
          <Box sx={{ display: "flex", gap: 2, mb: 2, width:"100vh" }}>
            <TextField
              label="Filtrar por Título"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="Concluída">Concluída</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tarefa</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredActivities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{activity.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenEditActivityModal(activity)}><EditIcon/></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteActivity(activity.id)}><DeleteIcon/></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredActivities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Modal open={openAddTaskModal} onClose={handleCloseAddActivityModal}>
            <Box 
              sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
              }}
            >
              <Typography variant="h6" mb={2}>Nova Tarefa</Typography>
              <TextField 
                fullWidth label="Nome da Tarefa" 
                value={newActivity.title} 
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })} 
                margin="normal"
              />
              <TextField 
                fullWidth label="Descrição" 
                value={newActivity.description} 
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} 
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={newActivity.status}
                  onChange={(e) => setNewActivity({ ...newActivity, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Pendente">Pendente</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleAddActivity} 
                sx={{ mt: 2 }}
              >
                Adicionar
              </Button>
            </Box>
          </Modal>

          <Modal open={openEditTaskModal} onClose={handleCloseEditActivityModal}>
            <Box 
              sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
              }}
            >
              <Typography variant="h6" mb={2}>Editar Tarefa</Typography>
              <TextField 
                fullWidth label="Nome da Tarefa" 
                value={editActivity.title} 
                onChange={(e) => setEditActivity({ ...editActivity, title: e.target.value })} 
                margin="normal"
              />
              <TextField 
                fullWidth label="Descrição" 
                value={editActivity.description} 
                onChange={(e) => setEditActivity({ ...editActivity, description: e.target.value })} 
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={editActivity.status}
                  onChange={(e) => setEditActivity({ ...editActivity, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Pendente">Pendente</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                  <MenuItem value="Atrasada">Atrasada</MenuItem>
                  <MenuItem value="Cancelada">Cancelada</MenuItem>
                  <MenuItem value="Revisão">Revisão</MenuItem>
                  <MenuItem value="Em Espera">Em Espera</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleEditActivity} 
                sx={{ mt: 2 }}
              >
                Editar
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}
