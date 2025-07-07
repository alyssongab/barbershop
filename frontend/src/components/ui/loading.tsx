import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    // Container que centraliza o ícone na tela inteira
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        {/* Ícone da biblioteca lucide-react com a classe de animação de rotação do Tailwind */}
        <Loader2 className="h-12 w-12 animate-spin text-[#140F0B]" />
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};