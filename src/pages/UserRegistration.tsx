import { useState } from "react";
import { Box } from "@mui/material";
import Button from "../components/Button";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import axios from "axios";

export default function UserRegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Novo usuário cadastrado:', response.data);
    } catch (error) {
      console.log('Erro ao cadastrar novo usuário:', error);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <img
        src="https://cdn.pixabay.com/photo/2024/11/15/21/04/office-9200134_640.jpg"
        alt="Fundo"
        style={{
          width: "68%",
          height: "100vh",
          objectFit: "cover",
        }}
      />
      <Box display="flex" alignItems="center" justifyContent="center" flex="1">
        <Card title="Task Manager">
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              label="Nome"
              type="name"
              value={name}
              onChangeValue={(e) => setName(e.target.value)}
              autocomplete="name"
            />
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChangeValue={(e) => setEmail(e.target.value)}
              autocomplete="email"
            />
            <TextInput
              label="Senha"
              type="password"
              value={password}
              onChangeValue={(e) => setPassword(e.target.value)}
              autocomplete="current-password"
            />
            <Button text="Salvar" onClick={handleRegistration} btnColor="success" />
          </form>
        </Card>
      </Box>
    </Box>
  );
}
