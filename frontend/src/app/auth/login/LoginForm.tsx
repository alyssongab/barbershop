"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

            <form className="space-y-6">
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
                />
                <button type="button" className="text-[#242424] mt-4 underline cursor-pointer">
                  Esqueci minha senha
                </button>
              </div>

              <Link href="../app/cliente/agendamento">
                <Button
                  type="button"
                  className="w-full h-12 bg-[#000000] hover:bg-[#242424] text-[#ffffff] rounded-lg text-lg font-medium mt-8 cursor-pointer"
                >
                    Entrar
                </Button>
              </Link>

              <div className="text-center">
                <button type="button" className="text-[#242424] underline cursor-pointer">
                  ou Cadastre-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;