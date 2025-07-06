"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent } from "react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    // 2. Pegue a função de login e os estados do contexto
  const { login } = useAuth(); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

    // 3. Crie a função para lidar com a submissão
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await login(email, password);
      // O redirecionamento já é feito dentro da função login do contexto!
    } catch (err) {
      setError("Falha no login. Verifique seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-8">
      <div className="bg-[#ffffff] rounded-lg shadow-sm border border-[#cccccc] max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* div da esquerda - imagem svg */}
        <div className="p-5 max-lg:hidden">
          <img src="/login.svg" alt="Login illustration" />
        </div>

        {/* div da direita - login form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-[#242424] mb-8 text-center">
              Login
              <div className="w-16 h-1 bg-[#242424] mx-auto mt-2"></div>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-12 border-[#cccccc] rounded-lg bg-[#f2f2f2] focus:border-[#6c63ff] focus:ring-[#6c63ff]"
                  required
                />
                <button type="button" className="text-[#242424] mt-4 underline cursor-pointer">
                  Esqueci minha senha
                </button>
              </div>

               {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#000000] hover:bg-[#242424] text-[#ffffff] rounded-lg text-lg font-medium mt-8 cursor-pointer"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="mt-3 text-end">
                <Link href="../auth/registrar">
                  <button type="button" className="text-[#242424] underline cursor-pointer">
                    ou Cadastre-se
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;