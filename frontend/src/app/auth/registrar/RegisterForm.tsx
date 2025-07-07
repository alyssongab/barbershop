"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"; // 1. Importa o hook de roteamento
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { registerUser } from "@/services/userService"; // 2. Importa a função de registro

const RegisterForm = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setPassword] = useState("")
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // 3. Cria a função para lidar com a submissão do formulário
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser({
        nome,
        email,
        senha,
        nivelAcesso: 'CLIENTE'
      });

      // Se o cadastro for bem-sucedido, redireciona para a página de login
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      router.push('/auth/login');

    } catch (err: any) {
      // Pega a mensagem de erro do backend (ex: email já existe)
      const errorMessage = err.response?.data || "Não foi possível realizar o cadastro. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-8">
      <div className="bg-[#ffffff] rounded-lg shadow-sm border border-[#cccccc] max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* div da esquerda */}
        <div className="p-5 max-lg:hidden">
          <img src="/login.svg" alt="Register illustration" />
        </div>

        {/* div da direita */}
        <div className="p-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-[#242424] mb-8 text-center">
              Cadastro
              <div className="w-16 h-1 bg-[#242424] mx-auto mt-2"></div>
            </h1>

            {/* 4. Adiciona o onSubmit ao formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full">
                <Label htmlFor="name" className="text-[#242424] text-lg font-medium">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-2 h-12 border-[#cccccc] rounded-lg bg-[#f2f2f2] focus:border-[#6c63ff] focus:ring-[#6c63ff]"
                  required
                />
              </div>

              <div className="w-full">
                <Label htmlFor="email" className="text-[#242424] text-lg font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-12 border-[#cccccc] rounded-lg bg-[#f2f2f2] focus:border-[#6c63ff] focus:ring-[#6c63ff]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#242424] text-lg font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-12 border-[#cccccc] rounded-lg bg-[#f2f2f2] focus:border-[#6c63ff] focus:ring-[#6c63ff]"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              
              {/* 5. Corrige o botão */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#000000] hover:bg-[#242424] text-[#ffffff] rounded-lg text-lg font-medium mt-8 cursor-pointer"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
              <div className="text-sm text-center mt-4">
                <Link href="/auth/login" className="text-[#242424] underline cursor-pointer">
                  Já possui uma conta? Login  
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;