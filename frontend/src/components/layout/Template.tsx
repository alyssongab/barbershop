import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Template = ({ children }: LayoutProps) => {
    return(
        // 1. container principal
        <div className="flex flex-col h-screen">

            {/* header é o primeiro item, e vai ocupar toda a width */}
            <Header />

            {/* 2. novo container para o conteudo abaixo do header */}
            <div className="flex flex-1">
                {/* fica na esquerda, a altura é controlada por esse container */}
                <Sidebar />

                {/* vai ocupar a width restante */}
                <div className="flex-1 flex flex-col">

                    {/* div do conteudo, empurra o footer para baixo */}
                    <main className="flex-grow p-3">
                        {children}
                    </main>
            
                    {/* footer no rodapé da div do conteudo */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Template;